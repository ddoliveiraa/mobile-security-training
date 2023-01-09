// In App.js in a new project

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: 'black'}}>Home Screen</Text>
      <Button
        title="Use FaceID"
        onPress={() => {
          navigation.navigate('Details', {
            successMessage: 'Sucessfully unlocked with FaceID',
          });
        }}
      />
      <Button
        title="Use TouchID"
        onPress={() => {
          navigation.navigate('Details', {
            successMessage: 'Sucessfully unlocked with TouchID',
          });
        }}
      />
      <Button
        title="Use Fingerprint"
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            successMessage: 'Sucessfully unlocked with Fingerprint',
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: 'black'}}>itemId: {JSON.stringify(itemId)}</Text>
      <Text style={{color: 'black'}}>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;