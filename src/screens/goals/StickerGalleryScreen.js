import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getChildStickerGallery } from '../../services/stickerService';

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
    const [earnedStickers, setEarnedStickers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const renderStickerCard = ({ item }) => (
        <View style={[styles.card, styles.cardUnlocked]}>
            <Image
                source={{ uri: item.image_url }}
                style={styles.stickerImage}
                resizeMode="contain"
            />
        </View>
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

                    <TouchableOpacity style={styles.retryButton} onPress={loadStickerGallery}>
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
                <View style={styles.topHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <Ionicons name="arrow-back" size={28} color={COLORS.textBrown} />
                    </TouchableOpacity>

                    <View style={styles.logoPlaceholder}>
                        <Image source={require('../../assets/upper_logo.png')} style={styles.logoImage} resizeMode="contain" />
                    </View>

                    <View style={styles.iconButton} />
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.mainTitle}>Galeria de Adesivos</Text>
                    <Text style={styles.subTitle}>Colecione todos os adesivos!</Text>
                </View>

                <View style={styles.progressWrapper}>
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBarFill,
                                { width: unlockedStickers > 0 ? "100%" : "0%" }
                            ]}
                        />
                        <Text style={styles.progressText}>
                            {unlockedStickers} adesivos conquistados
                        </Text>
                    </View>
                </View>

                {specialStickers.length > 0 && (
                    <View style={styles.specialStickersWrapper}>
                        {specialStickers.map((sticker) => (
                            <View key={sticker.id} style={[styles.card, styles.specialCard]}>
                                <Image
                                    source={{ uri: sticker.image_url }}
                                    style={styles.stickerImage}
                                    resizeMode="contain"
                                />
                            </View>
                        ))}
                    </View>
                )}

                {unlockedStickers === 0 && (
                    <View style={styles.emptyGallery}>
                        <Text style={styles.emptyGalleryText}>
                            Você ainda não conquistou adesivos.
                        </Text>
                    </View>
                )}

                <FlatList
                    data={normalStickers}
                    keyExtractor={(item) => item.id}
                    renderItem={renderStickerCard}
                    numColumns={4}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.gridContainer}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>
                        {unlockedStickers} adesivos
                    </Text>
                </View>

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
        width: 80,
        height: 80,
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
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15
    },
    iconButton: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoPlaceholder: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        width: 300,
        height: 200,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 15
    },
    mainTitle: {
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
    progressBarContainer: {
        height: 30,
        backgroundColor: COLORS.progressBg,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
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
        marginLeft: 15,
        zIndex: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2
    },
    gridContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
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
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
});

export default StickerGalleryScreen;