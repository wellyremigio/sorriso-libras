import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileButton from '../components/profilePage/ProfileButton';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Área da LOGO */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoTexto}>LOGO</Text>
      </View>

      {/* Mascote (Substituímos por um ícone gigante provisório até ter a imagem) */}
      <View style={styles.mascoteContainer}>
        {/* <FontAwesome5 name="tooth" size={100} color="#3498DB" /> */}
        <Text style={{ marginTop: 10, color: '#7F8C8D' }}>[Mascote em Libras]</Text>
      </View>

      {/* Pergunta */}
      <Text style={styles.titulo}>Quem está usando o app?</Text>

      {/* Botões usando o componente reutilizável */}
      <View style={styles.botoesContainer}>
        <ProfileButton 
          icone="stethoscope" 
          titulo="Sou Dentista" 
          onPress={() => alert('Indo para a área do Dentista')} 
        />
        <ProfileButton 
          icone="child" 
          titulo="Sou Criança" 
          onPress={() => alert('Indo para a área da Criança')} 
        />
        <ProfileButton 
          icone="hand-holding-heart" 
          titulo="Sou Cuidador" 
          onPress={() => alert('Indo para a área do Cuidador')} 
        />
      </View>

      {/* Pontinhos de Paginação no Rodapé */}
      <View style={styles.paginacaoContainer}>
        <View style={[styles.ponto, styles.pontoAtivo]} />
        <View style={styles.ponto} />
        <View style={styles.ponto} />
      </View>

    </SafeAreaView>
  );
}

// Aqui é o StyleSheet, mas repare como o JSX lá em cima ficou super limpo!
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    justifyContent: 'space-between', // Distribui os elementos na tela
  },
  logoContainer: {
    marginTop: 50,
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  logoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7F8C8D',
  },
  mascoteContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  botoesContainer: {
    width: '100%',
  },
  paginacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  ponto: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D5D8DC',
    marginHorizontal: 5,
  },
  pontoAtivo: {
    backgroundColor: '#7F8C8D',
  },
});

export default Home;