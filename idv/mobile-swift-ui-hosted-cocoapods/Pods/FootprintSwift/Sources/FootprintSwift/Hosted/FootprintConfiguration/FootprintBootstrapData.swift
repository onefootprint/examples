import Foundation

public struct FootprintBootstrapData: Encodable {
    public var email: String?
    public var phoneNumber: String?
    public var firstName: String?
    public var middleName: String?
    public var lastName: String?
    public var dob: String?
    public var addressLine1: String?
    public var addressLine2: String?
    public var city: String?
    public var state: String?
    public var country: String?
    public var zip: String?
    public var ssn9: String?
    public var ssn4: String?
    public var nationality: String?
    public var usLegalStatus: String?
    public var citizenships: [String]?
    public var visaKind: String?
    public var visaExpirationDate: String?
    public var itin: String?
    public var usTaxId: String?
    public var driversLicenseNumber: String?
    public var driversLicenseState: String?
    
    public var businessAddressLine1: String?
    public var businessAddressLine2: String?
    public var businessCity: String?
    public var businessCorporationType: String?
    public var businessCountry: String?
    public var businessDba: String?
    public var businessName: String?
    public var businessPhoneNumber: String?
    public var businessState: String?
    public var businessTin: String?
    public var businessWebsite: String?
    public var businessZip: String?
        
    public init(email: String? = nil,
                phoneNumber: String? = nil,
                firstName: String? = nil,
                middleName: String? = nil,
                lastName: String? = nil,
                dob: String? = nil,
                addressLine1: String? = nil,
                addressLine2: String? = nil,
                city: String? = nil,
                state: String? = nil,
                country: String? = nil,
                zip: String? = nil,
                ssn9: String? = nil,
                ssn4: String? = nil,
                nationality: String? = nil,
                usLegalStatus: String? = nil,
                citizenships: [String]? = nil,
                visaKind: String? = nil,
                visaExpirationDate: String? = nil,
                itin: String? = nil,
                usTaxId: String? = nil,
                driversLicenseNumber: String? = nil,
                driversLicenseState: String? = nil,
                businessAddressLine1: String? = nil,
                businessAddressLine2: String? = nil,
                businessCity: String? = nil,
                businessCorporationType: String? = nil,
                businessCountry: String? = nil,
                businessDba: String? = nil,
                businessName: String? = nil,
                businessPhoneNumber: String? = nil,
                businessState: String? = nil,
                businessTin: String? = nil,
                businessWebsite: String? = nil,
                businessZip: String? = nil) {
        self.email = email
        self.phoneNumber = phoneNumber
        self.firstName = firstName
        self.middleName = middleName
        self.lastName = lastName
        self.dob = dob
        self.addressLine1 = addressLine1
        self.addressLine2 = addressLine2
        self.city = city
        self.state = state
        self.country = country
        self.zip = zip
        self.ssn9 = ssn9
        self.ssn4 = ssn4
        self.nationality = nationality
        self.usLegalStatus = usLegalStatus
        self.citizenships = citizenships
        self.visaKind = visaKind
        self.visaExpirationDate = visaExpirationDate
        self.itin = itin
        self.usTaxId = usTaxId
        self.driversLicenseNumber = driversLicenseNumber
        self.driversLicenseState = driversLicenseState
        
        self.businessAddressLine1 = businessAddressLine1
        self.businessAddressLine2 = businessAddressLine2
        self.businessCity = businessCity
        self.businessCorporationType = businessCorporationType
        self.businessCountry = businessCountry
        self.businessDba = businessDba
        self.businessName = businessName
        self.businessPhoneNumber = businessPhoneNumber
        self.businessState = businessState
        self.businessTin = businessTin
        self.businessWebsite = businessWebsite
        self.businessZip = businessZip
    }
    
