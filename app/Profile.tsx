import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Switch, ImageBackground, Dimensions, Appearance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen({ navigation}:{navigation:any}) {
  const [profile, setProfile] = useState({
    age: '',
    height: '',
    currentWeight: '',
    goalWeight: '',
    activeDays: 3,
    hasGymAccess: false,
    fitnessGoal: '',
    fitnessLevel: '',
    workoutSplit: '',
    limitations: ''
  });

  const handleSave = () => {
    // Handle save logic here
    console.log('Profile saved:', profile);
    navigation.navigate('Home');
  };
  const colorScheme = Appearance.getColorScheme();

  return (
    <ImageBackground
      source={require("../assets/images/02bg.png")}
      style={styles.backgroundImage}
    >
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme!}/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Complete Your Profile</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={profile.age}
            onChangeText={(text) => setProfile(prev => ({ ...prev, age: text }))}
            keyboardType="numeric"
            placeholder="20"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={profile.height}
            onChangeText={(text) => setProfile(prev => ({ ...prev, height: text }))}
            keyboardType="numeric"
            placeholder="170"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={profile.currentWeight}
            onChangeText={(text) => setProfile(prev => ({ ...prev, currentWeight: text }))}
            keyboardType="numeric"
            placeholder="70"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Goal Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={profile.goalWeight}
            onChangeText={(text) => setProfile(prev => ({ ...prev, goalWeight: text }))}
            keyboardType="numeric"
            placeholder="65"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Active Days per Week: {profile.activeDays}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={7}
            step={1}
            value={profile.activeDays}
            onValueChange={(value) => setProfile(prev => ({ ...prev, activeDays: value }))}
            minimumTrackTintColor="white"
            maximumTrackTintColor="#4B5563"
            thumbTintColor="gray"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.toggleContainer}>
            <Text style={styles.label}>I have access to gym equipment</Text>
            <Switch
              value={profile.hasGymAccess}
              onValueChange={(value) => setProfile(prev => ({ ...prev, hasGymAccess: value }))}
              trackColor={{ false: '#4B5563', true: '#0066ff'}}
              thumbColor={profile.hasGymAccess ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fitness Goal</Text>
          <TextInput
            style={styles.input}
            value={profile.fitnessGoal}
            onChangeText={(text) => setProfile(prev => ({ ...prev, fitnessGoal: text }))}
            placeholder="e.g., Lose weight, Build muscle"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Fitness Level</Text>
          <TextInput
            style={styles.input}
            value={profile.fitnessLevel}
            onChangeText={(text) => setProfile(prev => ({ ...prev, fitnessLevel: text }))}
            placeholder="e.g., Beginner, Intermediate"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preferred Workout Split</Text>
          <TextInput
            style={styles.input}
            value={profile.workoutSplit}
            onChangeText={(text) => setProfile(prev => ({ ...prev, workoutSplit: text }))}
            placeholder="e.g., Full body, Upper/Lower"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Injuries or Limitations</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={profile.limitations}
            onChangeText={(text) => setProfile(prev => ({ ...prev, limitations: text }))}
            placeholder="Describe any injuries or physical limitations"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* <TouchableOpacity  onPress={handleSave}>
        </TouchableOpacity> */}
        <Link href={"/Home"} style={styles.saveButton} onPress={()=>{handleSave}}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </Link>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(0,0,0,.5)",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.2)',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  slider: {
    height: 40,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: "rgba(0, 0, 0, .6)",
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
    textAlign:"center",
    width:Dimensions.get('window').width-60,
    alignSelf:"center",
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});