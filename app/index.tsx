import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/auth/AuthContext';
import LandingPage from '../src/auth/LandingPage';
import LoginScreen from '../src/auth/LoginScreen';
import SignupFlow from '../src/auth/SignupFlow';
import { C } from '../src/constants/theme';
import { AuthScreen } from '../src/types';

export default function Index() {
  const { user, isLoading, login, signup } = useAuth();
  const [screen, setScreen] = useState<AuthScreen>('landing');

  useEffect(() => {
    if (user) setScreen('dashboard');
  }, [user]);

  if (isLoading) {
    return <View style={styles.container} />;
  }

  if (user || screen === 'dashboard') {
    return <Redirect href="/(dashboard)" />;
  }

  if (screen === 'login') {
    return (
      <LoginScreen
        onLogin={login}
        onBack={() => setScreen('landing')}
        onSignUpLink={() => setScreen('signup')}
      />
    );
  }

  if (screen === 'signup') {
    return (
      <SignupFlow
        onComplete={signup}
        onBack={() => setScreen('landing')}
        onLoginLink={() => setScreen('login')}
      />
    );
  }

  return (
    <LandingPage
      onLogin={() => setScreen('login')}
      onSignUp={() => setScreen('signup')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
});
