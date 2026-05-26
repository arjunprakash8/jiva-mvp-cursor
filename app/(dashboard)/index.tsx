import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../../src/auth/AuthContext';
import BottomNav from '../../src/components/BottomNav';
import PulseScreen from '../../src/screens/PulseScreen';
import BiometricsScreen from '../../src/screens/BiometricsScreen';
import ActivityScreen from '../../src/screens/ActivityScreen';
import FuelScreen from '../../src/screens/FuelScreen';
import RecoveryScreen from '../../src/screens/RecoveryScreen';
import HubScreen from '../../src/screens/HubScreen';
import { C } from '../../src/constants/theme';
import { TabId } from '../../src/types';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [tab, setTab] = useState<TabId>('pulse');

  if (!user) {
    return <Redirect href="/" />;
  }

  const renderScreen = () => {
    switch (tab) {
      case 'pulse':
        return <PulseScreen user={user} />;
      case 'biometrics':
        return <BiometricsScreen user={user} />;
      case 'activity':
        return <ActivityScreen user={user} />;
      case 'fuel':
        return <FuelScreen user={user} />;
      case 'recovery':
        return <RecoveryScreen user={user} />;
      case 'hub':
        return <HubScreen user={user} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomNav active={tab} onTabChange={setTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    flex: 1,
  },
});
