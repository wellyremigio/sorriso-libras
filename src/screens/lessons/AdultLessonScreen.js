import React, { useEffect, useState } from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import FloatingBalloons from '../../components/animation/FloatingBalloons';

const AdultLessonScreen = ({ navigation, route }) => {
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;
    const isDesktop = width >= 1024;
    // Recebe a lista de vídeos, o índice e o tipo de perfil que clicou
    const { menuItems = [], initialIndex = 0, profileType = 'caregiver' } = route.params || {};

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isCelebrating, setIsCelebrating] = useState(false);
    const [showFinishPopup, setShowFinishPopup] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'web' && menuItems.length === 0) {
            navigation.replace(profileType === 'dentist' ? 'DentistMenu' : 'CaregiverMenu');
        }
    }, [navigation, menuItems.length, profileType]);

    const totalSteps = menuItems.length > 0 ? menuItems.length : 1;
    const currentItem = menuItems[currentIndex] || { title: 'Carregando...' };

    // Função centralizada para avançar o conteúdo
    const advanceToNextVideo = () => {
        if (currentIndex < totalSteps - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowFinishPopup(true);
        }
    };

    const handleNextStep = () => {
        // Se for dentista, solta os balões. Se for cuidador, avança direto.
        if (profileType === 'dentist') {
            setIsCelebrating(true);
        } else {
            advanceToNextVideo();
        }
    };

    const onAnimationComplete = () => {
        setIsCelebrating(false);
        advanceToNextVideo();
    };

    const handleFinishModule = () => {
        setShowFinishPopup(false);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenContent}>
                <View style={[styles.header, isDesktop && styles.sectionDesktop]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <Ionicons name="arrow-back" size={28} color="#7F8C8D" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
                        <Ionicons name="home" size={26} color="#7F8C8D" />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={[styles.titleText, isTablet && styles.titleTextTablet]}>{currentItem.title}</Text>
                </View>

                <View style={[styles.videoContainer, isTablet && styles.videoContainerTablet, isDesktop && styles.sectionDesktop]}>
                    <View style={styles.videoPlaceholder}>
                            <FontAwesome5 name="play-circle" size={50} color="#BDC3C7" />
                            <Text style={styles.videoTime}>0:00 / 3:45</Text>
                        </View>
                        <View style={styles.librasContainer}>
                            <FontAwesome5 name="hands-helping" size={30} color="#7F8C8D" />
                        </View>
                    </View>

                    <View style={[styles.stepIndicatorContainer, isDesktop && styles.sectionDesktop]}>
                        <Text style={styles.stepText}>Módulo {currentIndex + 1}</Text>
                        <Text style={styles.stepSubtitle} numberOfLines={1}>Conteúdo Atual</Text>
                        <Text style={styles.stepText}>{currentIndex + 1} / {totalSteps}</Text>
                    </View>

                    <View style={[styles.explanationBox, isDesktop && styles.sectionDesktop]}>
                        <Text style={styles.explanationText}>
                            Acompanhe o conteúdo em vídeo com tradução simultânea para Libras.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.nextButton, isTablet && styles.nextButtonTablet]}
                        onPress={handleNextStep}
                        disabled={isCelebrating || showFinishPopup}
                    >
                        <Text style={styles.nextButtonText}>
                            {currentIndex === totalSteps - 1 ? 'FINALIZAR MÓDULO' : 'PRÓXIMO VÍDEO'}
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

                <FloatingBalloons
                    visible={isCelebrating}
                    onComplete={onAnimationComplete}
                />

                {showFinishPopup && (
                    <BlurView intensity={70} tint="dark" style={styles.overlay}>
                        <View style={styles.finishPopupBox}>
                            <ScrollView style={styles.popupScroll} contentContainerStyle={styles.finishPopupContent}>
                            <FontAwesome5 name="check-circle" size={80} color="#2ECC71" solid />
                            <Text style={styles.finishTitle}>Módulo Concluído!</Text>
                            <Text style={styles.finishText}>Você finalizou todos os vídeos desta seção com sucesso.</Text>

                            <TouchableOpacity style={styles.finishButton} onPress={handleFinishModule}>
                                <Text style={styles.finishButtonText}>VOLTAR AO MENU</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </BlurView>
            )}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  screenScroll: { flex: 1, minHeight: 0 },
  screenContent: { paddingBottom: 30 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  sectionDesktop: {
    width: '100%',
    maxWidth: 980,
    alignSelf: 'center',
  },

  iconButton: {
    padding: 5,
  },

  titleContainer: {
    backgroundColor: '#fcf15b',
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  titleTextTablet: {
    fontSize: 20,
  },

  videoContainer: {
    margin: 15,
    height: 200,
    flexShrink: 0,
    backgroundColor: '#D5D8DC',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDC3C7',
  },
  videoContainerTablet: {
    height: 360,
    marginHorizontal: 24,
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
    backgroundColor: '#3498DB',
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
    backgroundColor: '#2ECC71',
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonTablet: {
    width: '50%',
    maxWidth: 420,
    alignSelf: 'center',
  },

  nextButtonText: {
    textAlign: 'center',
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
    backgroundColor: '#3498DB',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  finishPopupBox: {
    maxWidth: 480,
    maxHeight: '90%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  popupScroll: { width: '100%', flexShrink: 1 },
  finishPopupContent: { padding: 30, alignItems: 'center' },

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
  },
});

export default AdultLessonScreen;
