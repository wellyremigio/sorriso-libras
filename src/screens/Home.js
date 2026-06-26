import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileButton from '../components/profilePage/ProfileButton';
import { useEffect } from 'react';
import { getOrCreateChildId } from '../services/anonymousUserService';
import { getVideosByMudule } from '../services/videoService';

const Home = ({ navigation }) => {

  useEffect(() => {
    const loadChild = async () => {
      const childId = await getOrCreateChildId();
    };

    loadChild();
  }, []);

  useEffect(() => {
  const loadVideos = async () => {
    try {
      const videos = await getVideosByMudule("children");
    } catch (error) {
      console.log("Erro ao carregar vídeos:", error);
    }
  };

  loadVideos();
}, []);

  return (
    <ImageBackground
      source={require('../assets/imagem_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>

        <View style={styles.containerLogo}>
          <Image
            source={require('../assets/criancas_sorrindo_logo.png')}
            style={styles.imageLogo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Quem está usando o aplicativo?</Text>

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[styles.button, styles.btnDentist]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DentistMenu')}
          >
            <View style={styles.iconWrapper}>
              <Image
                source={require('../assets/dentist_menu_dentist.png')}
                style={styles.buttonIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.buttonText}>Sou Dentista</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.btnChild]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ChildMenu')}
          >
            <View style={styles.iconWrapper}>
              <Image 
                source={require('../assets/criancas_img.png')} 
                style={styles.buttonIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.buttonText}>Sou Criança</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[styles.button, styles.btnCaregiver]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CaregiverMenu')}
          >
            <View style={styles.iconWrapper}>
              <Image 
                source={require('../assets/cuidador_img.png')} 
                style={styles.buttonIcon}
                resizeMode="contain"
                />
            </View>
            <Text style={styles.buttonText}>Sou Cuidador</Text>

          </TouchableOpacity> */}

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24, // Maior respiro lateral
    justifyContent: 'center',
  },
  containerLogo: {
    marginTop: 48,
    alignItems: 'center',
    width: '100%',
    height: 230, // Aumentei um pouco para acomodar bem a ilustração das crianças
  },
  imageLogo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A', // Um cinza um pouco mais quente para combinar com o fundo
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 32, // Melhora a leitura da quebra de linha
  },
  containerButton: {
    width: '100%',
    gap: 16, // Distância uniforme entre os botões
    paddingHorizontal: 8,
  },

  // Estilo Base dos Botões (O segredo do efeito 3D)
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderRadius: 25,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)', // Reflexo claro na borda superior
    borderBottomWidth: 6, // Sombra inferior para dar profundidade (Pílula 3D)
  },

  // Cores Específicas de cada Botão
  btnDentist: {
    backgroundColor: '#74C4CD',
    borderBottomColor: '#50A2AC', // Tom mais escuro para a sombra
  },
  btnChild: {
    backgroundColor: '#F3A1B5',
    borderBottomColor: '#D67C92',
  },

  iconWrapper: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonIcon: {
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Sombra leve no texto para destacar
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  containerPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 8,
  },
  point: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Bolinhas inativas mais sutis
  },
  activePoint: {
    backgroundColor: '#74C4CD', // Cor puxada para a paleta principal
  },
});

export default Home;