    private enum CodingKeys: String, CodingKey {
        case email = "id.email"
        case phoneNumber = "id.phone_number"
        case firstName = "id.first_name"
        case lastName = "id.last_name"
        case dob = "id.dob"
        case addressLine1 = "id.address_line1"
        case addressLine2 = "id.address_line2"
        case city = "id.city"
        case state = "id.state"
        case country = "id.country"
        case zip = "id.zip"
        case ssn9 = "id.ssn9"
        case ssn4 = "id.ssn4"
        case nationality = "id.nationality"
        case usLegalStatus = "id.us_legal_status"
        case citizenships = "id.citizenships"
        case visaKind = "id.visa_kind"
        case visaExpirationDate = "id.visa_expiration_date"
        case itin = "id.itin"
        case usTaxId = "id.us_tax_id"
        case driversLicenseNumber = "id.drivers_license_number"
        case driversLicenseState = "id.drivers_license_state"
        case middleName = "id.middle_name"
        case businessAddressLine1 = "business.address_line1"
        case businessAddressLine2 = "business.address_line2"
        case businessCity = "business.city"
        case businessCorporationType = "business.corporation_type"
        case businessCountry = "business.country"
        case businessDba = "business.dba"
        case businessName = "business.name"
        case businessPhoneNumber = "business.phone_number"
        case businessState = "business.state"
        case businessTin = "business.tin"
        case businessWebsite = "business.website"
        case businessZip = "business.zip"
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(self.email, forKey: .email)
        try container.encodeIfPresent(self.phoneNumber, forKey: .phoneNumber)
        try container.encodeIfPresent(self.firstName, forKey: .firstName)
        try container.encodeIfPresent(self.lastName, forKey: .lastName)
        try container.encodeIfPresent(self.dob, forKey: .dob)
        try container.encodeIfPresent(self.addressLine1, forKey: .addressLine1)
        try container.encodeIfPresent(self.addressLine2, forKey: .addressLine2)
        try container.encodeIfPresent(self.city, forKey: .city)
        try container.encodeIfPresent(self.state, forKey: .state)
        try container.encodeIfPresent(self.country, forKey: .country)
        try container.encodeIfPresent(self.zip, forKey: .zip)
        try container.encodeIfPresent(self.ssn9, forKey: .ssn9)
        try container.encodeIfPresent(self.ssn4, forKey: .ssn4)
        try container.encodeIfPresent(self.nationality, forKey: .nationality)
        try container.encodeIfPresent(self.usLegalStatus, forKey: .usLegalStatus)
        try container.encodeIfPresent(self.citizenships, forKey: .citizenships)
        try container.encodeIfPresent(self.visaKind, forKey: .visaKind)
        try container.encodeIfPresent(self.visaExpirationDate, forKey: .visaExpirationDate)
        try container.encodeIfPresent(self.itin, forKey: .itin)
        try container.encodeIfPresent(self.usTaxId, forKey: .usTaxId)
        try container.encodeIfPresent(self.driversLicenseNumber, forKey: .driversLicenseNumber)
        try container.encodeIfPresent(self.driversLicenseState, forKey: .driversLicenseState)
        try container.encodeIfPresent(self.middleName, forKey: .middleName)
        try container.encodeIfPresent(self.businessAddressLine1, forKey: .businessAddressLine1)
        try container.encodeIfPresent(self.businessAddressLine2, forKey: .businessAddressLine2)
        try container.encodeIfPresent(self.businessCity, forKey: .businessCity)
        try container.encodeIfPresent(self.businessCorporationType, forKey: .businessCorporationType)
        try container.encodeIfPresent(self.businessCountry, forKey: .businessCountry)
        try container.encodeIfPresent(self.businessDba, forKey: .businessDba)
        try container.encodeIfPresent(self.businessName, forKey: .businessName)
        try container.encodeIfPresent(self.businessPhoneNumber, forKey: .businessPhoneNumber)
        try container.encodeIfPresent(self.businessState, forKey: .businessState)
        try container.encodeIfPresent(self.businessTin, forKey: .businessTin)
        try container.encodeIfPresent(self.businessWebsite, forKey: .businessWebsite)
        try container.encodeIfPresent(self.businessZip, forKey: .businessZip)
    }
}
