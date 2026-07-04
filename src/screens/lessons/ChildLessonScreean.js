import { View, Alert, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground, ActivityIndicator, Animated, Easing } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { VideoView, useVideoPlayer } from "expo-video";
import { getVideosByModule, completeVideo, getCompletedVideos } from '../../services/videoServices';
import { useEventListener } from 'expo';


const LessonVideoPlayer = ({ videoUrl, onVideoEnd }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
    player.muted = false;
    player.volume = 1;
  });

  useEventListener(player, "playToEnd", () => {
    onVideoEnd?.();
  });

  if (!videoUrl) {
    return (
      <View style={styles.videoMainArea}>
        <Text style={styles.videoFallbackText}>Vídeo indisponível</Text>
      </View>
    );
  }

  return (
    <VideoView
      player={player}
      style={styles.realVideo}
      allowsFullscreen
      allowsPictureInPicture
      nativeControls
    />
  );
};

const COLORS = {
  textDark: '#4A2C2A',
  stepCard: '#A2C4C9',
  stepCardShadow: '#74AEB6',
  infoCard: '#FFFDFC',
  infoCardBorder: '#DCEEEF',
  nextButton: '#78DDA0',
  nextButtonShadow: '#33B962',
  activeDot: '#74C4CD',
  inactiveDot: '#E7DDE2',
};

