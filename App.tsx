
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupForm from './src/components/form-signup';
import Confirm from './src/components/confirm';
import Trends from './src/components/trends';
import Summary from './src/components/summary';
import { RootStackParamList } from './src/types/navigation';
import { useEffect } from 'react';
import React from 'react';
import SignIn from './src/components/sign-in';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [initialRoute, setInitialRoute] = React.useState<'SignUp' | 'Trends'>('Trends');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      if (loggedIn === 'true') {
        console.log("LOGGED IN", loggedIn)
        setInitialRoute('Trends');
        return
      }
      console.log("LOGGED IN FALSE")
      setInitialRoute('SignUp')
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
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
