import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingBalloons from '../../components/animation/FloatingBalloons';
import { BlurView } from 'expo-blur';

const ChildLessonScreen = ({ navigation, route }) => {
  const { menuItems = [], initialIndex = 0 } = route.params || {};

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showStickerPopup, setShowStickerPopup] = useState(false);
  const [showFinishPopup, setShowFinishPopup] = useState(false);

  const totalSteps = menuItems.length > 0 ? menuItems.length : 1;
  const currentItem = menuItems[currentIndex] || { title: 'Carregando...' };

  const handleNextStep = () => {
    setShowStickerPopup(true);
    setTimeout(() => {
      setShowStickerPopup(false);
      setIsCelebrating(true);
    }, 1500);
  };

  const onAnimationComplete = () => {
    setIsCelebrating(false);

    if (currentIndex < totalSteps - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowFinishPopup(true);
    }
  };

  const handleFinishModule = () => {
    setShowFinishPopup(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={28} color="#7F8C8D" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
          <Ionicons name="home" size={26} color="#7F8C8D" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{currentItem.title}</Text>
      </View>

      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <FontAwesome5 name="play-circle" size={50} color="#BDC3C7" />
          <Text style={styles.videoTime}>0:00 / 1:30</Text>
        </View>
        <View style={styles.librasContainer}>
          <FontAwesome5 name="hands-helping" size={30} color="#7F8C8D" />
        </View>
      </View>

      <View style={styles.stepIndicatorContainer}>
        <Text style={styles.stepText}>Vídeo {currentIndex + 1}</Text>
        <Text style={styles.stepSubtitle} numberOfLines={1}>Aula Atual</Text>
        <Text style={styles.stepText}>{currentIndex + 1} / {totalSteps}</Text>
      </View>

      <View style={styles.explanationBox}>
        <Text style={styles.explanationText}>
          Preste bastante atenção ao vídeo acima e acompanhe as explicações em Libras para cuidar super bem dos seus dentes!
        </Text>
      </View>

      {/* Botão Próximo - Desativado temporariamente enquanto a animação rola para evitar cliques duplos */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNextStep}
        disabled={showStickerPopup || isCelebrating}
      >
        <Text style={styles.nextButtonText}>
          {currentIndex === totalSteps - 1 ? 'FINALIZAR' : 'PRÓXIMO VÍDEO'}
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

      <FloatingBalloons
        visible={isCelebrating}
        onComplete={onAnimationComplete}
      />

      {/* Pop-up de Adesivo Flutuante */}
      {showStickerPopup && (
        <BlurView intensity={40} tint="dark" style={styles.overlay}>
          <View style={styles.stickerPopupBox}>
            <Text style={styles.stickerPopupTitle}>QUE LEGAL, VOCÊ GANHOU UM ADESIVO!</Text>
            <FontAwesome5 name="star" size={80} color="#F1C40F" solid />
          </View>
        </BlurView>
      )}

      {/* Pop-up de Finalização do Módulo */}
      {showFinishPopup && (
        <BlurView intensity={70} tint="dark" style={styles.overlay}>
          <View style={styles.finishPopupBox}>
            <FontAwesome5 name="trophy" size={80} color="#F39C12" solid />
            <Text style={styles.finishTitle}>Parabéns!</Text>
            <Text style={styles.finishText}>Você completou todas as lições. Continue cuidando bem do seu sorriso!</Text>

            <TouchableOpacity style={styles.finishButton} onPress={handleFinishModule}>
              <Text style={styles.finishButtonText}>VOLTAR AO MENU</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEF'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15
  },

  iconButton: {
    padding: 5
  },

  logoContainer: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 20
  },

  logoText: {
    fontWeight: 'bold',
    color: '#7F8C8D'
  },

  titleContainer: {
    backgroundColor: '#fcf15b',
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 15
  },

  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center'
  },

  videoContainer: {
    margin: 15,
    height: 200,
    backgroundColor: '#D5D8DC',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDC3C7'
  },

  videoTime: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#FFF',
    fontWeight: 'bold'
  },

  librasContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 80,
    height: 80,
    backgroundColor: '#EAEDED',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDC3C7'
  },

  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3498DB',
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25
  },

  stepText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16
  },

  stepSubtitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    paddingHorizontal: 10
  },

  explanationBox: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minHeight: 100,
    justifyContent: 'center'
  },

  explanationText: {
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center'
  },

  nextButton: {
    backgroundColor: '#2ECC71',
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center'
  },

  nextButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D5D8DC',
    marginHorizontal: 5
  },

  activeDot: {
    backgroundColor: '#7F8C8D'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Força a camada a cobrir a tela do topo ao rodapé
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    zIndex: 1000,
  },

  // O adesivo já estava bom, apenas ajustei o nome para casar com o CSS
  stickerPopupBox: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  stickerPopupTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Pop-up de Finalização
  finishPopupBox: {
    backgroundColor: '#FFF',
    padding: 30, // Aumentei um pouco o padding para o conteúdo respirar melhor
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  finishTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  finishText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 25,
  },
  finishButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ChildLessonScreen;
