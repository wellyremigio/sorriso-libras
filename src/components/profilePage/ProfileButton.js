import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 

const ProfileButton = ({ icon, tittle, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.containerIcon}>
        <FontAwesome5 name={icon} size={28} color="#ffffff" />
      </View>
      
      <Text style={styles.buttonText}>{tittle}</Text>
      
      <Ionicons name="chevron-forward" size={24} color="#BDC3C7" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#63bcf7',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  containerIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: 15,
  },
  buttonText: {
    flex: 1, 
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  }
});

export default ProfileButton;