import 'package:flutter/material.dart';
import 'package:footprint_flutter/footprint_flutter.dart';

class Verification extends StatelessWidget {
  const Verification({Key? key}) : super(key: key);

  void handlePress(BuildContext context) {
    var bootstrapData = FootprintBootstrapData(
        email: "example@gmail.com",
        phoneNumber: "+15555550100",
        firstName: "Piip",
        middleName: "the",
        lastName: "Foot",
        dob: "01/01/1996",
        addressLine1: "123 Main St",
        addressLine2: "Unit 123",
        city: "Huntington Beach",
        state: "CA",
        country: "US",
        zip: "12345",
        ssn9: "343434344",
        ssn4: "1234",
        nationality: "US",
        usLegalStatus: "citizen",
        citizenships: ["US", "BD"],
        visaKind: "f1",
        visaExpirationDate: "05/12/2024",
        businessAddressLine1: "1 Main St",
        businessAddressLine2: "Apt 10",
        businessBeneficialOwners: [
          BusinessBeneficialOwners(
              boEmail: "example@gmail.com",
              boFirstName: "Piip",
              boLastName: "Foot",
              boPhoneNumber: "+15555550100",
              boOwnershipStack: 50),
          BusinessBeneficialOwners(
              boEmail: "example@test.com",
              boFirstName: "Jon",
              boLastName: "Doe",
              boPhoneNumber: "+15555550100",
              boOwnershipStack: 25)
        ],
        businessCity: "San Francisco",
        businessCorporationType: "llc",
        businessCountry: "US",
        businessDba: "Test",
        businessFormationDate: "2010-01-01",
        businessName: "Acme",
        businessPhoneNumber: "+15555550100",
        businessState: "CA",
        businessTin: "12-3456789",
        businessWebsite: "test.test.com",
        businessZip: "94107");

    var config = FootprintConfiguration(
        appearance: FootprintAppearance(
            variables: FootprintAppearanceVariables(buttonPrimaryBg: 'red')),
        l10n: FootprintL10n(language: FootprintSupportedLanguage.en),
        onCancel: () => print("onCancel"),
        onComplete: (String token) => print("onComplete $token"),
        publicKey:
            "pb_test_pZoERpZeZkGW7RRVeBawSm", // using kyb public key to test the business bootstrap data as well
        redirectUrl: "com.footprint.fluttersdk://example",
        bootstrapData: bootstrapData);
    footprint.init(config, context);
  }

  @override
  Widget build(BuildContext context) {
    return Builder(
      builder: (_context) => Scaffold(
        appBar: AppBar(
          title: const Text('Verification'),
        ),
        body: Container(
          // center child
          alignment: Alignment.center,
          decoration: const BoxDecoration(
            color: Colors.white,
          ),
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              fixedSize: const Size.fromWidth(120),
              padding: const EdgeInsets.all(12),
            ),
            onPressed: () => handlePress(context),
            child: const Text("Verify"),
          ),
        ),
      ),
    );
  }
}
