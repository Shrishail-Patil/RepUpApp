import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Book, Home, List } from 'lucide-react-native';
import HomeScreen from './Home';
import PlanScreen from './Plan';
import TrackScreen from './Track';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation }:{ state:any, descriptors:any, navigation:any }) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route:any, index:any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIcon = (routeName: string, isFocused: boolean) => {
            const iconColor = isFocused ? '#0066ff' : 'rgba(255, 255, 255, 0.7)';
            const iconSize = 24;

            switch (routeName) {
              case 'Plan':
                return <Book size={iconSize} color={iconColor} />;
              case 'Home':
                return <Home size={iconSize} color={iconColor} />;
              case 'Track':
                return <List size={iconSize} color={iconColor} />;
              default:
                return null;
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabItem}
            >
              {getIcon(route.name, isFocused)}
              <Text style={[
                styles.tabLabel,
                { color: isFocused ? '#0066ff' : 'rgba(255, 255, 255, 0.7)' }
              ]}>
                {label}
              </Text>
              {isFocused && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Track" component={TrackScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    // padding: 10,
    width: '100%',
    maxWidth: 400,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0066ff',
  },
});