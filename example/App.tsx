import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, useColorScheme } from 'react-native';
import { LaunchArguments } from 'expo-native-launch-arguments';
import { stringifyPair } from './stringifyPair';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    flex: 1,
  };

  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={styles.container}>
        <Text style={[styles.title, { color: textColor }]}>Launch Arguments</Text>
        {Object.entries(LaunchArguments.value()).map(([k, v]) => (
          <Text key={k} style={[styles.argument, { color: textColor }]}>
            {stringifyPair(k, v)}
          </Text>
        ))}
        {Object.keys(LaunchArguments.value()).length === 0 && (
          <Text style={[styles.noArgs, { color: textColor }]}>
            No launch arguments provided
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  argument: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  noArgs: {
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.7,
  },
});
