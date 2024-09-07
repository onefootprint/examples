import 'package:flutter/material.dart';
import 'package:footprint_flutter/footprint_flutter.dart';

class Kyb extends StatefulWidget {
  const Kyb({Key? key}) : super(key: key);

  @override
  State<Kyb> createState() => _KybState();
}

class _KybState extends State<Kyb> {
  Steps currentStep = Steps.identify;
  String validationToken = '';

  handleComplete({String? token}) {
    setState(() {
      currentStep = currentStep.next();
      validationToken = token ?? '';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Builder(
      builder: (_context) => Scaffold(
        appBar: AppBar(
          title: const Text('Onboarding Components KYB'),
        ),
        body: FootprintProvider(
          publicKey: "pb_test_1FIzAas6ISQtjIWLs7reK8",
          redirectUrl: "com.footprint.fluttersdk://example",
          sandboxId: "sandbox1FIzAas6ISQtjIWLs7reK8",
          sandboxOutcome: SandboxOutcome(
            overallOutcome: OverallOutcome.pass,
          ),
          child: Container(
            // center child
            alignment: Alignment.center,
            decoration: const BoxDecoration(
              color: Colors.white,
            ),
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (currentStep == Steps.identify)
                    Identify(
                      handleAuthenticated: () {
                        handleComplete();
                      },
                    ),
                  if (currentStep == Steps.businessInfo)
                    BusinessInfo(
                      onCompleted: () {
                        handleComplete();
                      },
                    ),
                  if (currentStep == Steps.businessAddress)
                    BusinessAddressData(
                      onCompleted: () {
                        handleComplete();
                      },
                    ),
                  if (currentStep == Steps.beneficialOwners)
                    BeneficialOwners(
                      onCompleted: () {
                        handleComplete();
                      },
                    ),
                  if (currentStep == Steps.personalBasicData)
                    PersonalBasicData(
                      onCompleted: () {
                        handleComplete();
                      },
                    ),
                  if (currentStep == Steps.personalAddressData)
                    PersonalAddressData(
                      onCompleted: () {
                        handleComplete();
                      },
                    ),
                  if (currentStep == Steps.ssn)
                    Ssn(
                      onCompleted: (String token) {
                        handleComplete(token: token);
                      },
                    ),
                  if (currentStep == Steps.complete)
                    Container(
                      padding: const EdgeInsets.all(20),
                      alignment: Alignment.center,
                      child: Column(
                        children: [
                          const Text("KYB Complete"),
                          const SizedBox(height: 12),
                          const Text("Validation Token:"),
                          const SizedBox(height: 8),
                          Text(validationToken),
                          const SizedBox(height: 12),
                          ElevatedButton(
                            onPressed: () {
                              Navigator.of(_context).pop();
                            },
                            child: const Text('Close demo'),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

enum Steps {
  identify,
  businessInfo,
  businessAddress,
  beneficialOwners,
  personalBasicData,
  personalAddressData,
  ssn,
  complete;

  Steps next() {
    switch (this) {
      case Steps.identify:
        return Steps.businessInfo;
      case Steps.businessInfo:
        return Steps.businessAddress;
      case Steps.businessAddress:
        return Steps.beneficialOwners;
      case Steps.beneficialOwners:
        return Steps.personalBasicData;
      case Steps.personalBasicData:
        return Steps.personalAddressData;
      case Steps.personalAddressData:
        return Steps.ssn;
      case Steps.ssn:
        return Steps.complete;
      case Steps.complete:
        return Steps.complete;
    }
  }
}

InputDecoration inputDecoration(String hintText, {String? errorText}) {
  return InputDecoration(
      hintText: hintText,
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: Colors.grey, width: 0.0),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: Colors.red, width: 1.0),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: Colors.black38, width: 1.0),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: Colors.red, width: 1.0),
      ),
      contentPadding: const EdgeInsets.all(12),
      counterText: "",
      errorText: errorText);
}

class Identify extends StatefulWidget {
  const Identify({super.key, required this.handleAuthenticated});

  final void Function() handleAuthenticated;

  @override
  State<Identify> createState() => _IdentifyState();
}

class _IdentifyState extends State<Identify> {
  bool isChallengeCreated = false;
  ChallengeKind? challengeKind;
  FootprintAuthMethods? authMethod;
  var requiresAuth;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      footprintUtils(context).requiresAuth().then((response) {
        setState(() {
          authMethod = response.authMethod;
        });

        if (response.requiresAuth == false) {
          widget.handleAuthenticated();
        } else {
          setState(() {
            requiresAuth = response.requiresAuth;
          });
        }
      });
    });
  }

  void handleChallengeCreated(ChallengeKind challengeKind) {
    setState(() {
      this.challengeKind = challengeKind;
      isChallengeCreated = true;
    });
  }

  void handleVerfied() {
    widget.handleAuthenticated();
  }

  @override
  Widget build(BuildContext context) {
    if (requiresAuth == null || !footprintUtils(context).isReadyForAuth) {
      return const Center(child: CircularProgressIndicator());
    }

    if (authMethod == FootprintAuthMethods.authToken) {
      return FootprintOtp(
        buildOtp: (otpUtils) {
          if (!isChallengeCreated) {
            otpUtils.createAuthTokenBasedChallenge().then((challengeKind) {
              handleChallengeCreated(challengeKind);
            }).catchError(
              (_) {
                footprintUtils(context).launchIdentify(
                  onAuthenticated: widget
                      .handleAuthenticated, // Don't pass email and phone number - it's going to use auth token
                );
              },
              test: (err) => err is InlineOtpNotSupportedException,
            );
            return const Center(child: CircularProgressIndicator());
          }

          return Container(
            padding: const EdgeInsets.fromLTRB(48, 20, 48, 20),
            child: TextField(
              decoration: inputDecoration(
                "Enter OTP from ${challengeKind == ChallengeKind.sms ? 'SMS' : 'Email'}",
              ),
              onSubmitted: (value) {
                otpUtils.verifyOtpChallenge(verificationCode: value).then((_) {
                  handleVerfied();
                });
              },
            ),
          );
        },
      );
    }

    return FootprintOtp(
      buildOtp: (otpUtils) {
        if (!isChallengeCreated) {
          return FootprintForm(
            createForm: (handleSubmit, props) {
              return Container(
                padding: const EdgeInsets.fromLTRB(48, 20, 48, 20),
                alignment: Alignment.center,
                child: Column(
                  children: [
                    Text("Identification",
                        style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 16),
                    FootprintField(
                      name: "id.email",
                      createField: ({error}) {
                        return FootprintTextInput(
                          labelText: "Email",
                          decoration: inputDecoration("Email",
                              errorText: error?.message),
                        );
                      },
                      // NOTE: Alternatively, you can use the `child` property to pass in a widget (example below for phone number)
                    ),
                    const SizedBox(height: 12),
                    FootprintField(
                      name: "id.phone_number",
                      child: FootprintTextInput(
                        labelText: "Phone Number",
                        decoration: inputDecoration("Phone Number"),
                      ),
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton(
                      onPressed: () {
                        handleSubmit();
                      },
                      child: const Text('Submit'),
                    ),
                  ],
                ),
              );
            },
            onSubmit: (formData) {
              otpUtils
                  .createEmailPhoneBasedChallenge(
                email: formData.email ?? '',
                phoneNumber: formData.phoneNumber ?? "",
              )
                  .then((challegeKind) {
                handleChallengeCreated(challegeKind);
              }).catchError(
                (_) {
                  footprintUtils(context).launchIdentify(
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    onAuthenticated: widget.handleAuthenticated,
                  );
                },
                test: (err) => err is InlineOtpNotSupportedException,
              );
            },
          );
        }
        return Container(
          padding: const EdgeInsets.fromLTRB(48, 20, 48, 20),
          child: TextField(
            decoration: inputDecoration(
              "Enter OTP from ${challengeKind == ChallengeKind.sms ? 'SMS' : 'Email'}",
            ),
            onSubmitted: (value) {
              otpUtils.verifyOtpChallenge(verificationCode: value).then((_) {
                handleVerfied();
              });
            },
          ),
        );
      },
    );
  }
}

class BusinessInfo extends StatelessWidget {
  const BusinessInfo({super.key, required this.onCompleted});

  final void Function() onCompleted;

  void handleComplete(BuildContext context, FormData formData) {
    footprintUtils(context)
        .save(
      formData,
    )
        .then(
      (_) {
        onCompleted();
      },
    ).catchError(
      (err) {
        print("Save Error $err");
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FootprintForm(
      createForm: (handleSubmit, props) {
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Container(
            padding: const EdgeInsets.fromLTRB(48, 20, 48, 20),
            alignment: Alignment.center,
            child: Column(
              children: [
                Text("Business Information",
                    style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 16),
                FootprintField(
                  name: "business.name",
                  child: FootprintTextInput(
                    labelText: "Legal Business Name",
                    decoration: inputDecoration("Legal Business Name"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.dba",
                  child: FootprintTextInput(
                    labelText: "Doing business as (Optional)",
                    decoration: inputDecoration("Doing business as (Optional)"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.tin",
                  child: FootprintTextInput(
                    labelText: "TIN",
                    decoration: inputDecoration("TIN"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.corporation_type",
                  child: FootprintTextInput(
                    labelText: "Legal Entity Type",
                    decoration: inputDecoration("Legal Entity Type"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.website",
                  child: FootprintTextInput(
                    labelText: "Website",
                    decoration: inputDecoration("Website"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.phone_number",
                  child: FootprintTextInput(
                    labelText: "Phone Number",
                    decoration: inputDecoration("Phone Number"),
                  ),
                ),
                const SizedBox(height: 12),
                ElevatedButton(
                  onPressed: () {
                    handleSubmit();
                  },
                  child: const Text('Submit'),
                ),
              ],
            ),
          ),
        );
      },
      onSubmit: (formData) {
        handleComplete(context, formData);
      },
    );
  }
}

class BusinessAddressData extends StatelessWidget {
  const BusinessAddressData({super.key, required this.onCompleted});

  final void Function() onCompleted;

  void handleComplete(BuildContext context, FormData formData) {
    footprintUtils(context)
        .save(
      formData,
    )
        .then(
      (_) {
        onCompleted();
      },
    ).catchError(
      (err) {
        print("Save Error $err");
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FootprintForm(
      createForm: (handleSubmit, props) {
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Container(
            padding: const EdgeInsets.fromLTRB(48, 20, 48, 20),
            alignment: Alignment.center,
            child: Column(
              children: [
                Text("Business Address",
                    style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 16),
                FootprintField(
                  name: "business.address_line1",
                  child: FootprintTextInput(
                    labelText: "Address Line 1",
                    decoration: inputDecoration("Address Line 1"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.address_line2",
                  child: FootprintTextInput(
                    labelText: "Address Line 2",
                    decoration: inputDecoration("Address Line 2"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.city",
                  child: FootprintTextInput(
                    labelText: "City",
                    decoration: inputDecoration("City"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.state",
                  child: FootprintTextInput(
                    labelText: "State",
                    decoration: inputDecoration("State"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.zip",
                  child: FootprintTextInput(
                    labelText: "Zip",
                    decoration: inputDecoration("Zip"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.country",
                  child: FootprintTextInput(
                    labelText: "Country",
                    decoration: inputDecoration("Country"),
                  ),
                ),
                const SizedBox(height: 12),
                ElevatedButton(
                  onPressed: () {
                    handleSubmit();
                  },
                  child: const Text('Submit'),
                ),
              ],
            ),
          ),
        );
      },
      onSubmit: (formData) {
        handleComplete(context, formData);
      },
    );
  }
}

class BeneficialOwners extends StatelessWidget {
  const BeneficialOwners({super.key, required this.onCompleted});

  final void Function() onCompleted;

  void handleComplete(BuildContext context, FormData formData) {
    footprintUtils(context)
        .save(
      formData,
    )
        .then(
      (_) {
        onCompleted();
      },
    ).catchError(
      (err) {
        print("Save Error $err");
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FootprintForm(
      createForm: (handleSubmit, props) {
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Container(
            padding: const EdgeInsets.fromLTRB(48, 20, 48, 20),
            alignment: Alignment.center,
            child: Column(
              children: [
                Text("Beneficial Owner",
                    style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 16),
                FootprintField(
                  name: "business.beneficial_owners[0].first_name",
                  child: FootprintTextInput(
                    labelText: "First Name",
                    decoration: inputDecoration("First Name"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.beneficial_owners[0].middle_name",
                  child: FootprintTextInput(
                    labelText: "Middle Name (Optional)",
                    decoration: inputDecoration("Middle Name (Optional)"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.beneficial_owners[0].last_name",
                  child: FootprintTextInput(
                    labelText: "Last Name",
                    decoration: inputDecoration("Last Name"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.beneficial_owners[0].phone_number",
                  child: FootprintTextInput(
                    labelText: "Phone Number",
                    decoration: inputDecoration("Phone Number"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.beneficial_owners[0].email",
                  child: FootprintTextInput(
                    labelText: "Email",
                    decoration: inputDecoration("Email"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "business.beneficial_owners[0].ownership_stake",
                  child: FootprintTextInput(
                    labelText: "Ownership Stake",
                    decoration: inputDecoration("Ownership Stake"),
                  ),
                ),
                const SizedBox(height: 12),
                ElevatedButton(
                  onPressed: () {
                    handleSubmit();
                  },
                  child: const Text('Submit'),
                ),
              ],
            ),
          ),
        );
      },
      onSubmit: (formData) {
        handleComplete(context, formData);
      },
    );
  }
}

class PersonalBasicData extends StatelessWidget {
  const PersonalBasicData({super.key, required this.onCompleted});

  final void Function() onCompleted;

  void handleComplete(BuildContext context, FormData formData) {
    footprintUtils(context)
        .save(
      formData,
    )
        .then(
      (_) {
        onCompleted();
      },
    ).catchError(
      (err) {
        print("Save Error $err");
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FootprintForm(
      createForm: (handleSubmit, props) {
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Container(
            padding: const EdgeInsets.fromLTRB(48, 20, 48, 20),
            alignment: Alignment.center,
            child: Column(
              children: [
                Text("Personal Information",
                    style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 16),
                FootprintField(
                  name: "id.first_name",
                  child: FootprintTextInput(
                    labelText: "First Name",
                    decoration: inputDecoration("First Name"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "id.middle_name",
                  child: FootprintTextInput(
                    labelText: "Middle Name (Optional)",
                    decoration: inputDecoration("Middle Name (Optional)"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "id.last_name",
                  child: FootprintTextInput(
                    labelText: "Last Name",
                    decoration: inputDecoration("Last Name"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "id.dob",
                  child: FootprintTextInput(
                    labelText: "Date of Birth",
                    decoration: inputDecoration("Date of Birth"),
                  ),
                ),
                const SizedBox(height: 12),
                ElevatedButton(
                  onPressed: () {
                    handleSubmit();
                  },
                  child: const Text('Submit'),
                ),
              ],
            ),
          ),
        );
      },
      onSubmit: (formData) {
        handleComplete(context, formData);
      },
    );
  }
}

class PersonalAddressData extends StatelessWidget {
  const PersonalAddressData({super.key, required this.onCompleted});

  final void Function() onCompleted;

  void handleComplete(BuildContext context, FormData formData) {
    footprintUtils(context)
        .save(
      formData,
    )
        .then(
      (_) {
        onCompleted();
      },
    ).catchError(
      (err) {
        print("Save Error $err");
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FootprintForm(
      createForm: (handleSubmit, props) {
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Container(
            padding: const EdgeInsets.fromLTRB(48, 20, 48, 20),
            alignment: Alignment.center,
            child: Column(
              children: [
                Text("Personal Address",
                    style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 16),
                FootprintField(
                  name: "id.address_line1",
                  child: FootprintTextInput(
                    labelText: "Address Line 1",
                    decoration: inputDecoration("Address Line 1"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "id.address_line2",
                  child: FootprintTextInput(
                    labelText: "Address Line 2",
                    decoration: inputDecoration("Address Line 2"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "id.city",
                  child: FootprintTextInput(
                    labelText: "City",
                    decoration: inputDecoration("City"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "id.state",
                  child: FootprintTextInput(
                    labelText: "State",
                    decoration: inputDecoration("State"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "id.zip",
                  child: FootprintTextInput(
                    labelText: "Zip",
                    decoration: inputDecoration("Zip"),
                  ),
                ),
                const SizedBox(height: 12),
                FootprintField(
                  name: "id.country",
                  child: FootprintTextInput(
                    labelText: "Country",
                    decoration: inputDecoration("Country"),
                  ),
                ),
                const SizedBox(height: 12),
                ElevatedButton(
                  onPressed: () {
                    handleSubmit();
                  },
                  child: const Text('Submit'),
                ),
              ],
            ),
          ),
        );
      },
      onSubmit: (formData) {
        handleComplete(context, formData);
      },
    );
  }
}

class Ssn extends StatelessWidget {
  const Ssn({super.key, required this.onCompleted});

  final void Function(String token) onCompleted;

  void handleComplete(BuildContext context, FormData formData) {
    var utilMethods = footprintUtils(context);
    utilMethods
        .save(
      formData,
    )
        .then(
      (_) {
        utilMethods.handoff(
          onComplete: (token) {
            onCompleted(token);
          },
          onError: (err) {
            print("Handoff error $err");
          },
          onCancel: () {
            print("Handoff canceled");
          },
        );
      },
    ).catchError(
      (err) {
        print("Save Error $err");
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FootprintForm(
      createForm: (handleSubmit, props) {
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Container(
            padding: const EdgeInsets.fromLTRB(48, 20, 48, 20),
            alignment: Alignment.center,
            child: Column(
              children: [
                Text("SSN", style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 16),
                FootprintField(
                  name: "id.ssn9",
                  child: FootprintTextInput(
                    labelText: "SSN (full 9 digits)",
                    decoration: inputDecoration("SSN (full 9 digits)"),
                  ),
                ),
                const SizedBox(height: 12),
                ElevatedButton(
                  onPressed: () {
                    handleSubmit();
                  },
                  child: const Text('Submit'),
                ),
              ],
            ),
          ),
        );
      },
      onSubmit: (formData) {
        handleComplete(context, formData);
      },
    );
  }
}
