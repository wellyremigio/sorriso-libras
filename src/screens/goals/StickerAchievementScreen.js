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
    const { height } = useWindowDimensions();
    const isCompactHeight = height < 800;

    const {
        isFinalAchievement = false,
        earnedStickers = [],
        achievementType = null,
        showModuleFinalAchievement = false,
    } = route.params || {};

    const earnedSticker = earnedStickers[0];

    const hasEarnedSticker = !!earnedSticker;

    const stickerImageSource = hasEarnedSticker
        ? { uri: earnedSticker.image_url }
        : achievementType === 'weekly_brushing_goal'
            ? require('../../assets/sticker_pop.png')
            : isFinalAchievement
                ? require('../../assets/stickers/trofeu_dourado_1.png')
                : null;

    const handleContinue = () => {
        if (showModuleFinalAchievement && !isFinalAchievement) {
            navigation.replace('StickerAchievementScreen', {
                isFinalAchievement: true,
                earnedStickers: [],
                achievementType: null,
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

                    <Text style={[styles.mainTitle, isFinalAchievement && styles.goldTitle]}>
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

                    <Text style={styles.descriptionText}>
                        {isFinalAchievement
                            ? "Você completou todas as lições. Continue cuidando bem do seu sorriso!"
                            : achievementType === 'weekly_brushing_goal'
                                ? "Você completou a meta da semana!"
                            : hasEarnedSticker
                                ? `Você conquistou um adesivo!`
                                : "Você concluiu esta lição!"}
                    </Text>

                    <View
                        style={[
                            styles.adesivoHighlight,
                            isCompactHeight && styles.adesivoHighlightCompact,
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
                                style={styles.adesivoImage}
                                resizeMode="contain"
                            />
                        )}
                            
                    </View>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleContinue}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.actionButtonText}>
                            {isFinalAchievement
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
        width: '100%'
    },
    headerDecoration: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 150,
        overflow: 'visible',
        zIndex: 5
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 70,
        paddingBottom: 28
    },
    contentCompact: {
        paddingHorizontal: 28,
        paddingTop: 58,
        paddingBottom: 18
    },
    mainTitle: {
        fontSize: 48,
        fontWeight: '700',
        color: COLORS.titleBlue,
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4
    },
    avatarContainer: {
        width: '80%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    avatarImage: {
        width: '100%',
        height: '100%'
    },
    descriptionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textGrey,
        textAlign: 'center',
        marginBottom: 30
    },
    adesivoHighlight: {
        width: 180,
        height: 180,
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
    adesivoHighlightCompact: {
        width: 160,
        height: 160,
        marginBottom: 24
    },
    brilhoStars: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#EFB63F',
        borderRadius: 19,
        overflow: 'hidden'
    },
    adesivoImage: {
        width: '80%',
        height: '80%',
        zIndex: 2
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
    actionButtonText: {
        color: COLORS.white,
        fontSize: 22,
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
        fontSize: 56,
        color: '#FFD700',
        letterSpacing: 2,
        textShadowColor: '#D35400',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 2,
        marginBottom: 30,
    },
});

export default StickerAchievementScreen;
