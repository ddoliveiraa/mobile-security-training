// In App.js in a new project

import {useEffect, useState} from 'react';
import { View, Text, Platform, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Button } from '@rneui/themed';
import { SocialIcon } from '@rneui/themed';
import { Divider } from '@rneui/themed';

/* Biometrics */
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
const rnBiometrics = new ReactNativeBiometrics();
let asFaceId = false;
let asTouchId = false;
let asFingerprint = true;

/* Signup google */
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const validatedBiometrics = async (navigation) => {
  rnBiometrics.simplePrompt({promptMessage: 'Use your biometrics to unlock'})
    .then((resultObject) => {
      const { success } = resultObject
      if (success) {
        navigation.navigate('Details', {
          itemId: 86,
          successMessage: 'Sucessfully unlocked with Fingerprint',
        });
      }
    }
  );
};

const formatUserInformation = (userInfo) => {
  const { id, email, name } = userInfo.user;
  return `ID: ${id}, Email: ${email}, Name: ${name}`;
};

const validateGoogleSignin = async (navigation) => {
  GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
          GoogleSignin.signIn().then((userInfo) => {
            navigation.navigate('Details', {
              itemId: 86,
              successMessage: formatUserInformation(userInfo),
              image: userInfo.user.photo,
            });

                    console.log(JSON.stringify(userInfo))
          }).catch((e) => {
            console.log("ERROR IS: " + JSON.stringify(e));
          })
      }
  }).catch((e) => {
  console.log("ERROR IS: " + JSON.stringify(e));
  })
};



function HomeScreen({ navigation }) {
  const spaceTop = 10;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: 'black', fontSize: 36}}>RN Mobile Security</Text>

      <View style={{
          marginTop: spaceTop,
          width: 300,
          borderRadius: 10,
        }}>
        <Button
          disabled={asFaceId === false}
          buttonStyle={{
            backgroundColor: '#4285F4',
            borderRadius: 10,
            height: 55,
          }}
          title="Use FaceID"
          onPress={() => {
            navigation.navigate('Details', {
              itemId: 86,
              successMessage: 'Sucessfully unlocked with FaceID',
            });
          }}
        />
      </View>

      <View style={{
          marginTop: spaceTop,
          width: 300,
          borderRadius: 10,
        }}>
        <Button
          disabled={asTouchId === false}
          buttonStyle={{
            backgroundColor: '#4285F4',
            borderRadius: 10,
            height: 55,
          }}
          title="Use TouchID"
          onPress={() => {
            navigation.navigate('Details', {
              itemId: 86,
              successMessage: 'Sucessfully unlocked with TouchID',
            });
          }}
        />
      </View>

      <View style={{
          marginTop: spaceTop,
          width: 300,
          borderRadius: 10,
        }}>
        <Button
          disabled={asFingerprint === false}
          buttonStyle={{
            backgroundColor: '#4285F4',
            borderRadius: 10,
            height: 55,
          }}
          title="Use Fingerprint"
          onPress={() => {
            validatedBiometrics(navigation);
          }}
        />
      </View>

      <Divider
        style={{ width: "80%", margin: 20 }}
        color="#2089dc"
        insetType="left"
        subHeaderStyle={{}}
        width={1}
        orientation="horizontal"
      />

      <SocialIcon
          fontStyle={{}}
          iconSize={25}
          iconStyle={{}}
          iconType='font-awesome'
          onPress={() => validateGoogleSignin(navigation)}
          style={{ borderRadius: 10, width: 300, backgroundColor: '#DB4437' }}          
          loading={false}
          title="Sign In With Google"
          type="google"
          button
      />

      <SocialIcon
          fontStyle={{}}
          iconSize={25}
          iconStyle={{}}
          iconType='font-awesome'
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          style={{ borderRadius: 10, width: 300,backgroundColor: '#808994' }}          
          loading={false}
          title="Sign In With Apple ID"
          type="apple"
          button
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId, successMessage, image } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {
        image && <Image source={{ uri: image }} style={{ width: 150, height: 150, marginBottom: 20 }} />
      }
      <Text style={{color: 'black', marginBottom: 20, maxWidth: 300 }}>{JSON.stringify(successMessage)}</Text>
      <Button title="Go back" style={{ marginBottom: 20, width: 300 }} onPress={() => navigation.goBack()} />
    </View>
  );
}

const validateBiometrics = async () => {
  const { biometryType } = await rnBiometrics.isSensorAvailable();
  /* setAsFaceId(biometryType === BiometryTypes.FaceID);
    setAsTouchId(biometryType === BiometryTypes.TouchID);
    setAsFingerprint(biometryType === BiometryTypes.Biometrics);

    console.log('asFaceId', asFaceId);
    console.log('asTouchId', asTouchId);
    console.log('asFingerprint', asFingerprint); */
};

const configGoogle = () => {
  GoogleSignin.configure({
    androidClientId: '132185962134-0ue2rq7eltqkni5m4sci3iioadk8v6sf.apps.googleusercontent.com'
  });
};

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    validateBiometrics();
    configGoogle();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;