import React from "react";
import { Button, View, StyleSheet } from "react-native";
import footprint from "@onefootprint/footprint-expo";

export default function App() {
  const handleButtonPress = async () => {
    footprint.open({
      scheme: "footprint", // This has to match the expo scheme you set in the app.json file
      publicKey: "ob_test_ilBQgKtvrgQrQNV8U2rb7e",
      onComplete: (validationToken) => {
        alert(validationToken);
      },
      onCancel: () => {
        console.log("canceled");
      },
      onError: (error) => {
        console.error(error);
      },
      userData: {
        "id.email": "jane.doe@acme.com",
        "id.phone_number": "+15555550100",
      },
      appearance,
      l10n: { locale: "en-US" },
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Verify with Footprint" onPress={handleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const appearance = {
  fontSrc:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
  variables: {
    fontFamily: '"Inter"',
    linkColor: "#101010",
    colorError: "#E33D19",

    buttonPrimaryBg: "#315E4C",
    buttonPrimaryHoverBg: "#46866c",
    buttonPrimaryColor: "#FFF",
    buttonBorderRadius: "70px",

    linkButtonColor: "#315E4C",

    labelColor: "#101010",
    labelFont: '600 15px/18px "Inter"',

    inputBorderRadius: "8px",
    inputBorderWidth: "1px",
    inputFont: '500 15px/21.42px "Inter"',
    inputHeight: "50px",
    inputPlaceholderColor: "#B5B5B5",
    inputColor: "#101010",
    inputBg: "#FFFFFF",
    inputBorderColor: "#B5B5B5",
    inputHoverBorderColor: "#707070",
    inputFocusBorderColor: "#707070",
    inputFocusElevation: "none",
    inputErrorFocusElevation: "none",
    hintColor: "#101010",
    hintFont: '400 13px/20px "Inter"',

    dropdownBorderColor: "#B5B5B5",
    dropdownBorderRadius: "8px",
    dropdownElevation: "unset",
    dropdownBg: "#FFF",
    dropdownHoverBg: "#F9F9F9",
  },
  rules: {
    button: {
      transition: "all .2s linear",
    },
  },
};
