import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileButton from '../components/profilePage/ProfileButton';
import { useEffect } from 'react';
import { getOrCreateChildId } from '../services/anonymousUserService';
import { getVideosByModule } from '../services/videoServices';

const Home = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;
  const isShortScreen = height < 720;

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
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={[styles.mainContent, isDesktop && styles.mainContentDesktop]}>
            <View style={[styles.containerLogo, isTablet && styles.containerLogoTablet, isShortScreen && styles.containerLogoCompact]}>
              <Image
                source={require('../assets/criancas_sorrindo_logo.png')}
                style={styles.imageLogo}
                resizeMode="contain"
              />
            </View>

            <Text style={[styles.introduction, isTablet && styles.introductionTablet]}>
              Nosso aplicativo foi criado para ajudar a transformar a relação das crianças com o cuidado odontológico. Aqui, os pequenos podem aprender de forma divertida, enquanto os dentistas encontram apoio para construir uma experiência de confiança e cuidado.
            </Text>

            <Text style={[styles.title, isDesktop && styles.titleDesktop]}>Quem está usando o aplicativo?</Text>

            <View style={[styles.containerButton, isDesktop && styles.containerButtonDesktop]}>
              <TouchableOpacity
                style={[styles.button, styles.btnDentist, isTablet && styles.buttonTablet, isDesktop && styles.buttonDesktop]}
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
                style={[styles.button, styles.btnChild, isTablet && styles.buttonTablet, isDesktop && styles.buttonDesktop]}
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

          <View style={[styles.partnerLogos, isDesktop && styles.partnerLogosDesktop]}>
            <Image
              source={require('../assets/logoufcg1.png')}
              style={[styles.partnerLogo, styles.ufcgLogo, !isTablet && styles.partnerLogoMobile]}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/logouepb.png')}
              style={[styles.partnerLogo, styles.uepbLogo, !isTablet && styles.partnerLogoMobile]}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
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
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContent: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 760,
  },
  mainContentDesktop: {
    maxWidth: 980,
  },
  containerLogo: {
    marginTop: 24,
    alignItems: 'center',
    width: '100%',
    height: 190,
  },
  containerLogoTablet: {
    height: 260,
  },
  containerLogoCompact: {
    height: 140,
    marginTop: 18,
  },
  imageLogo: {
    width: '100%',
    height: '100%',
  },
  introduction: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 720,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  introductionTablet: {
    fontSize: 18,
    lineHeight: 28,
    marginTop: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 32,
  },
  titleDesktop: {
    fontSize: 30,
    lineHeight: 38,
  },
  containerButton: {
    width: '100%',
    gap: 16,
    paddingHorizontal: 8,
  },
  containerButtonDesktop: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 0,
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
  buttonDesktop: {
    flex: 1,
    maxWidth: 360,
    width: 'auto',
    alignSelf: 'auto',
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
  partnerLogosDesktop: {
    maxWidth: 420,
    marginTop: 10,
  },
  partnerLogo: {
    height: 180,
    flexShrink: 1,
  },
  partnerLogoMobile: {
    height: 100,
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
