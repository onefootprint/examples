import 'package:flutter/material.dart';
import 'package:footprint_flutter/footprint_flutter.dart';

class Kyc extends StatefulWidget {
  const Kyc({Key? key}) : super(key: key);

  @override
  State<Kyc> createState() => _KycState();
}

class _KycState extends State<Kyc> {
  Steps currentStep = Steps.identify;
  String validationToken = '';

  handleComplete({String? token}) {
    setState(() {
      currentStep = currentStep.getNextStep();
      validationToken = token ?? '';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Builder(
      builder: (_context) => Scaffold(
        appBar: AppBar(
          title: const Text('Onboarding Components KYC'),
        ),
        body: FootprintProvider(
          publicKey: "pb_test_GfF2M0HxXQwrcB3ETl0yhe",
          redirectUrl: "com.footprint.fluttersdk://example",
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
                  if (currentStep == Steps.basicInfo)
                    BasicData(
                      onCompleted: () {
                        handleComplete();
                      },
                    ),
                  if (currentStep == Steps.address)
                    AddressData(
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
                          const Text("KYC Complete"),
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
  basicInfo,
  address,
  ssn,
  complete;

  Steps getNextStep() {
    switch (this) {
      case Steps.identify:
        return Steps.basicInfo;
      case Steps.basicInfo:
        return Steps.address;
      case Steps.address:
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

class Identify extends StatelessWidget {
  const Identify({super.key, required this.handleAuthenticated});

  final void Function() handleAuthenticated;

  void handleComplete(BuildContext context, FootprintBootstrapData formData) {
    footprintUtils(context).launchIdentify(
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        onAuthenticated: () {
          handleAuthenticated();
        },
        onError: (err) {
          print("onError $err");
        },
        onCancel: () {
          print("onCancel");
        });
  }

  @override
  Widget build(BuildContext context) {
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
                    decoration:
                        inputDecoration("Email", errorText: error?.message),
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
        handleComplete(context, formData);
      },
    );
  }
}

class BasicData extends StatelessWidget {
  const BasicData({super.key, required this.onCompleted});

  final void Function() onCompleted;

  void handleComplete(BuildContext context, FootprintBootstrapData formData) {
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
                Text("Basic Information",
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

class AddressData extends StatelessWidget {
  const AddressData({super.key, required this.onCompleted});

  final void Function() onCompleted;

  void handleComplete(BuildContext context, FootprintBootstrapData formData) {
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
                Text("Address Information",
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

  void handleComplete(BuildContext context, FootprintBootstrapData formData) {
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
