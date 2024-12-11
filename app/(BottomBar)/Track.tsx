import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Book, Home, List, Plus, X, ChevronDown, ChevronUp } from 'lucide-react-native';

export default function WorkoutTrackingScreen({ navigation }:{navigation:any}) {
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Bench Press', sets: [{ reps: '', weight: '' }] }
  ]);

  const [previousWorkouts, setPreviousWorkouts] = useState([
    {
      id: 1,
      date: '2023-11-12',
      exercises: [
        { name: 'Bench Press', sets: [{ reps: 10, weight: 135 }, { reps: 8, weight: 145 }] },
        { name: 'Squats', sets: [{ reps: 12, weight: 185 }, { reps: 10, weight: 205 }] },
      ],
      expanded: false,
    },
    {
      id: 2,
      date: '2023-11-10',
      exercises: [
        { name: 'Deadlift', sets: [{ reps: 8, weight: 225 }, { reps: 6, weight: 245 }] },
        { name: 'Pull-ups', sets: [{ reps: 12, weight: 0 }, { reps: 10, weight: 0 }] },
      ],
      expanded: false,
    },
  ]);

  const addExercise = () => {
    const newId = exercises.length > 0 ? Math.max(...exercises.map(e => e.id)) + 1 : 1;
    setExercises([...exercises, { id: newId, name: '', sets: [{ reps: '', weight: '' }] }]);
  };

  const removeExercise = (id:any) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const updateExerciseName = (id:any, name:any) => {
    setExercises(exercises.map(exercise => 
      exercise.id === id ? { ...exercise, name } : exercise
    ));
  };

  const addSet = (exerciseId:any) => {
    setExercises(exercises.map(exercise => 
      exercise.id === exerciseId 
        ? { ...exercise, sets: [...exercise.sets, { reps: '', weight: '' }] }
        : exercise
    ));
  };

  const updateSet = (exerciseId:any, setIndex:any, field:any, value:any) => {
    setExercises(exercises.map(exercise => 
      exercise.id === exerciseId 
        ? {
            ...exercise,
            sets: exercise.sets.map((set, index) => 
              index === setIndex ? { ...set, [field]: value } : set
            )
          }
        : exercise
    ));
  };

  const saveWorkout = () => {
    console.log('Saving workout:', exercises);
    // Here you would typically send this data to your backend or store it locally
    // For now, we'll just log it to the console
  };

  const toggleWorkoutExpansion = (id:any) => {
    setPreviousWorkouts(previousWorkouts.map(workout => 
      workout.id === id ? { ...workout, expanded: !workout.expanded } : workout
    ));
  };

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require("@/assets/images/02bg.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Track Workout</Text>
          <ScrollView style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
            {exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseContainer}>
                <View style={styles.exerciseHeader}>
                  <TextInput
                    style={styles.exerciseNameInput}
                    value={exercise.name}
                    onChangeText={(text) => updateExerciseName(exercise.id, text)}
                    placeholder="Exercise Name"
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
                    <X size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                {exercise.sets.map((set, setIndex) => (
                  <View key={setIndex} style={styles.setContainer}>
                    <Text style={styles.setText}>Set {setIndex + 1}</Text>
                    <TextInput
                      style={styles.setInput}
                      value={set.reps}
                      onChangeText={(text) => updateSet(exercise.id, setIndex, 'reps', text)}
                      placeholder="Reps"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.setInput}
                      value={set.weight}
                      onChangeText={(text) => updateSet(exercise.id, setIndex, 'weight', text)}
                      placeholder="Weight"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                    />
                  </View>
                ))}
                <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(exercise.id)}>
                  <Text style={styles.addSetButtonText}>Add Set</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addExerciseButton} onPress={addExercise}>
              <Plus size={24} color="#fff" />
              <Text style={styles.addExerciseButtonText}>Add Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
              <Text style={styles.saveButtonText}>Save Workout</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Previous Workouts</Text>
            {previousWorkouts.map((workout) => (
              <View key={workout.id} style={styles.previousWorkoutContainer}>
                <TouchableOpacity 
                  style={styles.previousWorkoutHeader} 
                  onPress={() => toggleWorkoutExpansion(workout.id)}
                >
                  <Text style={styles.previousWorkoutDate}>{workout.date}</Text>
                  {workout.expanded ? (
                    <ChevronUp size={24} color="#fff" />
                  ) : (
                    <ChevronDown size={24} color="#fff" />
                  )}
                </TouchableOpacity>
                {workout.expanded && (
                  <View style={styles.previousWorkoutDetails}>
                    {workout.exercises.map((exercise, index) => (
                      <View key={index} style={styles.previousExerciseContainer}>
                        <Text style={styles.previousExerciseName}>{exercise.name}</Text>
                        {exercise.sets.map((set, setIndex) => (
                          <Text key={setIndex} style={styles.previousSetText}>
                            Set {setIndex + 1}: {set.reps} reps @ {set.weight} lbs
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Navigation */}
        {/* <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Plan')}>
            <Book size={24} color="#fff" />
            <Text style={styles.navText}>Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <Home size={24} color="#fff" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <List size={24} color="#0066ff" />
            <Text style={[styles.navText, styles.navTextActive]}>Track</Text>
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
    paddingBottom:87
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  exerciseContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseNameInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  setContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  setText: {
    color: '#fff',
    width: 50,
  },
  setInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
    color: '#fff',
  },
  addSetButton: {
    backgroundColor: 'rgba(0, 102, 255, 0.2)',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addSetButtonText: {
    color: '#0066ff',
    fontWeight: 'bold',
  },
  addExerciseButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 102, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  addExerciseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#0066ff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  previousWorkoutContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  previousWorkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  previousWorkoutDate: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previousWorkoutDetails: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  previousExerciseContainer: {
    marginBottom: 10,
  },
  previousExerciseName: {
    color: '#0066ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  previousSetText: {
    color: '#fff',
    marginLeft: 10,
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