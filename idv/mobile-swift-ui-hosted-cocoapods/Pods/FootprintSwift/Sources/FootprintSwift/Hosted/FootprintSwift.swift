import SwiftUI

@available(iOS 13.0, *)
public class Footprint: NSObject {
    private var configuration: FootprintConfiguration?
    private static var instance: Footprint?
    // Hold a strong reference to managers so that the auth session & api call state don't get garbage cleaned
    private var sdkArgsManager: FootprintSdkArgsManager?
    private var authSessionManager: FootprintAuthSessionManager?
    private var logger: FootprintLogger?
    private var hasActiveSession: Bool = false
    
    private override init() {}
    
    public static func initialize(with configuration: FootprintConfiguration) {
        Task {
            let logger = FootprintLogger(configuration: configuration)
            let sdkArgsManager = FootprintSdkArgsManager(configuration: configuration, logger: logger)
            let authSessionManager = FootprintAuthSessionManager(configuration: configuration, logger: logger)
            
            if let existingInstance = instance {
                existingInstance.configuration = configuration
                existingInstance.logger = logger
                existingInstance.sdkArgsManager = sdkArgsManager
                existingInstance.authSessionManager = authSessionManager
                await existingInstance.render()
            } else {
                let footprint = Footprint()
                footprint.configuration = configuration
                footprint.logger = logger
                footprint.sdkArgsManager = sdkArgsManager
                footprint.authSessionManager = authSessionManager
                await footprint.render()
                instance = footprint
            }
        }
    }
    
    private func render() async {
        guard let configuration = self.configuration else {
            self.logger?.logError(error: "No configuration found.")
            return
        }
        
        // Prevents launching multiple verification flows at the same time
        if (self.hasActiveSession) {
            return
        }

        do {
            self.hasActiveSession = true
            let token = try await self.sdkArgsManager!.sendArgs()
            try self.authSessionManager?.startSession(token: token, onComplete: {
                self.hasActiveSession = false
            })
        } catch {
            self.hasActiveSession = false
            self.logger?.logError(error: "Could not initialize auth session.")
        }
    }
    
    
}

