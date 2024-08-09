import 'package:flutter/material.dart';
import 'package:footprint_flutter_example/widgets/onboarding_components/widgets/kyb.dart';
import 'package:footprint_flutter_example/widgets/onboarding_components/widgets/kyc.dart';

class OnboardingComponents extends StatelessWidget {
  const OnboardingComponents({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Builder(
      builder: (_context) => Scaffold(
        appBar: AppBar(
          title: const Text('Onboarding components'),
        ),
        body: Container(
          // center child
          alignment: Alignment.center,
          decoration: const BoxDecoration(
            color: Colors.white,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  fixedSize: const Size.fromWidth(120),
                  padding: const EdgeInsets.all(12),
                ),
                onPressed: () {
                  Navigator.of(_context).push(
                    MaterialPageRoute(
                      builder: (_context) => const Kyc(),
                    ),
                  );
                },
                child: const Text("KYC Demo"),
              ),
              const SizedBox(height: 8),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    fixedSize: const Size.fromWidth(120),
                    padding: const EdgeInsets.all(12),
                  ),
                  onPressed: () {
                    Navigator.of(_context).push(
                      MaterialPageRoute(
                        builder: (_context) => const Kyb(),
                      ),
                    );
                  },
                  child: const Text("KYB Demo")),
            ],
          ),
        ),
      ),
    );
  }
}
