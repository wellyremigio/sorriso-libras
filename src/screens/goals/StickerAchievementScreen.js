import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Mantivemos o Ionicons para placeholders se necessário

// Variáveis de Cor Centrais para facilitar a alteração futura
const COLORS = {
    background: '#FFF5F7',
    titleBlue: '#2C4A63',       // Azul escuro do título
    textGrey: '#7F8C8D',        // Cinza da descrição
    primaryPink: '#F3A1B5',     // Rosa do botão principal
    darkPink: '#D67C92',        // Sombra do botão principal
    paginationActive: '#A2C4C9', // Azul claro do ponto ativo
    paginationInactive: '#BDC3C7', // Cinza dos pontos inativos
    white: '#FFFFFF',
    adesivoBorder: '#E8D4D8',
    nextButton: '#78dda0',
    nextButtonShadow: '#33b962',  // Cor suave para a borda do adesivo
};

const StickerAchievementScreen = ({ navigation, route }) => {

    const handleContinue = () => {
        navigation.goBack();
    };

    return (
        <ImageBackground
            source={require('../../assets/background_celebration.png')} // Fundo de céu/nuvens (image_7.png/image_12.png)
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>

                {/* 1. View de Topo com Balões e Confetes (Sobreposição) */}
                <View style={styles.headerDecoration}>
                    {/* Balão Rosa Grande - Esquerda */}
                    <View style={[styles.balaoWrapper, { top: 20, left: -20, width: 90, height: 110 }]}>
                        {/* <Image source={require('../../assets/balao_rosa_grande.png')} style={styles.balaoImage} /> */}
                        {/* Placeholder de ícone se você não tiver a imagem isolada */}
                        <Ionicons name="balloon" size={70} color="#F5B7B1" />
                    </View>

                    {/* Balão Turquesa Pequeno - Esquerda */}
                    <View style={[styles.balaoWrapper, { top: 70, left: 50, width: 50, height: 60 }]}>
                        {/* <Image source={require('../../assets/balao_turquesa_pequeno.png')} style={styles.balaoImage} /> */}
                        <Ionicons name="balloon" size={40} color="#A9DFBF" />
                    </View>

                    {/* Confetes no Centro */}
                    {/* <Image source={require('../../assets/confetes.png')} style={styles.confetesImage} resizeMode="contain" /> */}

                    {/* Balão Rosa Pequeno - Direita */}
                    <View style={[styles.balaoWrapper, { top: 70, right: 50, width: 50, height: 60 }]}>
                        {/* <Image source={require('../../assets/balao_rosa_pequeno.png')} style={styles.balaoImage} /> */}
                        <Ionicons name="balloon" size={40} color="#F5B7B1" />
                    </View>

                    {/* Balão Turquesa Grande - Direita */}
                    <View style={[styles.balaoWrapper, { top: 20, right: -20, width: 90, height: 110 }]}>
                        {/* <Image source={require('../../assets/balao_turquesa_grande.png')} style={styles.balaoImage} /> */}
                        <Ionicons name="balloon" size={70} color="#A9DFBF" />
                    </View>
                </View>

                {/* 2. Área Central de Conteúdo */}
                <View style={styles.content}>

                    {/* Título de Parabéns */}
                    <Text style={styles.mainTitle}>Parabéns!</Text>

                    {/* Avatar das Crianças (Menino e Menina) */}
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../../assets/sticker_pop.png')} // Imagem isolada do avatar
                            style={styles.avatarImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Texto de Descrição */}
                    <Text style={styles.descriptionText}>Você conquistou um adesivo!</Text>

                    {/* 3. Destaque do Adesivo Ganho (Conforme image_11.png) */}
                    <View style={styles.adesivoHighlight}>
                        {/* Efeito de Brilho Estelar no fundo */}
                        <View style={styles.brilhoStars}>
                            <Ionicons name="star" size={20} color="#FFF" style={{ position: 'absolute', top: 10, left: 10 }} />
                            <Ionicons name="star" size={16} color="#FFF" style={{ position: 'absolute', bottom: 15, right: 15 }} />
                            <Ionicons name="star" size={12} color="#FFF" style={{ position: 'absolute', top: 30, right: 30 }} />
                        </View>

                        {/* O Adesivo Real */}
                        <Image
                            source={require('../../assets/stickers/sticker1.png')} // Imagem do adesivo real
                            style={styles.adesivoImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* 4. Botão Continuar (Pílula 3D) */}
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleContinue}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.actionButtonText}>Continuar</Text>
                    </TouchableOpacity>

                    {/* 5. Indicador de Paginação (Onboarding) */}
                    <View style={styles.paginationContainer}>
                        <View style={[styles.pageDot, styles.pageActive]} />
                        <View style={styles.pageDot} />
                        <View style={styles.pageDot} />
                        <View style={styles.pageDot} />
                    </View>

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
        backgroundColor: 'transparent',
        alignItems: 'center'
    },

    // Decoração do Topo (Balões e Confetes)
    headerDecoration: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 150,
        overflow: 'visible',
        zIndex: 5 // Garante que fique acima de tudo
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

    // Área Central
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: 60 // Puxa o conteúdo um pouco para baixo para equilibrar com o topo
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
        backgroundColor: 'transparent', // O preenchimento vem da View interna
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        // Borda espessa e suave
        borderWidth: 6,
        borderColor: COLORS.adesivoBorder,
        position: 'relative',
        // Sombra suave para dar profundidade
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5
    },
    brilhoStars: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#C5D6DA', // Fundo azul claro/cinza com brilho
        borderRadius: 19, // Ajustado para dentro da borda grossa
        overflow: 'hidden'
    },
    adesivoImage: {
        width: '80%',
        height: '80%',
        zIndex: 2 // Acima do fundo estelar
    },

    // Botão Continuar (Pílula 3D)
    actionButton: {
        backgroundColor: COLORS.nextButton,
        borderBottomColor: COLORS.nextButtonShadow,
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 35,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 6,
        width: '100%',
        marginBottom: 30,
        // Sombra para dar profundidade
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

    // Indicador de Paginação
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
    }
});

export default StickerAchievementScreen;