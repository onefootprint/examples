import "@onefootprint/footprint-js/dist/footprint-js.css";
import { Fp, Di, useFootprint } from '@onefootprint/footprint-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Layout from '@/components/layout';
import Header from '@/components/header';
import Title from '@/components/title';
import Subtitle from '@/components/subtitle';
import Divider from '@/components/divider';

const publicKeyEnv = 'pb_test_v8yZ7KpMwCZCAe01dh3bfD';

const Demo = () => {
  const router = useRouter();
  const { ob_key: obKey } = router.query;
  const publicKey = typeof obKey === 'string' ? obKey : publicKeyEnv;
  const [option, setOption] = useState('identify');

  const isIdentify = option === 'identify';
  const isBusinessData = option === 'business-data';
  const isBoData = option === 'bo-data';
  const isPersonalData = option === 'personal-data';
  const isSuccess = option === 'success';

  return (
    <>
      <Fp.Provider
        publicKey={publicKey}
      >
        <Header>Onboarding</Header>
        {isIdentify && (
          <Identify
            onDone={() => setOption('business-data')}
          />
        )}
        {isBusinessData && (
          <BusinessData
            onDone={() => setOption('bo-data')}
          />
        )}
        {isBoData && (
          <BoData
            onDone={() => setOption('personal-data')}
          />
        )}
        {isPersonalData && (
          <PersonalData
            onDone={(validationToken: string) => {
              console.log(validationToken);
              setOption('success')
            }}
          />
        )}
        {isSuccess && <Success />}
      </Fp.Provider>
    </>
  );
};

const Identify = ({ onDone }: { onDone: () => void }) => {
  const fp = useFootprint();

  const handleSubmit = (formValues: Di) => {
    fp.launchIdentify(
      {
        email: formValues['id.email'],
        phoneNumber: formValues['id.phone_number'],
      },
      { onAuthenticated: onDone },
    );
  };

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <Title>Identification</Title>
        <Subtitle>
          Please provide your email and phone number
        </Subtitle>
      </div>
      <Fp.Form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Fp.Field name="id.email">
            <Fp.Label>Your email</Fp.Label>
            <Fp.Input placeholder="jane@acme.com" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="id.phone_number">
            <Fp.Label>Your phone</Fp.Label>
            <Fp.Input placeholder="(123) 123-1234" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Divider />
          <button type="submit" className="fp-button">{fp.busy ? 'Saving...' : 'Continue'}</button>
        </div>
      </Fp.Form>
    </Layout>
  );
};

const BusinessData = ({ onDone }: { onDone: () => void }) => {
  const fp = useFootprint();

  const handleSubmit = (data: Di) => {
    fp.save(data, { onSuccess: onDone });
  };

  return (
    <Layout>
       <div style={{ marginBottom: 24 }}>
        <Title>Business information</Title>
        <Subtitle>
        Let's get to know your business! 😊
        </Subtitle>
      </div>
      <Fp.Form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Fp.Field name="business.name">
            <Fp.Label>Business name</Fp.Label>
            <Fp.Input placeholder="Acme Bank Inc." />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="business.dba">
            <Fp.Label>Doing Business As (optional)</Fp.Label>
            <Fp.Input placeholder="Acme Bank" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="business.tin">
            <Fp.Label>Taxpayer Identification Number (TIN)</Fp.Label>
            <Fp.Input placeholder="12-3456789" />
            <Fp.FieldErrors />
          </Fp.Field>
          <div style={{ marginBottom: 8 }}><Divider /></div>
          <Fp.Field name="business.country">
            <Fp.Input placeholder="US" defaultValue="US" type="hidden" />
          </Fp.Field>
          <Fp.Field name="business.address_line1">
            <Fp.Label>Address line 1</Fp.Label>
            <Fp.Input placeholder="Street number" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="business.address_line2">
            <Fp.Label>Address line 2 (optional)</Fp.Label>
            <Fp.Input placeholder="Apartment, suite, etc." />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="business.city">
            <Fp.Label>City</Fp.Label>
            <Fp.Input placeholder="New York" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="business.state">
            <Fp.Label>State</Fp.Label>
            <Fp.Input placeholder="NY" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="business.zip">
            <Fp.Label>Zip</Fp.Label>
            <Fp.Input placeholder="11206" />
            <Fp.FieldErrors />
          </Fp.Field>
          <div style={{ marginBottom: 8 }}><Divider /></div>
          <button type="submit" className="fp-button">{fp.busy ? 'Saving...' : 'Continue'}</button>
        </div>
      </Fp.Form>
    </Layout>
  );
};

