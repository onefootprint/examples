import 'package:flutter/material.dart';

import 'package:footprint_flutter/footprint_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  void handlePress(BuildContext context) {
    var config = FootprintConfiguration(
      onCancel: () => print("onCancel"),
      onComplete: (String token) => print("onComplete $token"),
      publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
      redirectUrl: "com.footprint.fluttersdk://example",
    );

    footprint.init(config, context);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Builder(
      builder: (_context) => Scaffold(
        appBar: AppBar(
          title: const Text('Footprint Flutter Demo'),
        ),
        body: Center(
          child: ElevatedButton(
              child: Text('Verify with Footprint'),
              onPressed: () => {handlePress(_context)}),
        ),
      ),
    ));
  }
}
