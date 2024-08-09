import 'package:flutter/material.dart';
import 'package:footprint_flutter_example/widgets/onboarding_components/onboarding_components.dart';
import 'package:footprint_flutter_example/widgets/verification/verification.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Builder(
        builder: (_context) => Scaffold(
          appBar: AppBar(
            title: const Text('Footprint Flutter Demo'),
          ),
          body: Container(
            alignment: Alignment.center,
            decoration: const BoxDecoration(
              color: Colors.white,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    fixedSize: const Size.fromWidth(300),
                    padding: const EdgeInsets.all(12),
                  ),
                  onPressed: () {
                    Navigator.of(_context).push(
                      MaterialPageRoute(
                        builder: (_context) => const Verification(),
                      ),
                    );
                  },
                  child: const Text("Footprint Verification"),
                ),
                const SizedBox(height: 8),
                ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      fixedSize: const Size.fromWidth(300),
                      padding: const EdgeInsets.all(12),
                    ),
                    onPressed: () {
                      Navigator.of(_context).push(
                        MaterialPageRoute(
                          builder: (_context) => const OnboardingComponents(),
                        ),
                      );
                    },
                    child: const Text("Footprint Onboarding Components")),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
