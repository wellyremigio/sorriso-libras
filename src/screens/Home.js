import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileButton from '../components/profilePage/ProfileButton';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Área da LOGO */}
      <View style={styles.containerLogo}>
        <Text style={styles.textLogo}>LOGO</Text>
      </View>

      {/* Mascote (Substituímos por um ícone gigante provisório até ter a imagem) */}
      <View style={styles.containerMascot}>
        {/* <FontAwesome5 name="tooth" size={100} color="#3498DB" /> */}
        <Text style={{ marginTop: 10, color: '#7F8C8D' }}>[Mascote em Libras]</Text>
      </View>

      {/* Pergunta */}
      <Text style={styles.tittle}>Quem está usando o app?</Text>

      {/* Botões usando o componente reutilizável */}
      <View style={styles.containerButton}>
        <ProfileButton 
          icon="stethoscope" 
          tittle="SOU DENTISTA" 
          onPress={() => navigation.navigate('DentistMenu')}
        />
        <ProfileButton 
          icon="child" 
          tittle="  SOU CRIANÇA" 
          onPress={() => navigation.navigate('ChildMenu')} 
        />
        <ProfileButton 
          icon="hand-holding-heart" 
          tittle="SOU CUIDADOR" 
          onPress={() => navigation.navigate('CaregiverMenu')} 
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  containerLogo: {
    marginTop: 50,
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  textLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7F8C8D',
  },
  containerMascot: {
    alignItems: 'center',
    marginTop: 20,
  },
  tittle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  containerButton: {
    width: '100%',
  },
  containerPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D5D8DC',
    marginHorizontal: 5,
  },
  activePoint: {
    backgroundColor: '#7F8C8D',
  },
});

export default Home;