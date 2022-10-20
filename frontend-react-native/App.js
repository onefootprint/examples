import queryString from 'query-string';
import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  Platform,
  View,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const App = () => {
  const handleOpen = async () => {
    const deepLink = getDeepLink();
    const url =
      'http://id.preview.onefootprint.com?public_key=ob_test_CnzlAM1i4ce9IV5EsIxFbn';

    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.openAuth(url, deepLink);
        const search = result.url.replace('my-scheme://callback', '');
        const urlParams = queryString.parse(search);
        alert(`verification token: ${urlParams.verification_token}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableHighlight onPress={handleOpen}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
            Verify with Footprint
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export const getDeepLink = () => {
  const scheme = 'my-scheme';
  return Platform.OS === 'android' ? `${scheme}://my-host/` : `${scheme}://`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0e1438',
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});

export default App;
