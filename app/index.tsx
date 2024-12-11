import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Appearance,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Svg, Path } from 'react-native-svg';
import { Link } from 'expo-router';

export default function GetStarted({ navigation }:{navigation:any}) {
  const colorScheme = Appearance.getColorScheme();
  // Dumbbell SVG component
  const DumbbellIcon = () => (
    <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.4 6H3.6C2.72 6 2 6.72 2 7.6V16.4C2 17.28 2.72 18 3.6 18H6.4C7.28 18 8 17.28 8 16.4V7.6C8 6.72 7.28 6 6.4 6Z"
        stroke="white"
        strokeWidth="2"
      />
      <Path
        d="M20.4 6H17.6C16.72 6 16 6.72 16 7.6V16.4C16 17.28 16.72 18 17.6 18H20.4C21.28 18 22 17.28 22 16.4V7.6C22 6.72 21.28 6 20.4 6Z"
        stroke="white"
        strokeWidth="2"
      />
      <Path d="M8 12H16" stroke="white" strokeWidth="2" />
    </Svg>
  );

  return (
    <View style={styles.container}>
      <StatusBar style='dark'/>
      <ImageBackground
        source={require("@/assets/images/02bg.png")}
        style={styles.backgroundImage}
        // blurRadius={2}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <DumbbellIcon />
            </View>
            
            <Text style={styles.title}>Transform Your Journey</Text>
            <Text style={styles.subtitle}>
              Track your progress, achieve your goals, and become stronger every day
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>100+</Text>
                <Text style={styles.statLabel}>Exercises</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>30+</Text>
                <Text style={styles.statLabel}>Programs</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>10K+</Text>
                <Text style={styles.statLabel}>Athletes</Text>
              </View>
            </View>

            <Link href={"/Profile"} style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </Link>

          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 50,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 5,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, .6)",
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
    textAlign:"center",
    width:Dimensions.get('window').width-60,
    alignSelf:"center",
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    textAlign: 'center',
  },
});