import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupForm from './src/components/form-signup';
import { RootStackParamList } from './src/types/navigation';
import Confirm from './src/components/confirm';
import SignIn from './src/components/sign-in';
import Trends from './src/components/trends';
import Summary from './src/components/summary';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignupForm} />
        <Stack.Screen name="Confirm" component={Confirm} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Trends" component={Trends} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
