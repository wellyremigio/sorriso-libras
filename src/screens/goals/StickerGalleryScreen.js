import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getChildStickerGallery } from '../../services/stickerService';
import StickerPreviewModal from '../../components/goals/StickerPreviewModal';

const COLORS = {
    textBlue: '#2C4A63',
    textBrown: '#5D4037',
    progressBg: '#E8D1C1',
    progressFill: '#ECA852',
    cardUnlockedBg: '#FDF7E3',
    cardUnlockedBorder: '#D2A679',
    cardLockedBg: 'rgba(230, 220, 220, 0.4)',
    cardLockedBorder: '#C9B8B8',
};

const StickerGalleryScreen = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;
    const isDesktop = width >= 1024;
    const gridColumns = isDesktop ? 6 : isTablet ? 5 : width < 400 ? 3 : 4;
    const cardWidth = `${100 / gridColumns - 3}%`;
    const [earnedStickers, setEarnedStickers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSticker, setSelectedSticker] = useState(null);

    const loadStickerGallery = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getChildStickerGallery();
            setEarnedStickers(data);
        } catch (error) {
            console.error("Erro ao carregar galeria de adesivos:", error);
            setError("Não foi possível carregar sua galeria agora.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadStickerGallery();
        }, [])
    );

    const specialStickers = earnedStickers
        .filter((s) => s.is_special)
        .sort((a, b) => a.order - b.order);

    const normalStickers = earnedStickers
        .filter((s) => !s.is_special)
        .sort((a, b) => a.order - b.order);

    const unlockedStickers = earnedStickers.length;

    const openStickerPreview = (sticker) => {
        setSelectedSticker(sticker);
    };

    const closeStickerPreview = () => {
        setSelectedSticker(null);
    };

    const renderStickerCard = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, styles.cardUnlocked, { width: cardWidth }]}
            onPress={() => openStickerPreview(item)}
            activeOpacity={0.85}
        >
            <Image
                source={{ uri: item.image_url }}
                style={[styles.stickerImage, isTablet && styles.stickerImageTablet]}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <ImageBackground
                source={require("../../assets/imagem_fundo.png")}
                style={styles.background}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.loadingContent}>
                        <ActivityIndicator size="large" color={COLORS.textBrown} />
                        <Text style={styles.emptyGalleryText}>Carregando galeria...</Text>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    if (error) {
        return (
            <ImageBackground
                source={require("../../assets/imagem_fundo.png")}
                style={styles.background}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.container}>
                    <Text style={styles.emptyGalleryText}>{error}</Text>

                    <TouchableOpacity
                        style={[styles.retryButton, isTablet && styles.retryButtonTablet]}
                        onPress={loadStickerGallery}
                    >
                        <Text style={styles.retryButtonText}>Tentar novamente</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require('../../assets/imagem_fundo.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.galleryList}
                    key={gridColumns}
                    data={normalStickers}
                    keyExtractor={(item) => item.id}
                    renderItem={renderStickerCard}
                    numColumns={gridColumns}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={[
                        styles.gridContainer,
                        isTablet && styles.sectionTablet,
                        isDesktop && styles.gridContainerDesktop,
                    ]}
                    ListHeaderComponent={
                        <>
                            <View style={[styles.topHeader, isTablet && styles.topHeaderTablet, isDesktop && styles.sectionDesktop]}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                                    <Ionicons name="chevron-back" size={30} color={COLORS.textBrown} />
                                </TouchableOpacity>

                                <View style={styles.logoPlaceholder}>
                                    <Image
                                        source={require('../../assets/upper_logo.png')}
                                        style={[styles.logoImage, isTablet && styles.logoImageTablet]}
                                        resizeMode="contain"
                                    />
                                </View>

                                <View style={styles.headerSpacer} />
                            </View>

                            <View style={[styles.titleSection, isTablet && styles.sectionTablet, isDesktop && styles.sectionDesktop]}>
                                <Text style={styles.mainTitle}>Galeria de Adesivos</Text>
                                <Text style={styles.subTitle}>Colecione todos os adesivos!</Text>
                            </View>

                            <View style={[styles.progressWrapper, isTablet && styles.progressWrapperTablet, isDesktop && styles.progressWrapperDesktop]}>
                                <View style={styles.progressBarContainer}>
                                    <View
                                        style={[
                                            styles.progressBarFill,
                                            { width: unlockedStickers > 0 ? "100%" : "0%" }
                                        ]}
                                    />
                                    <Text style={[styles.progressText, isTablet && styles.progressTextTablet]}>
                                        {unlockedStickers} adesivos conquistados
                                    </Text>
                                </View>
                            </View>

                            {specialStickers.length > 0 && (
                                <View style={[styles.specialStickersWrapper, isTablet && styles.sectionTablet, isDesktop && styles.sectionDesktop]}>
                                    {specialStickers.map((sticker) => (
                                        <TouchableOpacity
                                            key={sticker.id}
                                            style={[styles.card, styles.specialCard, isDesktop && styles.specialCardDesktop]}
                                            onPress={() => openStickerPreview(sticker)}
                                            activeOpacity={0.85}
                                        >
                                            <Image
                                                source={{ uri: sticker.image_url }}
                                                style={[styles.specialStickerImage, isTablet && styles.specialStickerImageTablet]}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {unlockedStickers === 0 && (
                                <View style={[styles.emptyGallery, isTablet && styles.sectionTablet, isDesktop && styles.sectionDesktop]}>
                                    <Text style={styles.emptyGalleryText}>
                                        Você ainda não conquistou adesivos.
                                    </Text>
                                </View>
                            )}

                        </>
                    }
                />

                <StickerPreviewModal
                    visible={!!selectedSticker}
                    sticker={selectedSticker}
                    onClose={closeStickerPreview}
                />
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
    retryButton: {
        marginTop: 16,
        backgroundColor: COLORS.progressFill,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 16,
    },

    retryButtonText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 15,
    },
    stickerImage: {
        width: '85%',
        height: '85%',
    },
    stickerImageTablet: {
        width: '85%',
        height: '85%',
    },
    specialStickerImage: {
        width: '85%',
        height: '85%',
    },
    specialStickerImageTablet: {
        width: '85%',
        height: '85%',
    },
    emptyGallery: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 28,
    },

    emptyGalleryText: {
        color: COLORS.textBrown,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600",
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    galleryList: { flex: 1, minHeight: 0 },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15
    },
    topHeaderTablet: {
        paddingTop: 24,
        paddingBottom: 18,
    },
    sectionTablet: {
        width: '82%',
        alignSelf: 'center',
    },
    sectionDesktop: {
        width: '100%',
        maxWidth: 980,
        alignSelf: 'center',
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E8D4D8',
    },
    logoPlaceholder: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerSpacer: {
        width: 50,
        height: 50,
    },
    logoImage: {
        width: '100%',
        maxWidth: 250,
        height: 100,
    },
    logoImageTablet: {
        maxWidth: 390,
        height: 140,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 15
    },
    mainTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textBlue,
        marginBottom: 5
    },
    subTitle: {
        fontSize: 16,
        color: COLORS.textBrown,
        fontWeight: '600'
    },
    progressWrapper: {
        paddingHorizontal: 40,
        marginBottom: 20
    },
    progressWrapperTablet: {
        width: '60%',
        alignSelf: 'center',
        paddingHorizontal: 0,
    },
    progressWrapperDesktop: {
        width: '100%',
        maxWidth: 560,
        alignSelf: 'center',
        paddingHorizontal: 0,
    },
    progressBarContainer: {
        height: 30,
        backgroundColor: COLORS.progressBg,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    progressBarFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: COLORS.progressFill,
        borderRadius: 15
    },
    progressText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
        zIndex: 1,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2
    },
    progressTextTablet: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
        width: "100%",
        zIndex: 1,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2
    },
    gridContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    gridContainerDesktop: {
        width: '100%',
        maxWidth: 980,
        alignSelf: 'center',
        paddingHorizontal: 0,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 15
    },
    card: {
        width: '22%',
        aspectRatio: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardUnlocked: {
        backgroundColor: COLORS.cardUnlockedBg,
        borderWidth: 2,
        borderColor: COLORS.cardUnlockedBorder,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    footerSection: {
        alignItems: 'center',
        paddingVertical: 15
    },
    footerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textBrown
    },
    specialStickersWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 25,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    specialCard: {
        width: '40%',
        aspectRatio: 1,
        backgroundColor: '#FFF9E6',
        borderColor: '#ECA852',
        borderWidth: 3,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#ECA852',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    specialCardDesktop: {
        width: 240,
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    retryButtonTablet: {
        width: '50%',
        alignSelf: 'center',
    },
});

export default StickerGalleryScreen;
