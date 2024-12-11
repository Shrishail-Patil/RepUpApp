import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, ImageBackground, Dimensions, Appearance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Search, Target, Book, Home, List } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }:{navigation:any}) {
  const weightData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [85, 86.5, 85.5, 87, 84.5, 86, 87],
    }]
  };
  const colorScheme = Appearance.getColorScheme();


  return (
    <View style={styles.safeArea}>
      <StatusBar style={colorScheme!}/>
      <ImageBackground
        source={require("@/assets/images/02bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={{ uri: "/placeholder.svg?height=40&width=40" }}
              style={styles.profileImage}
            />
            <View style={styles.notificationContainer}>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell size={20} color="#fff" />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          {/* <View style={styles.searchContainer}>
            <Search size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View> */}

          {/* Weight Data Card */}
          <View style={styles.weightCard}>
            <View style={styles.weightCardHeader}>
              <Text style={styles.weightCardTitle}>Weight data</Text>
              <TouchableOpacity>
                <Text style={styles.moreButton}>•••</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.weightMetrics}>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>87</Text>
                <Text style={styles.metricUnit}>kg</Text>
                <Text style={styles.metricLabel}>Current</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>95</Text>
                <Text style={styles.metricUnit}>kg</Text>
                <Text style={styles.metricLabel}>Goal</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>23</Text>
                <Text style={styles.metricUnit}>%</Text>
                <Text style={styles.metricLabel}>Progress</Text>
              </View>
            </View>

            <View style={styles.timeFilter}>
              {['All', 'Month', 'Week', 'Day'].map((period) => (
                <TouchableOpacity 
                  key={period} 
                  style={[styles.filterButton, period === 'Week' && styles.filterButtonActive]}
                >
                  <Text style={[styles.filterText, period === 'Week' && styles.filterTextActive]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <LineChart
              data={weightData}
              width={width - 60}
              height={180}
              transparent
              chartConfig={{
                backgroundColor: '#0066ff',
                backgroundGradientFrom: 'rgba(32,32,32,1)',
                backgroundGradientTo: 'rgba(40,40,40,0.1)',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#0066ff'
                }
              }}
              bezier
              style={styles.chart}
              withDots={true}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
            />
          </View>

          {/* Goals Card */}
          {/* <TouchableOpacity style={styles.goalsCard}>
            <View style={styles.goalsContent}>
              <View style={styles.goalsIcon}>
                <Target size={24} color="#0066ff" />
              </View>
              <View style={styles.goalsText}>
                <Text style={styles.goalsTitle}>100 goals of the Movement</Text>
                <Text style={styles.goalsSubtitle}>77 out of 100 days</Text>
              </View>
            </View>
            <Text style={styles.goalsArrow}>→</Text>
          </TouchableOpacity> */}
        </ScrollView>

        {/* Bottom Navigation */}
        {/* <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Plan')}>
            <Book size={24} color="#fff" />
            <Text style={styles.navText}>Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <Home size={24} color="#0066ff" />
            <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100, // Add extra padding at bottom for better scroll experience
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationButton: {
    backgroundColor: 'rgba(255,255,255,.3)',
    padding: 8,
    borderRadius: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#0066ff',
    borderRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.2)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  weightCard: {
    backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  weightCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  weightCardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  moreButton: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  weightMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  metricUnit: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  metricLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  timeFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 5,
  },
  filterButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  filterText: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 16,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  chart: {
    alignSelf: "center",
    marginLeft: -20,
    marginRight: -20,

  },
  goalsCard: {
    backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  goalsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalsIcon: {
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  goalsText: {
    flex: 1,
  },
  goalsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,1)',
    marginBottom: 4,
  },
  goalsSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,.7)',
  },
  goalsArrow: {
    fontSize: 20,
    color: 'rgba(255,255,255,.7)',
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