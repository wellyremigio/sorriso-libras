import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 

const ProfileButton = ({ icone, titulo, onPress }) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <View style={styles.iconeContainer}>
        {/* <FontAwesome5 name={icone} size={28} color="#7F8C8D" /> */}
      </View>
      
      <Text style={styles.textoBotao}>{titulo}</Text>
      
      {/* <Ionicons name="chevron-forward" size={24} color="#BDC3C7" /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  iconeContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 15,
  },
  textoBotao: {
    flex: 1, 
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  }
});

export default ProfileButton;