import { Button, View, StyleSheet } from 'react-native';
import footprint from '@onefootprint/footprint-expo';

export default function App() {
  const handleButtonPress = () => {
    const component = footprint.init({
      publicKey: 'ob_test_ilBQgKtvrgQrQNV8U2rb7e',
      onComplete: validationToken => {
        alert(validationToken);
      },
      onCancel: () => {
        console.log('canceled');
      },
      onError: error => {
        console.error(error);
      },
      l10n: { locale: 'en-US' },
    });
    component.render();
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
