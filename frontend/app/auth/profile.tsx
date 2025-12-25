import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AppContext';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';

const ProfileScreen = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || 'User',
    email: user?.email || 'email@example.com',
    phone: '+1 234 567 8900',
    location: 'Colombo, Sri Lanka',
  });

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const performLogout = async () => {
    try {
      await logout();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to logout?')) {
        await performLogout();
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: performLogout
          }
        ]
      );
    }
  };

  return (
    <LinearGradient
      colors={["#EBF3E8", "#D1EBD7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" size={28} color="#6b7280" />
            </TouchableOpacity>
            <Text weight="medium" style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons 
                name={isEditing ? "checkmark" : "pencil"} 
                size={20} 
                color="#5a9a7a" 
              />
            </TouchableOpacity>
          </View>

          {/* Profile Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={60} color="#5a9a7a" />
            </View>
            <Text variant="h2" weight="semibold" style={styles.userName}>{editedUser.name}</Text>
            <Text variant="bodySmall" style={styles.userEmail}>{editedUser.email}</Text>
          </View>

          {/* Profile Details */}
          <View style={styles.detailsCard}>
            <Text variant="h3" weight="semibold" style={styles.cardTitle}>Personal Information</Text>
            
            <View style={styles.fieldContainer}>
              <Text variant="caption" weight="medium" style={styles.fieldLabel}>Full Name</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={editedUser.name}
                  onChangeText={(text) => setEditedUser({...editedUser, name: text})}
                />
              ) : (
                <Text style={styles.fieldValue}>{editedUser.name}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text variant="caption" weight="medium" style={styles.fieldLabel}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={editedUser.email}
                  onChangeText={(text) => setEditedUser({...editedUser, email: text})}
                  keyboardType="email-address"
                />
              ) : (
                <Text style={styles.fieldValue}>{editedUser.email}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text variant="caption" weight="medium" style={styles.fieldLabel}>Phone</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={editedUser.phone}
                  onChangeText={(text) => setEditedUser({...editedUser, phone: text})}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.fieldValue}>{editedUser.phone}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text variant="caption" weight="medium" style={styles.fieldLabel}>Location</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={editedUser.location}
                  onChangeText={(text) => setEditedUser({...editedUser, location: text})}
                />
              ) : (
                <Text style={styles.fieldValue}>{editedUser.location}</Text>
              )}
            </View>

            {isEditing && (
              <Button 
                title="Save Changes" 
                onPress={handleSave} 
                style={styles.saveButton} 
              />
            )}
          </View>

          {/* Stats Card */}
          <View style={styles.statsCard}>
            <Text variant="h3" weight="semibold" style={styles.cardTitle}>Plant Care Stats</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text variant="h1" weight="semibold" style={styles.statNumber}>5</Text>
                <Text variant="caption" style={styles.statLabel}>Plants</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="h1" weight="semibold" style={styles.statNumber}>12</Text>
                <Text variant="caption" style={styles.statLabel}>Tasks Done</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="h1" weight="semibold" style={styles.statNumber}>3</Text>
                <Text variant="caption" style={styles.statLabel}>Devices</Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#dc2626" />
            <Text weight="semibold" style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 30 : 0 },
  scrollView: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },
  backButton: { padding: 8, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#111827' },
  editButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  avatarContainer: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 16, elevation: 3 },
  userName: { color: '#111827', marginBottom: 4 },
  userEmail: { color: '#6b7280' },
  detailsCard: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, padding: 20, marginBottom: 16, elevation: 3 },
  cardTitle: { color: '#111827', marginBottom: 16 },
  fieldContainer: { marginBottom: 16 },
  fieldLabel: { color: '#6b7280', marginBottom: 8 },
  fieldValue: { color: '#111827', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#f9fafb', borderRadius: 8 },
  fieldInput: { fontSize: 16, color: '#111827', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#f9fafb', borderRadius: 8, borderWidth: 1, borderColor: '#5a9a7a' },
  saveButton: { marginTop: 8 },
  statsCard: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, padding: 20, marginBottom: 24, elevation: 3 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNumber: { color: '#5a9a7a', marginBottom: 4 },
  statLabel: { color: '#6b7280' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginHorizontal: 16, paddingVertical: 16, borderRadius: 12, marginBottom: 32, gap: 8, borderWidth: 1, borderColor: '#dc2626' },
  logoutText: { color: '#dc2626' },
});

export default ProfileScreen;
