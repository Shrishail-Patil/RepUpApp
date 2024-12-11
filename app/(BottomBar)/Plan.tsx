import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';
import { Book, Download, Home, List, Share2 } from 'lucide-react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function WorkoutPlanScreen({ navigation }:{navigation:any}) {
  const [workoutPlan] = useState(`
# Weekly Workout Plan

## Monday - Chest and Triceps
- Bench Press: 4 sets x 8-10 reps
- Incline Dumbbell Press: 3 sets x 10-12 reps
- Chest Flyes: 3 sets x 12-15 reps
- Tricep Pushdowns: 3 sets x 12-15 reps
- Overhead Tricep Extensions: 3 sets x 10-12 reps

## Wednesday - Back and Biceps
- Deadlifts: 4 sets x 6-8 reps
- Pull-ups: 3 sets x max reps
- Bent Over Rows: 3 sets x 8-10 reps
- Hammer Curls: 3 sets x 10-12 reps
- Preacher Curls: 3 sets x 10-12 reps

## Friday - Legs and Shoulders
- Squats: 4 sets x 8-10 reps
- Leg Press: 3 sets x 10-12 reps
- Leg Curls: 3 sets x 12-15 reps
- Military Press: 3 sets x 8-10 reps
- Lateral Raises: 3 sets x 12-15 reps

Remember to warm up before each session and stretch afterwards!
  `);

  const shareWorkoutPlan = async () => {
    try {
      await Share.share({
        message: workoutPlan,
        title: 'My Workout Plan',
      });
    } catch (error) {
      console.error('Error sharing workout plan:', error);
    }
  };

  const downloadWorkoutPlanAsPDF = async () => {
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; color: white; background-color: #1a1a1a; padding: 20px;">
          <h1 style="color: #0066ff;">My Workout Plan</h1>
          ${workoutPlan.replace(/\n/g, '<br>')}
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ 
        html: htmlContent,
        base64: false
      });
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error downloading workout plan as PDF:', error);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require("@/assets/images/02bg.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Workout Plan</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={shareWorkoutPlan} style={styles.iconButton}>
                <Share2 size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={downloadWorkoutPlanAsPDF} style={styles.iconButton}>
                <Download size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.markdownContainer}>
              <Markdown style={markdownStyles}>{workoutPlan}</Markdown>
            </View>
          </ScrollView>
        </View>

        {/* Bottom Navigation */}
        {/* <View style={styles.bottomNav}>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <Book size={24} color="#0066ff" />
            <Text style={[styles.navText, styles.navTextActive]}>Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <Home size={24} color="#fff" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Track')}>
            <List size={24} color="#fff" />
            <Text style={styles.navText}>Track</Text>
          </TouchableOpacity>
        </View> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom:87,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
  },
  markdownContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 80, // To ensure content is not hidden behind the bottom nav
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: 'rgba(0, 102, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
  navTextActive: {
    color: '#0066ff',
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: '#fff',
    fontSize: 16,
  },
  heading1: {
    color: '#0066ff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading2: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  listItemBullet: {
    width: 20,
    fontSize: 16,
    lineHeight: 20,
    color: '#0066ff',
  },
});