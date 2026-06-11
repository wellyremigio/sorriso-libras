import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

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
    const stickersData = Array.from({ length: 24 }).map((_, index) => ({
        id: String(index + 1),
        unlocked: index < 12
    }));

    const totalStickers = stickersData.length;
    const unlockedStickers = stickersData.filter(s => s.unlocked).length;

    const renderStickerCard = ({ item }) => {
        if (item.unlocked) {
            return (
                <View style={[styles.card, styles.cardUnlocked]}>
                    <Text style={styles.placeholderText}>Img</Text>
                </View>
            );
        } else {
            return (
                <View style={[styles.card, styles.cardLocked]}>
                    <FontAwesome5 name="lock" size={20} color={COLORS.cardLockedBorder} />
                </View>
            );
        }
    };

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
                                { width: `${(unlockedStickers / totalStickers) * 100}%` }
                            ]}
                        />
                        <Text style={styles.progressText}>
                            {unlockedStickers} de {totalStickers} desbloqueados
                        </Text>
                    </View>
                </View>

                {/* Seção de Adesivos Especiais em Destaque */}
                <View style={styles.specialStickersWrapper}>
                    <View style={[styles.card, styles.specialCard]}>
                        <Text style={styles.placeholderText}>Especial 1</Text>
                        {/* <Image source={require('../../assets/especial1.png')} style={styles.stickerImage} /> */}
                    </View>

                    <View style={[styles.card, styles.specialCard]}>
                        <Text style={styles.placeholderText}>Especial 2</Text>
                        {/* <Image source={require('../../assets/especial2.png')} style={styles.stickerImage} /> */}
                    </View>
                </View>

                <FlatList
                    data={stickersData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderStickerCard}
                    numColumns={4} // Wireframe possui 4 colunas
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.gridContainer}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>
                        {unlockedStickers}/{totalStickers}
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
    cardLocked: {
        backgroundColor: COLORS.cardLockedBg,
        borderWidth: 2,
        borderColor: COLORS.cardLockedBorder,
        borderStyle: 'dashed'
    },
    placeholderText: {
        fontSize: 12,
        color: COLORS.cardUnlockedBorder,
        fontWeight: 'bold'
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
    placeholderText: {
        fontSize: 14,
        color: '#D2A679',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default StickerGalleryScreen;