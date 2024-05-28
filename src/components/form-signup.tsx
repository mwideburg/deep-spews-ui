import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { signUp } from '../api/auth';

type SignupFormNavigationProp = NavigationProp<RootStackParamList, 'SignUp'>;

const SignupForm: React.FC = () => {
  const navigation = useNavigation<SignupFormNavigationProp>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSubmit = async () => {
    await signUp({
      username,
      email,
      password,
      phoneNumber,
    });
    console.log("Attempting to Navigate")
    navigation.navigate('Confirm');
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
      />
      <Button title="Sign Up" onPress={onSubmit} />
      <TouchableOpacity onPress={navigateToSignIn}>
        <Text style={styles.signInText}>Already a user? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  signInText: {
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SignupForm;
