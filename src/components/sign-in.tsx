import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { signIn } from '../api/auth';

type SignInNavigationProp = NavigationProp<RootStackParamList, 'SignIn'>;

const SignIn: React.FC = () => {
  const navigation = useNavigation<SignInNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    try {
      await signIn({ username, password });
      navigation.navigate('Trends');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />
      <Button title="Sign In" onPress={onSignIn} />
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
});

export default SignIn;
