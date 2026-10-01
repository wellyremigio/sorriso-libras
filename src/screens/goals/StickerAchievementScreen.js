import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    background: '#FFF5F7',
    titleBlue: '#2C4A63',
    textGrey: '#7F8C8D',
    primaryPink: '#F3A1B5',
    darkPink: '#D67C92',
    paginationActive: '#A2C4C9',
    paginationInactive: '#BDC3C7',
    white: '#FFFFFF',
    adesivoBorder: '#E8D4D8',
    nextButton: '#78dda0',
    nextButtonShadow: '#33b962',
    titleGold: '#D4AF37',
    specialBorder: '#FFD700',
};

const StickerAchievementScreen = ({ navigation, route }) => {
    const { width, height } = useWindowDimensions();
    const isTablet = width >= 768;
    const isCompactHeight = height < 800;
    const [stickerLoaded, setStickerLoaded] = useState(false);

    const {
        isFinalAchievement = false,
        earnedStickers = [],
        achievementType = null,
        showModuleFinalAchievement = false,
    } = route.params || {};

    const specialStickers = earnedStickers
        .filter((sticker) => sticker.is_special)
        .sort((a, b) => a.order - b.order);

    const earnedSticker = isFinalAchievement
        ? specialStickers[0] || earnedStickers[0]
        : earnedStickers[0];

    const hasEarnedSticker = !!earnedSticker;

    const stickerImageSource = hasEarnedSticker && earnedSticker.image_url
        ? { uri: earnedSticker.image_url }
        : achievementType === 'weekly_brushing_goal'
            ? require('../../assets/sticker_pop.png')
            : null;
    const stickerImageKey = hasEarnedSticker
        ? earnedSticker.image_url
        : achievementType === 'weekly_brushing_goal'
            ? 'weekly_brushing_goal'
            : null;
    const canContinue = !stickerImageSource || stickerLoaded;

    useEffect(() => {
        setStickerLoaded(!stickerImageSource);
    }, [stickerImageKey]);

    const handleContinue = () => {
        if (!canContinue) return;

        if (showModuleFinalAchievement && !isFinalAchievement) {
            navigation.replace('StickerAchievementScreen', {
                isFinalAchievement: true,
                earnedStickers,
                achievementType,
                showModuleFinalAchievement: false,
            });
            return;
        }

        if (isFinalAchievement) {
            navigation.navigate('Home');
        } else {
            navigation.goBack();
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/background_celebration.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.headerDecoration}>
                    <View style={[styles.balaoWrapper, { top: 20, left: -20, width: 90, height: 110 }]}>
                        <Ionicons name="balloon" size={70} color="#F5B7B1" />
                    </View>

                    <View style={[styles.balaoWrapper, { top: 70, left: 50, width: 50, height: 60 }]}>
                        <Ionicons name="balloon" size={40} color="#A9DFBF" />
                    </View>

                    <View style={[styles.balaoWrapper, { top: 70, right: 50, width: 50, height: 60 }]}>
                        <Ionicons name="balloon" size={40} color="#F5B7B1" />
                    </View>

                    <View style={[styles.balaoWrapper, { top: 20, right: -20, width: 90, height: 110 }]}>
                        <Ionicons name="balloon" size={70} color="#A9DFBF" />
                    </View>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[
                        styles.content,
                        isCompactHeight && styles.contentCompact,
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    {isTablet && (
                        <View style={styles.logoWrapperTablet}>
                            <Image
                                source={require('../../assets/upper_logo.png')}
                                style={styles.logoImageTablet}
                                resizeMode="contain"
                            />
                        </View>
                    )}

                    <Text
                        style={[
                            styles.mainTitle,
                            isTablet && styles.mainTitleTablet,
                            isFinalAchievement && styles.goldTitle,
                            isTablet && isFinalAchievement && styles.goldTitleTablet,
                        ]}
                    >
                        {isFinalAchievement ? "PARABÉNS!".toUpperCase() : "Parabéns!"}
                    </Text>

                    {!isFinalAchievement && (
                        <View style={styles.avatarContainer}>
                            <Image
                                source={require('../../assets/sticker_pop.png')}
                                style={styles.avatarImage}
                                resizeMode="contain"
                            />
                        </View>
                    )}

                    <Text style={[styles.descriptionText, isTablet && styles.descriptionTextTablet]}>
                        {isFinalAchievement
                            ? "Você assistiu ao vídeo final e conquistou um adesivo especial!"
                            : achievementType === 'weekly_brushing_goal'
                                ? "Você completou a meta da semana!"
                            : hasEarnedSticker
                                ? `Você conquistou um adesivo!`
                                : "Você concluiu esta lição!"}
                    </Text>

                    <View
                        style={[
                            styles.adesivoHighlight,
                            isTablet && styles.adesivoHighlightTablet,
                            isCompactHeight && styles.adesivoHighlightCompact,
                            isTablet && isCompactHeight && styles.adesivoHighlightTabletCompact,
                            isFinalAchievement && { borderColor: COLORS.specialBorder },
                        ]}
                    >
                        <View style={styles.brilhoStars}>
                            <Ionicons name="star" size={20} color="#FFF" style={{ position: 'absolute', top: 10, left: 10 }} />
                            <Ionicons name="star" size={16} color="#FFF" style={{ position: 'absolute', bottom: 15, right: 15 }} />
                            <Ionicons name="star" size={12} color="#FFF" style={{ position: 'absolute', top: 30, right: 30 }} />
                        </View>

                        {stickerImageSource && (
                            <Image
                                source={stickerImageSource}
                                style={[styles.adesivoImage, isTablet && styles.adesivoImageTablet]}
                                resizeMode="contain"
                                onLoadEnd={() => setStickerLoaded(true)}
                                onError={() => setStickerLoaded(true)}
                            />
                        )}
                            
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            isTablet && styles.actionButtonTablet,
                            !canContinue && styles.actionButtonDisabled,
                        ]}
                        onPress={handleContinue}
                        activeOpacity={canContinue ? 0.8 : 1}
                        disabled={!canContinue}
                    >
                        <Text style={styles.actionButtonText}>
                            {!canContinue
                                ? "Carregando..."
                                : isFinalAchievement
                                ? "Voltar à Tela Inicial"
                                : showModuleFinalAchievement
                                    ? "Ver adesivo especial"
                                    : "Continuar"}
                        </Text>
                    </TouchableOpacity>

                    {!isFinalAchievement && (
                        <View style={styles.paginationContainer}>
                            <View style={[styles.pageDot, styles.pageActive]} />
                            <View style={styles.pageDot} />
                            <View style={styles.pageDot} />
                            <View style={styles.pageDot} />
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    scrollView: {
        flex: 1,
        width: '100%',
        position: 'relative',
        zIndex: isTablet ? 10 : 2,
        elevation: isTablet ? 10 : 2,
    },
    headerDecoration: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 150,
        overflow: 'visible',
        zIndex: isTablet ? 1 : 0,
        elevation: isTablet ? 1 : 0
    },
    balaoWrapper: {
        position: 'absolute',
        overflow: 'visible',
        justifyContent: 'center',
        alignItems: 'center'
    },
    balaoImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    confetesImage: {
        position: 'absolute',
        top: 0,
        width: '60%',
        left: '20%',
        height: '100%'
    },
    content: {
        flexGrow: 1,
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 42,
        paddingTop: 118,
        paddingBottom: 30
    },
    contentCompact: {
        paddingHorizontal: 28,
        paddingTop: 96,
        paddingBottom: 18
    },
    logoWrapperTablet: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -250,
    },
    logoImageTablet: {
        width: 420,
        height: 300,
    },
    mainTitle: {
        fontSize: 52,
        fontWeight: '700',
        color: COLORS.titleBlue,
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        zIndex: isTablet ? 20 : 100,
        elevation: isTablet ? 20 : 100,
    },
    mainTitleTablet: {
        fontSize: 62,
        marginBottom: 18,
        zIndex: 100,
        elevation: 100,
    },
    avatarContainer: {
        width: '85%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    avatarImage: {
        width: '100%',
        height: '100%'
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textGrey,
        textAlign: 'center',
        marginBottom: 32
    },
    descriptionTextTablet: {
        fontSize: 24,
        marginBottom: 36,
    },
    adesivoHighlight: {
        width: 190,
        height: 190,
        backgroundColor: 'transparent',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        borderWidth: 6,
        borderColor: COLORS.adesivoBorder,
        position: 'relative',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5
    },
    adesivoHighlightTablet: {
        width: 250,
        height: 250,
        marginBottom: 48,
        borderRadius: 30,
    },
    adesivoHighlightCompact: {
        width: 170,
        height: 170,
        marginBottom: 24
    },
    adesivoHighlightTabletCompact: {
        width: 220,
        height: 220,
        marginBottom: 30,
    },
    brilhoStars: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#EFB63F',
        borderRadius: 19,
        overflow: 'hidden'
    },
    adesivoImage: {
        width: '82%',
        height: '82%',
        zIndex: 2
    },
    adesivoImageTablet: {
        width: '88%',
        height: '88%',
    },
    actionButton: {
        backgroundColor: COLORS.nextButton,
        borderBottomColor: COLORS.nextButtonShadow,
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 35,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 6,
        width: '100%',
        marginBottom: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    actionButtonTablet: {
        width: '50%',
        alignSelf: 'center',
    },
    actionButtonDisabled: {
        opacity: 0.55,
    },
    actionButtonText: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
        letterSpacing: 1
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 30
    },
    pageDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.paginationInactive,
        marginHorizontal: 5
    },
    pageActive: {
        backgroundColor: COLORS.paginationActive
    },
    goldTitle: {
        fontSize: 60,
        color: '#FFD700',
        letterSpacing: 2,
        textShadowColor: '#D35400',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 2,
        marginBottom: 30,
    },
    goldTitleTablet: {
        fontSize: 70,
        marginBottom: 34,
    },
});

export default StickerAchievementScreen;