const ChildLessonScreen = ({ navigation, route }) => {
  const { initialIndex = 0, module = "children", videosFromMenu = [] } = route.params || {};
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFinishPopup, setShowFinishPopup] = useState(false);
  const [hasFinishedCurrentVideo, setHasFinishedCurrentVideo] = useState(false);
  const [savingProgress, setSavingProgress] = useState(false);
  const [completedVideoIds, setCompletedVideoIds] = useState([]);

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(14)).current;

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      const [videosData, completedData] = await Promise.all([
        videosFromMenu.length > 0 ? Promise.resolve(videosFromMenu) : getVideosByModule(module),
        getCompletedVideos(),
      ]);

      setVideos(videosData);
      setCompletedVideoIds((completedData || []).map((item) => item.id));
    } catch (error) {
      console.error("Erro ao carregar vídeos:", error);
      setError("Não foi possível carregar os vídeos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, [module, videosFromMenu]);

  useEffect(() => {
    if (loading || error) {
      contentOpacity.setValue(0);
      contentTranslateY.setValue(14);
      return;
    }

    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateY, {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [loading, error, contentOpacity, contentTranslateY]);

  const totalSteps = videos.length > 0 ? videos.length : 1;
  const currentItem = videos[currentIndex] || { title: "Carregando..." };

  const handleNextStep = async () => {
    if (savingProgress) return;

    const isLastStep = currentIndex === totalSteps - 1;
    const alreadyCompleted = completedVideoIds.includes(currentItem.id);

    if (alreadyCompleted) {
      if (isLastStep) {
        navigation.navigate("Home");
        return;
      }

      setCurrentIndex((prev) => prev + 1);
      return;
    }

    try {
      setSavingProgress(true);

      const completionResult = await completeVideo(currentItem.id);

      setCompletedVideoIds((prev) =>
        prev.includes(currentItem.id) ? prev : [...prev, currentItem.id]
      );

      navigation.navigate("StickerAchievementScreen", {
        earnedStickers: completionResult?.earned_stickers || [],
        isFinalAchievement: isLastStep,
        completeVideo: currentItem,
        module,
      });

      if (!isLastStep) {
        setCurrentIndex((prev) => prev + 1);
      }

      // if (!isLastStep) {
      //   setTimeout(() => {
      //     setCurrentIndex(currentIndex + 1);
      //   }, 500);
      // }
    } catch (error) {
      console.error("Erro ao concluir vídeo:", error);

      Alert.alert(
        "Ops!",
        "Não conseguimos salvar seu progresso agora. Tente novamente."
      );
    } finally {
      setSavingProgress(false);
    }
  };

  useEffect(() => {
    setHasFinishedCurrentVideo(false);
  }, [currentIndex]);

  const handleFinishModule = () => {
    setShowFinishPopup(false);
    navigation.navigate('Home');
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate('Home');
  };

  const renderStatusScreen = ({ title, message, actionLabel, onAction, iconName, showRetry = false, showLoader = false }) => (
    <ImageBackground
      source={require("../../assets/imagem_fundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.statusShell}>
          <View style={styles.statusCard}>
            <View style={styles.statusIconWrap}>
              {showLoader && <ActivityIndicator size="large" color="#5D4037" />}
              <View style={styles.statusIconBubble}>
                <FontAwesome5 name={iconName} size={24} color="#5D4037" />
              </View>
            </View>

            <Text style={styles.statusTitle}>{title}</Text>
            <Text style={styles.statusText}>{message}</Text>

            <View style={styles.statusActions}>
              {showRetry && (
                <TouchableOpacity style={styles.secondaryStatusButton} onPress={loadVideos} activeOpacity={0.85}>
                  <Text style={styles.secondaryStatusButtonText}>Tentar novamente</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.primaryStatusButton} onPress={onAction} activeOpacity={0.85}>
                <Text style={styles.primaryStatusButtonText}>{actionLabel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );

  if (loading) {
    return renderStatusScreen({
      title: 'Carregando vídeos',
      message: 'Estamos preparando as aulas para você. Um instante, por favor.',
      actionLabel: 'Voltar',
      onAction: handleGoBack,
      iconName: 'play-circle',
      showLoader: true,
    });
  }

  if (error) {
    return renderStatusScreen({
      title: 'Ops, algo deu errado',
      message: error,
      actionLabel: 'Voltar à tela anterior',
      onAction: handleGoBack,
      iconName: 'exclamation-triangle',
      showRetry: true,
    });
  }

  return (
    <ImageBackground
      source={require("../../assets/imagem_fundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.mainContent,
            {
              opacity: contentOpacity,
              transform: [{ translateY: contentTranslateY }],
            },
          ]}
        >
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={handleGoBack} style={styles.iconButton}>
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
              <LessonVideoPlayer
                videoUrl={currentItem.video_url}
                onVideoEnd={() => setHasFinishedCurrentVideo(true)}
              />
            </View>

            <View style={styles.stepIndicatorContainer}>
              <Text style={styles.stepText}>Passo {currentIndex + 1}  {currentItem.title}</Text>
              <Text style={styles.stepTextRight}>{currentIndex + 1}/{totalSteps}</Text>
            </View>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationText}>
                {currentItem.description || "Assista ao vídeo com atenção."}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.nextButton,
                (!hasFinishedCurrentVideo || savingProgress) && styles.nextButtonDisabled,
              ]}
              onPress={handleNextStep}
              activeOpacity={hasFinishedCurrentVideo && !savingProgress ? 0.8 : 1}
              disabled={!hasFinishedCurrentVideo || savingProgress}
            >
              <Text style={styles.nextButtonText}>
                {savingProgress
                  ? "Salvando..."
                  : currentIndex === totalSteps - 1
                    ? "Finalizar"
                    : "Próximo"}
              </Text>
            </TouchableOpacity>

            <View style={styles.dotsContainer}>
              {videos.map((_, index) => (
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
        </Animated.View>
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
  mainContent: {
    flex: 1,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  statusShell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statusCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 30,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F4D1D9',
    elevation: 10,
    shadowColor: '#D97C8D',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  statusIconWrap: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIconBubble: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF4E6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F1D3A6',
  },
  statusTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#4E342E',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#7F6A65',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  statusActions: {
    width: '100%',
    gap: 12,
  },
  primaryStatusButton: {
    backgroundColor: '#78DDA0',
    paddingVertical: 15,
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomWidth: 6,
    borderBottomColor: '#33B962',
  },
  primaryStatusButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  secondaryStatusButton: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0D6DB',
  },
  secondaryStatusButtonText: {
    color: '#5D4037',
    fontSize: 16,
    fontWeight: 'bold',
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
  realVideo: {
    width: "100%",
    height: 220,
    backgroundColor: "#000",
    borderRadius: 20,
  },
  videoFallbackText: {
    color: '#4E342E',
    fontWeight: '600',
    fontSize: 16,
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
    backgroundColor: 'rgba(255, 245, 247, 0.4)'
  },
  finishPopupBox: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 18,
    borderRadius: 24,
    alignItems: 'center',
    width: '85%',
    maxHeight: "82%",
    borderWidth: 4,
    borderColor: '#F4D1D9',
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
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#FDEBD0',
    borderStyle: 'dashed'
  },
  finishSticker: {
    width: 110,
    height: 110
  },
  finishTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2C4A63',
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
