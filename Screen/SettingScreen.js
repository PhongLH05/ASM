import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>   
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profile}>
          <Image
            source={
              require('../assets/avatar.jpg')
            }
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.name}>Phong Le</Text>
            <Text style={styles.email}>phong123@gmail.com</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.options}>
          <OptionItem title="My orders" subtitle="Already have 10 orders" />
          <OptionItem title="Shipping Addresses" subtitle="03 Addresses" />
          <OptionItem title="Payment Method" subtitle="You have 2 cards" />
          <OptionItem title="My reviews" subtitle="Reviews for 5 items" />
          <OptionItem
            title="Setting"
            subtitle="Notification, Password, FAQ, Contact"
          />
          <OptionItem title="Logout"  />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const OptionItem = ({ title, subtitle }) => (
  <TouchableOpacity style={styles.optionItem}>
    <View>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={22} color="#888" />
  </TouchableOpacity>
);

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  profile: {
    flexDirection: 'row',
    marginVertical: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileText: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    color: '#777',
    marginTop: 4,
  },
  options: {
    gap: 12,
  },
  optionItem: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
});
