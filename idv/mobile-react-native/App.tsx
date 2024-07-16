import { Fp, useFootprint } from '@onefootprint/footprint-react-native';
import React, { useState } from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

export default function App() {
  const [step, setStep] = useState('identify');

  return (
    <Fp.Provider publicKey="pb_test_5K5NEGAAgB5bqBkfPMlqL1">
      {step === 'identify' && <Identify onDone={() => setStep('kyc')} />}
    </Fp.Provider>
  );
}

const Identify = ({ onDone }: { onDone: () => void }) => {
  const fp = useFootprint();

  const handleSubmit = (formValues: Di) => {
    console.log('Submitting', formValues);
    fp.launchIdentify(
      {
        email: formValues['id.email'],
        phoneNumber: formValues['id.phone_number'],
      },
      {onAuthenticated: onDone},
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 20,
          alignItems: 'center',
        }}>
        <Text>Footprint Auth Demo</Text>
        <Text>Enter your email and phone number</Text>
      </View>
      <Fp.Form onSubmit={handleSubmit}>
        {({handleSubmit, setValue, errors}) => {
          console.log('form errors', errors);
          return (
            <View>
              <Fp.Field name="id.email">
                {({error}) => {
                  return (
                    <>
                      <Text style={{marginBottom: 10}} nativeID="labelUsername">
                        Email
                      </Text>
                      <Fp.Input
                        placeholder="Email"
                        style={error ? styles.textInputError : styles.textInput}
                        aria-labelledby="labelUsername"
                        accessibilityLabelledBy="labelUsername"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      <Fp.FieldErrors />
                    </>
                  );
                }}
              </Fp.Field>
              <Fp.Field name="id.phone_number">
                {({error}) => (
                  <>
                    <Fp.Input
                      placeholder="Phone"
                      style={error ? styles.textInputError : styles.textInput}
                    />
                    <Fp.FieldErrors />
                  </>
                )}
              </Fp.Field>
              <Button
                title="Submit"
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
          );
        }}
      </Fp.Form>
    </View>
  );
};

const KycDemo = () => {
  const fp = useFootprint();
  const [validationToken, setValidationToken] = React.useState<string | null>(
    null,
  );
  const [step, setStep] = React.useState(0);

  const steps = [
    <BasicInformation key={0} onDone={() => setStep(1)} />,
    <AddressInformation
      key={1}
      onDone={() => {
        fp.handoff({
          onComplete: validationToken => {
            setValidationToken(validationToken);
          },
        });
      }}
    />,
  ];

  if (validationToken) {
    return (
      <View style={styles.container}>
        <Text>Validation Token: {validationToken}</Text>
      </View>
    );
  }

  return <View style={styles.container}>{steps[step]}</View>;
};

const BasicInformation = ({onDone}: {onDone: () => void}) => {
  const fp = useFootprint();

  const handleSubmit = data => {
    console.log('Submitting', data);
    fp.save(data, {
      onSuccess: () => {
        onDone();
      },
      onError: error => {
        console.log('Error', error);
      },
    });
  };

  return (
    <Fp.Form onSubmit={handleSubmit}>
      {({handleSubmit}) => (
        <View>
          <Fp.Field name="id.first_name">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>First Name</Text>
                <Fp.Input
                  placeholder="First Name"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.middle_name">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>Middle Name</Text>
                <Fp.Input
                  placeholder="Middle Name"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.last_name">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>Last Name</Text>
                <Fp.Input
                  placeholder="Last Name"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.dob">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>Date of Birth</Text>
                <Fp.Input
                  placeholder="Date of Birth"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.ssn4">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>SSN</Text>
                <Fp.Input
                  placeholder="SSN"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.ssn9">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>SSN</Text>
                <Fp.Input
                  placeholder="SSN"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Button
            title="Submit"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      )}
    </Fp.Form>
  );
};

const AddressInformation = ({onDone}: {onDone: () => void}) => {
  const fp = useFootprint();

  const handleSubmit = data => {
    fp.save(data, {
      onSuccess: () => {
        onDone();
      },
    });
  };

  return (
    <Fp.Form onSubmit={handleSubmit}>
      {({handleSubmit}) => (
        <View>
          <Fp.Field name="id.address_line1">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>Address line 1</Text>
                <Fp.Input
                  placeholder="Address Line 1"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.address_line2">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>Address line 2</Text>
                <Fp.Input
                  placeholder="Address Line 2"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.country">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>Country</Text>
                <Fp.Input
                  placeholder="Country"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.city">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>City</Text>
                <Fp.Input
                  placeholder="City"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.state">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>State</Text>
                <Fp.Input
                  placeholder="State"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Fp.Field name="id.zip">
            {({error}) => (
              <>
                <Text style={{marginBottom: 10}}>Zip</Text>
                <Fp.Input
                  placeholder="Zip"
                  style={error ? styles.textInputError : styles.textInput}
                />
                <Fp.FieldErrors />
              </>
            )}
          </Fp.Field>
          <Button
            title="Submit"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      )}
    </Fp.Form>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    borderRadius: 15,
  },
  textInputError: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'red',
    borderWidth: 1,
    width: 200,
    borderRadius: 15,
  },
});
