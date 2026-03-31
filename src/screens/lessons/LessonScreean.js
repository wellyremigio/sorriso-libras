import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const LessonScreen = ({ navigation, route }) => {
  const lessonData = {
    mainTitle: 'Escovar os Dentes',
    steps: [
      { id: 1, subtitle: 'Preparando a escova', text: 'Coloque um pouco de pasta de dente na escova.' },
      { id: 2, subtitle: 'Escovando na frente', text: 'Faça movimentos circulares nos dentes da frente.' },
      { id: 3, subtitle: 'Escovando no fundo', text: 'Não esqueça de escovar os dentes lá do fundo, estilo trenzinho.' },
      { id: 4, subtitle: 'Limpando a língua', text: 'Escove a língua suavemente para tirar as bactérias.' },
    ]
  };

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = lessonData.steps.length;
  const currentStep = lessonData.steps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      alert('Parabéns! Você terminou esta lição.');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header (Voltar, Logo, Home) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={28} color="#7F8C8D" />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
          <Ionicons name="home" size={26} color="#7F8C8D" />
        </TouchableOpacity>
      </View>

      {/* Título da Lição */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{lessonData.mainTitle}</Text>
      </View>

      {/* Área do Vídeo Fictício */}
      <View style={styles.videoContainer}>
        {/* Placeholder do vídeo principal */}
        <View style={styles.videoPlaceholder}>
          <FontAwesome5 name="play-circle" size={50} color="#BDC3C7" />
          <Text style={styles.videoTime}>0:00 / 1:30</Text>
        </View>
        
        {/* Placeholder do Intérprete de Libras (PiP) */}
        <View style={styles.librasContainer}>
          <FontAwesome5 name="hands-helping" size={30} color="#7F8C8D" />
        </View>
      </View>

      {/* Barra de Indicador de Passo */}
      <View style={styles.stepIndicatorContainer}>
        <Text style={styles.stepText}>Passo {currentStep.id}</Text>
        <Text style={styles.stepSubtitle} numberOfLines={1}>{currentStep.subtitle}</Text>
        <Text style={styles.stepText}>{currentStep.id} / {totalSteps}</Text>
      </View>

      {/* Caixa de Texto Explicativo */}
      <View style={styles.explanationBox}>
        <Text style={styles.explanationText}>{currentStep.text}</Text>
      </View>

      {/* Botão Próximo */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>
          {currentStepIndex === totalSteps - 1 ? 'Finalizar' : 'Próximo'}
        </Text>
      </TouchableOpacity>

      {/* Pontinhos de Paginação (Índices) */}
      <View style={styles.dotsContainer}>
        {lessonData.steps.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dot, 
              currentStepIndex === index && styles.activeDot
            ]} 
          />
        ))}
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  iconButton: {
    padding: 5,
  },
  logoContainer: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  logoText: {
    fontWeight: 'bold',
    color: '#7F8C8D',
  },
  titleContainer: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
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
    borderColor: '#BDC3C7',
  },
  videoTime: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#FFF',
    fontWeight: 'bold',
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
    borderColor: '#BDC3C7',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#BDC3C7',
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  stepText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
  },
  stepSubtitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    paddingHorizontal: 10,
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
    justifyContent: 'center',
  },
  explanationText: {
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#BDC3C7',
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D5D8DC',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#7F8C8D',
  },
});

export default LessonScreen;