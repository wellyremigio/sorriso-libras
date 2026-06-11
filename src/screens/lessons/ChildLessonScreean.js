import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingBalloons from '../../components/animation/FloatingBalloons';
import { BlurView } from 'expo-blur';



const COLORS = {
  textDark: '#4A2C2A',

  stepCard: '#A2C4C9',
  stepCardShadow: '#74AEB6',

  infoCard: '#FFFDFC',
  infoCardBorder: '#DCEEEF',

  nextButton: '#78dda0',
  nextButtonShadow: '#33b962',

  activeDot: '#74C4CD',
  inactiveDot: '#E7DDE2',
};

const ChildLessonScreen = ({ navigation, route }) => {
  const { menuItems = [], initialIndex = 0 } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showStickerPopup, setShowStickerPopup] = useState(false);
  const [showFinishPopup, setShowFinishPopup] = useState(false);
  const totalSteps = menuItems.length > 0 ? menuItems.length : 1;
  const currentItem = menuItems[currentIndex] || { title: 'Carregando...' };


  const handleNextStep = () => {
    navigation.navigate('StickerAchievementScreen');
    setTimeout(() => {
      if (currentIndex < totalSteps - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowFinishPopup(true); // Se for o último vídeo, prepara o pop-up de troféu para quando ele voltar
      }
    }, 500);
  };

  const handleFinishModule = () => {
    setShowFinishPopup(false);
    navigation.navigate('Home'); // Vai para a Home em vez de voltar, já que o módulo acabou
  };

  return (
    <ImageBackground
      source={require("../../assets/imagem_fundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>

        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={28} color="#5D4037" />
          </TouchableOpacity>

          <View style={styles.logoPlaceholder}>
            <Image source={require('../../assets/upper_logo.png')} style={styles.logoImage} resizeMode="contain" />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
            <Ionicons name="home" size={26} color="#5D4037" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleBanner}>
          <Text style={styles.titleText}>{currentItem.title}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.videoCard}>
            <View style={styles.videoMainArea}>
              <View style={styles.playButtonCircle}>
                <Ionicons name="play" size={32} color="#FFF" style={{ marginLeft: 4 }} />
              </View>
            </View>

            <View style={styles.librasWindow}>
              <Ionicons name="person" size={40} color="#BDC3C7" />
            </View>

            <View style={styles.videoControls}>
              <Ionicons name="play" size={16} color="#FFF" />
              <Text style={styles.videoTime}>0,7%</Text>
              <View style={styles.progressBarTrack}>
                <View style={styles.progressBarFill} />
                <View style={styles.progressThumb} />
              </View>
              <Ionicons name="options" size={16} color="#FFF" />
            </View>
          </View>

          <View style={styles.stepIndicatorContainer}>
            <Text style={styles.stepText}>Passo {currentIndex + 1}  {currentItem.title}</Text>
            <Text style={styles.stepTextRight}>{currentIndex + 1}/{totalSteps}</Text>
          </View>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              Escove os dentes com movimentos suaves por 2 minutos.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextStep}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === totalSteps - 1 ? 'Finalizar' : 'Próximo'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dotsContainer}>
            {menuItems.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot
                ]}
              />
            ))}
          </View>
        </ScrollView>

        {showFinishPopup && (
          <BlurView intensity={50} tint="light" style={styles.overlay}>
            <View style={styles.finishPopupBox}>
              <View style={styles.stickerGlow}>
                <Image
                  source={require('../../assets/stickers/sticker6.png')}
                  style={styles.finishSticker}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.finishTitle}>Parabéns!</Text>
              <Text style={styles.finishText}>
                Você completou todas as lições. Continue cuidando bem do seu sorriso!
              </Text>

              <TouchableOpacity
                style={styles.finishButton}
                onPress={handleFinishModule}
                activeOpacity={0.8}
              >
                <Text style={styles.finishButtonText}>Voltar à Tela Inicial</Text>
              </TouchableOpacity>

            </View>
          </BlurView>
        )}

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  iconButton: { padding: 5 },
  logoPlaceholder: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: { width: 300, height: 200 },
  titleBanner: {
    backgroundColor: '#F0E4E7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleArrow: { marginRight: 15 },
  titleText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E342E',
    textAlign: 'center',
    marginRight: 35,
  },
  scrollContent: { paddingBottom: 30 },
  videoCard: {
    marginHorizontal: 20,
    height: 220,
    backgroundColor: '#A2C4C9',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#8CAAB0'
  },
  videoMainArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  librasWindow: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    width: 80,
    height: 90,
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },
  videoTime: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  progressBarTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarFill: {
    width: '30%',
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  progressThumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    marginLeft: -5,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E58B9D',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25
  },
  stepText: { fontWeight: 'bold', color: '#FFF', fontSize: 16, flex: 1 },
  stepTextRight: { fontWeight: 'bold', color: '#FFF', fontSize: 16 },
  explanationBox: {
    backgroundColor: COLORS.infoCard,
    borderColor: COLORS.infoCardBorder,
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center'
  },
  explanationText: {
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: 'center',
    fontWeight: '500'
  },
  nextButton: {
    backgroundColor: COLORS.nextButton,
    borderBottomColor: COLORS.nextButtonShadow,
    marginHorizontal: 20,
    marginTop: 25,
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomWidth: 6,
  },
  nextButtonText: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold', 
    textShadowColor: 'rgba(0, 0, 0, 0.1)', 
    textShadowOffset: { width: 0, height: 1 }, 
    textShadowRadius: 2 
  },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25 },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.stepCard,
    borderBottomColor: COLORS.stepCardShadow,
    marginHorizontal: 6
  },
  activeDot: { backgroundColor: COLORS.activeDot },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 245, 247, 0.4)' // Um rosinha bem translúcido
  },
  stickerPopupBox: { backgroundColor: '#FFF', padding: 30, borderRadius: 20, alignItems: 'center', width: '80%', elevation: 10 },
  stickerPopupTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50', marginBottom: 20, textAlign: 'center' },
  finishPopupBox: {
    backgroundColor: '#FFFFFF',
    padding: 32, // Mantendo a proporção de grid
    borderRadius: 30,
    alignItems: 'center',
    width: '85%',
    borderWidth: 4,
    borderColor: '#F4D1D9', // Borda rosa clara
    elevation: 10,
    shadowColor: '#F3A1B5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12
  },
  stickerGlow: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF9E6', // Fundo amarelinho bem claro
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#FDEBD0',
    borderStyle: 'dashed'
  },
  finishSticker: {
    width: 200,
    height: 200
  },
  finishTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2C4A63', // Aquele azul escuro elegante dos títulos
    marginBottom: 8,
    textAlign: 'center'
  },
  finishText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24
  },
  finishButton: {
    backgroundColor: '#A9DFBF',
    borderBottomColor: COLORS.nextButtonShadow,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 35,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomWidth: 6,
  },
  finishButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  }
});

export default ChildLessonScreen;
