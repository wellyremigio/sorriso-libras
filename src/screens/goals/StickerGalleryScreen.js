import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Cores baseadas no wireframe
const COLORS = {
    textBlue: '#2C4A63',      // Título principal
    textBrown: '#5D4037',     // Subtítulo
    progressBg: '#E8D1C1',    // Fundo da barra de progresso
    progressFill: '#ECA852',  // Preenchimento laranja da barra
    cardUnlockedBg: '#FDF7E3',
    cardUnlockedBorder: '#D2A679',
    cardLockedBg: 'rgba(230, 220, 220, 0.4)',
    cardLockedBorder: '#C9B8B8',
};

const StickerGalleryScreen = ({ navigation }) => {
    const stickersData = Array.from({ length: 24 }).map((_, index) => ({
        id: String(index + 1),
        unlocked: index < 12 // Os 12 primeiros ficam desbloqueados
    }));

    const totalStickers = stickersData.length;
    const unlockedStickers = stickersData.filter(s => s.unlocked).length;

    // Função que renderiza cada figurinha (Card)
    const renderStickerCard = ({ item }) => {
        if (item.unlocked) {
            return (
                <View style={[styles.card, styles.cardUnlocked]}>
                    {/* Espaço reservado para a imagem real do adesivo */}
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
            source={require('../../assets/stickers_background.png')} // Substitua pelo nome correto do seu fundo
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>

                {/* Header Superior */}
                <View style={styles.topHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <Ionicons name="arrow-back" size={28} color={COLORS.textBrown} />
                    </TouchableOpacity>

                    {/* Placeholder da Logo */}
                    <View style={styles.logoPlaceholder}>
                        <Image source={require('../../assets/upper_logo.png')} style={styles.logoImage} resizeMode="contain" />
                    </View>

                    {/* View invisível apenas para manter a logo perfeitamente centralizada */}
                    <View style={styles.iconButton} />
                </View>

                {/* Títulos */}
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitle}>Galeria de Adesivos</Text>
                    <Text style={styles.subTitle}>Colecione todos os adesivos!</Text>
                </View>

                {/* Barra de Progresso Estilo Wireframe */}
                <View style={styles.progressWrapper}>
                    <View style={styles.progressBarContainer}>
                        {/* Fundo que preenche a barra */}
                        <View 
                            style={[
                                styles.progressBarFill, 
                                { width: `${(unlockedStickers / totalStickers) * 100}%` }
                            ]} 
                        />
                        {/* Texto sobreposto à barra */}
                        <Text style={styles.progressText}>
                            {unlockedStickers} de {totalStickers} desbloqueados
                        </Text>
                    </View>
                </View>

                {/* Grid de Adesivos */}
                <FlatList
                    data={stickersData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderStickerCard}
                    numColumns={4} // Wireframe possui 4 colunas
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.gridContainer}
                    showsVerticalScrollIndicator={false}
                />

                {/* Contador Inferior (12/24) */}
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
        zIndex: 1, // Garante que o texto fique por cima do preenchimento
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
        width: '22%', // Permite 4 colunas com um pequeno espaçamento entre elas
        aspectRatio: 1, // Mantém o card perfeitamente quadrado
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardUnlocked: {
        backgroundColor: COLORS.cardUnlockedBg,
        borderWidth: 2,
        borderColor: COLORS.cardUnlockedBorder,
        elevation: 2, // Sombra leve
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    cardLocked: {
        backgroundColor: COLORS.cardLockedBg,
        borderWidth: 2,
        borderColor: COLORS.cardLockedBorder,
        borderStyle: 'dashed' // Borda tracejada do wireframe
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
    }
});

export default StickerGalleryScreen;