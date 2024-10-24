import Foundation

fileprivate let KeychainaAccessability = kSecAttrAccessibleWhenUnlocked

public class FootprintKeychainStorage {
    let synchronized: CFBoolean
    let accessability: CFString
    let accessGroup: String
    var service: String
    var label = "footprint"
    
    enum Errors:Error {
        case notFound
        case notAllowed
        case saveError(OSStatus?)
        case delete(OSStatus?)
        case unknown(OSStatus?)
    }
    
    init(service: String, accessGroup: String, synchronized: Bool = true, accessability: CFString = KeychainaAccessability) {
        self.service = service
        self.synchronized = synchronized ? kCFBooleanTrue : kCFBooleanFalse
        self.accessGroup = accessGroup
        self.accessability = accessability
    }
    
    public func setData(key:String, data:Data) throws {
        var params: [String : Any] = [
            String(kSecClass): kSecClassGenericPassword,
            String(kSecAttrService): service,
            String(kSecAttrAccount): key,
            String(kSecValueData): data,
            String(kSecAttrLabel): "footprint"
        ]
        
        let _ = SecItemDelete(params as CFDictionary)
        let status = SecItemAdd(params as CFDictionary, nil)
        if status == errSecInteractionNotAllowed {
            throw Errors.notAllowed
        }
        guard status.isSuccess() else {
            throw Errors.saveError(status)
        }
    }
    
    public func getData(key:String) throws -> Data {
        var params:[String : Any] = [
            String(kSecClass): kSecClassGenericPassword,
            String(kSecAttrService): service,
            String(kSecAttrAccount): key,
            String(kSecReturnData): kCFBooleanTrue as Any,
            String(kSecMatchLimit): kSecMatchLimitOne,
            String(kSecAttrLabel): label
        ]
        
        var object:AnyObject?
        let status = SecItemCopyMatching(params as CFDictionary, &object)
        
        if status == errSecItemNotFound {
            throw Errors.notFound
        }
        if status == errSecInteractionNotAllowed {
            throw Errors.notAllowed
        }
        
        guard let data = object as? Data, status.isSuccess() else {
            throw Errors.unknown(status)
        }
        
        return data
    }
    
    func delete(key:String) throws {
        let params: [String : Any] = [
            String(kSecClass): kSecClassGenericPassword,
            String(kSecAttrService): service,
            String(kSecAttrAccessGroup): accessGroup,
            String(kSecAttrAccount): key
        ]
        
        let status = SecItemDelete(params as CFDictionary)
        
        guard status.isSuccess() else {
            throw Errors.delete(status)
        }
    }
    
    /// Workaround: test if the device has been "first unlocked"
    func isInteractionAllowed() -> Bool {
        do {
            try setData(key: "TestKey", data: Data())
        } catch Errors.notAllowed {
            return false
        } catch {}
        
        return true
    }
    
}

extension OSStatus {
    func isSuccess() -> Bool {
        return self == noErr || self == errSecSuccess
    }
}
