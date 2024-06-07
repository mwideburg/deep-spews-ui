import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { confirm } from '../api/auth';

type ConfirmNavigationProp = NavigationProp<RootStackParamList, 'Confirm'>;

const Confirm: React.FC = () => {
  const navigation = useNavigation<ConfirmNavigationProp>();
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const onConfirm = async () => {
    try {
      await confirm({
        username,
        verificationCode,
      });
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Confirmation failed:', error);
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
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        placeholderTextColor="#999"
      />
      <Button title="Confirm" onPress={onConfirm} />
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

export default Confirm;
