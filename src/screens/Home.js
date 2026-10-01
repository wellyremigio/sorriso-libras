import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileButton from '../components/profilePage/ProfileButton';
import { useEffect } from 'react';
import { getOrCreateChildId } from '../services/anonymousUserService';
import { getVideosByModule } from '../services/videoServices';

const Home = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  useEffect(() => {
    const loadChild = async () => {
      const childId = await getOrCreateChildId();
    };

    loadChild();
  }, []);

  useEffect(() => {
  const loadVideos = async () => {
    try {
      const videos = await getVideosByModule("children");
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
        <View style={styles.mainContent}>
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
              style={[styles.button, styles.btnDentist, isTablet && styles.buttonTablet]}
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
              style={[styles.button, styles.btnChild, isTablet && styles.buttonTablet]}
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
          </View>
        </View>

        <View style={styles.partnerLogos}>
          <Image
            source={require('../assets/logoufcg1.png')}
            style={[styles.partnerLogo, styles.ufcgLogo]}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/logouepb.png')}
            style={[styles.partnerLogo, styles.uepbLogo]}
            resizeMode="contain"
          />
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
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  containerLogo: {
    marginTop: 48,
    alignItems: 'center',
    width: '100%',
    height: 230,
  },
  imageLogo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 32,
  },
  containerButton: {
    width: '100%',
    gap: 16,
    paddingHorizontal: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderRadius: 25,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 6,
  },
  buttonTablet: {
    width: '92%',
    alignSelf: 'center',
  },
  btnDentist: {
    backgroundColor: '#74C4CD',
    borderBottomColor: '#50A2AC',
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
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  partnerLogos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    marginTop: 20,
    marginBottom: 12,
  },
  partnerLogo: {
    height: 180,
  },
  ufcgLogo: {
    width: 140,
    height: 160
  },
  uepbLogo: {
    width: 150,
    height: 160
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
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  activePoint: {
    backgroundColor: '#74C4CD',
  },
});

export default Home;
