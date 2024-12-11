import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/theme';

export default function GetStartedButton() {
  return (
    <TouchableOpacity style={styles.button} onPress={() => console.log('Get Started pressed')}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: 18,
    fontFamily: fonts.medium,
  },
});

