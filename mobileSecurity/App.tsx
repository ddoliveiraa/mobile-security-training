// In App.js in a new project

import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Button } from '@rneui/themed';
import { SocialIcon } from '@rneui/themed';
import { Divider } from '@rneui/themed';

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
          disabled={Platform.OS !== 'ios'}
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
          disabled={Platform.OS !== 'ios'}
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
          disabled={Platform.OS !== 'android'}
          buttonStyle={{
            backgroundColor: '#4285F4',
            borderRadius: 10,
            height: 55,
          }}
          title="Use Fingerprint"
          onPress={() => {
            navigation.navigate('Details', {
              itemId: 86,
              successMessage: 'Sucessfully unlocked with Fingerprint',
            });
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
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
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
  const { itemId, successMessage } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: 'black'}}>itemId: {JSON.stringify(itemId)}</Text>
      <Text style={{color: 'black'}}>otherParam: {JSON.stringify(successMessage)}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    console.log('App.tsx: useEffect()');
    
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