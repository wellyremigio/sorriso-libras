import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileButton from '../components/profilePage/ProfileButton';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.containerLogo}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.imageLogo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.tittle}>Quem está usando o app?</Text>

      {/* Botões usando o componente reutilizável */}
      <View style={styles.containerButton}>
        <ProfileButton
          icon="tooth"
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
    backgroundColor: '#FFFBEF',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  containerLogo: {
    marginTop: 60,
    alignItems: 'center',
    width: '100%',
    height: 120,
  },
  imageLogo: {
    width: '80%', // Ajuste a largura conforme o design
    height: '100%',
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