const PersonalData = ({ onDone }: { onDone: (validationToken: string) => void }) => {
  const fp = useFootprint();

  const handleSubmit = (data: Di) => {
    fp.save(data, {
      onSuccess: () => {
        fp.handoff({
          onComplete: onDone,
        });
      },
    });
  };

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <Title>Basic information</Title>
        <Subtitle>
        Please provide some basic personal information
        </Subtitle>
      </div>
      <Fp.Form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Fp.Field name="id.first_name">
            <Fp.Label>First name</Fp.Label>
            <Fp.Input placeholder="Jane" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="id.middle_name">
            <Fp.Label>Middle name</Fp.Label>
            <Fp.Input placeholder="Sue" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="id.last_name">
            <Fp.Label>Last name</Fp.Label>
            <Fp.Input placeholder="Joe" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="id.dob">
            <Fp.Label>DOB</Fp.Label>
            <Fp.Input placeholder="MM/DD/YYYY" />
            <Fp.FieldErrors />
          </Fp.Field>
          <div style={{ marginBottom: 8 }}><Divider /></div>
          <Fp.Field name="id.country">
            <Fp.Input placeholder="US" defaultValue="US" type="hidden" />
          </Fp.Field>
          <Fp.Field name="id.address_line1">
            <Fp.Label>Address line 1</Fp.Label>
            <Fp.Input placeholder="Street number" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="id.address_line2">
            <Fp.Label>Address line 2 (optional)</Fp.Label>
            <Fp.Input placeholder="Apartment, suite, etc." />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="id.city">
            <Fp.Label>City</Fp.Label>
            <Fp.Input placeholder="New York" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="id.state">
            <Fp.Label>State</Fp.Label>
            <Fp.Input placeholder="NY" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="id.zip">
            <Fp.Label>Zip</Fp.Label>
            <Fp.Input placeholder="11206" />
            <Fp.FieldErrors />
          </Fp.Field>
          <div style={{ marginBottom: 8 }}><Divider /></div>
          <Fp.Field name="id.ssn9">
            <Fp.Label>SSN</Fp.Label>
            <Fp.Input placeholder="XXX-XX-XXXX" />
            <Fp.FieldErrors />
          </Fp.Field>
          <div style={{ marginBottom: 8 }}><Divider /></div>
          <button type="submit" className="fp-button">{fp.busy ? 'Saving...' : 'Continue'}</button>
        </div>
      </Fp.Form>
    </Layout>
  );
};

const BoData = ({ onDone }: { onDone: () => void }) => {
  const fp = useFootprint();

  const handleSubmit = (data: Di) => {
    fp.save(data, { onSuccess: onDone });
  };

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <Title>Who are the beneficial owners?</Title>
        <Subtitle>
          List all individuals who own at least 25% of the business or have substantial control over the business.
        </Subtitle>
      </div>
      <Fp.Form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Fp.Field name="business.beneficial_owners[0].first_name">
            <Fp.Label>First name</Fp.Label>
            <Fp.Input placeholder="Jane" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="business.beneficial_owners[0].middle_name">
            <Fp.Label>Middle name (optional)</Fp.Label>
            <Fp.Input placeholder="Sue" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="business.beneficial_owners[0].last_name">
            <Fp.Label>Last name</Fp.Label>
            <Fp.Input placeholder="Doe" />
            <Fp.FieldErrors />
          </Fp.Field>
          <Fp.Field name="business.beneficial_owners[0].ownership_stake">
            <Fp.Label>Approximate ownership stake (%)</Fp.Label>
            <Fp.Input placeholder="50" />
            <Fp.FieldErrors />
          </Fp.Field>
          <div style={{ marginBottom: 8 }}><Divider /></div>
          <button type="submit" className="fp-button">Continue</button>
        </div>
      </Fp.Form>
    </Layout>
  );
};

const Success = () => (
  <Layout>
    <div style={{ marginBottom: 24 }}>
      <Title>Success</Title>
      <Subtitle>
      You are all set!
      </Subtitle>
    </div>
  </Layout>
);

export default Demo;