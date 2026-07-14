import { useEffect, useState, useRef, useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  Animated,
  Easing,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { getVideosByModule, getCompletedVideos } from "../../services/videoServices";

const DENTIST_MENU_IMAGES = [
  require("../../assets/dentist_menu_dentist.png"),
  require("../../assets/deaf_child_menu_dentist.png"),
  require("../../assets/wait_room_menu_dentist.png"),
  require("../../assets/x_ray_menu_dentist.png"),
  require("../../assets/presentation_menu_dentist.png"),
  require("../../assets/fluor_menu_dentist.png"),
];

const DentistMenuScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768 && width < 1024;
  const [videos, setVideos] = useState([]);
  const [completedVideoIds, setCompletedVideoIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pulse = useRef(new Animated.Value(0)).current;

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      const videosData = await getVideosByModule("dentist");
      const completedData = await getCompletedVideos();

      setVideos(videosData);

      const completedIds = completedData.map((item) => item.id);
      setCompletedVideoIds(completedIds);
    } catch (error) {
      console.error("Erro ao carregar vídeos do dentista:", error);
      setError("Não foi possível carregar os vídeos.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadVideos();
    }, [])
  );
  useEffect(() => {
    if (!loading) {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [loading, pulse]);

  const handleOpenVideo = (index) => {
    navigation.navigate("ChildLesson", {
      initialIndex: index,
      module: "dentist",
      videosFromMenu: videos,
    });
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("Home");
  };

  const renderStatusScreen = ({ title, message, iconName, showSpinner = false, actions = null }) => {
    const iconScale = pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.08],
    });

    const iconOpacity = pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.82, 1],
    });

    return (
      <ImageBackground
        source={require("../../assets/imagem_fundo.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.statusShell}>
            <View style={styles.statusCard}>
              <Animated.View
                style={[
                  styles.statusIconWrap,
                  {
                    transform: [{ scale: iconScale }],
                    opacity: iconOpacity,
                  },
                ]}
              >
                {showSpinner && (
                  <ActivityIndicator
                    size="large"
                    color="#5D4037"
                    style={styles.statusSpinner}
                  />
                )}

                <View style={styles.statusIconBubble}>
                  <FontAwesome5 name={iconName} size={24} color="#5D4037" />
                </View>
              </Animated.View>

              <Text style={styles.statusTitle}>{title}</Text>
              <Text style={styles.statusText}>{message}</Text>

              {actions}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  };

  if (loading) {
    return (
      <ImageBackground
        source={require("../../assets/imagem_fundo.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.simpleLoadingContent}>
            <ActivityIndicator size="large" color="#5D4037" />
            <Text style={styles.loadingSimpleText}>Carregando...</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (error) {
    return renderStatusScreen({
      title: "Não foi possível carregar os vídeos",
      message: "Verifique sua conexão e tente novamente. Você também pode voltar para a tela anterior.",
      iconName: "exclamation-triangle",
      actions: (
        <View style={styles.statusActions}>
          <TouchableOpacity
            style={styles.secondaryStatusButton}
            onPress={loadVideos}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryStatusButtonText}>Tentar novamente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryStatusButton}
            onPress={handleGoBack}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryStatusButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }

  return (
    <ImageBackground
      source={require('../../assets/imagem_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.iconCircle}>
            <Ionicons name="chevron-back" size={34} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        <View style={styles.containerLogo}>
          <Image
            source={require('../../assets/logo_menu_dentist.png')}
            style={[styles.imageLogo, isTablet && styles.imageLogoTablet]}
            resizeMode="contain"
          />
        </View>

        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {videos.map((item, index) => {
            const completed = completedVideoIds.includes(item.id);

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  isTablet && styles.menuItemSmallTablet,
                  index % 2 === 0 ? styles.btnPink : styles.btnBlue,
                ]}
                onPress={() => handleOpenVideo(index)}
                activeOpacity={0.8}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={DENTIST_MENU_IMAGES[index]}
                    style={styles.itemImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>

                {completed ? (
                  <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                ) : (
                  <Ionicons name="chevron-forward" size={24} color="#FFF" />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    paddingVertical: 34,
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
    marginBottom: 18,
  },
  statusSpinner: {
    position: 'absolute',
  },
  simpleLoadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loadingSimpleText: {
    marginTop: 14,
    color: '#4E342E',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIconBubble: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF4E6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F1D3A6',
  },
  statusTitle: {
    fontSize: 25,
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
    marginBottom: 22,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 20,
    zIndex: 10,
  },
  iconCircle: {
    width: 74,
    height: 62,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8D4D8',
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    marginHorizontal: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#F3E5F5',
    alignItems: 'center',
    marginBottom: 25,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
    borderRadius: 25,
    paddingHorizontal: 1,
    borderWidth: 2,
    borderBottomWidth: 6,
    paddingVertical: 8,
    marginBottom: 16,
    borderColor: 'rgba(255, 255, 255, 0.4)', // Reflexo claro na borda superior
  },
  menuItemSmallTablet: {
    width: '96%',
    alignSelf: 'center',
  },
  imageContainer: {
    width: 72,
    minHeight: 64,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPink: {
    backgroundColor: '#F3A1B5',
    borderBottomColor: '#D67C92',
  },

  btnBlue: {
    backgroundColor: '#74C4CD',
    borderBottomColor: '#50A2AC',
  },
  itemImage: {
    width: '100%',
    height: 64,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  itemText: {
    fontSize: 17,
    color: '#4E342E',
    fontWeight: '700',
    flexShrink: 1,
    lineHeight: 22,
  },
  containerLogo: {
    marginTop: -50,
    alignItems: 'center',
    width: '100%',
    height: 170,
    marginBotton: 15,
  },
  imageLogo: {
    width: '100%',
    height: '100%',
  },
  imageLogoTablet: {
    width: '110%',
    height: '110%',
  },
});

export default DentistMenuScreen;
