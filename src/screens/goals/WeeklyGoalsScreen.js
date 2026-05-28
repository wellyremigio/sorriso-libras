import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatingBalloons from '../../components/animation/FloatingBalloons';

// Variáveis de Cor Centrais para facilitar a alteração futura
const COLORS = {
    background: '#FFF5F7',
    primaryPink: '#F3A1B5', // Cor do botão principal
    darkPink: '#D67C92',    // Sombra do botão principal
    tableHeader: '#E8A7B9', // Rosa do cabeçalho da tabela
    tableCell: '#FDF7F8',   // Fundo quase branco da tabela
    textDark: '#4E342E',
    textLightPink: '#FFF',
    grayBorder: '#E8D4D8'
};

const WeeklyGoalsScreen = ({ navigation }) => {
    const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const brushingShifts = [
        { id: 'morning', title: 'Manhã', icon: 'sun' },
        { id: 'afternoon', title: 'Tarde', icon: 'cloud-sun' },
        { id: 'night', title: 'Noite', icon: 'moon' },
    ];

    const [completedBrush, setCompleteBrush] = useState({});
    const [isCelebrating, setIsCelebrating] = useState(false);

    // Descobre o dia atual (0=Domingo, 1=Segunda, etc.) e mapeia para a nossa array
    const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const currentDayName = daysOfWeek[currentDayIndex];

    const totalGoal = 21;
    useEffect(() => {
        const loadData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('@stickers_progress');
                if (savedData !== null) setCompleteBrush(JSON.parse(savedData));
            } catch (e) { console.error(e); }
        };
        loadData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setCompleteBrush((prevState) => {
                const currentTotal = Object.values(prevState).filter(Boolean).length;
                if (currentTotal >= totalGoal) {
                    AsyncStorage.removeItem('@stickers_progress');
                    return {};
                }
                return prevState;
            });
        }, [])
    );

    const toggleCheck = async (day, shiftId) => {
        const key = `${day}-${shiftId}`;
        setCompleteBrush((prevState) => {
            const newState = { ...prevState, [key]: !prevState[key] };
            AsyncStorage.setItem('@stickers_progress', JSON.stringify(newState)).catch(e => console.error(e));
            return newState;
        });
    };

    const totalCompleted = Object.values(completedBrush).filter(Boolean).length;
    const brushesToday = [
        completedBrush[`${currentDayName}-morning`],
        completedBrush[`${currentDayName}-afternoon`],
        completedBrush[`${currentDayName}-night`]
    ].filter(Boolean).length;

    const brushesLeftToday = 3 - brushesToday;

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconButton}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                >
                    <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
                </TouchableOpacity>

                <View style={styles.logoPlaceholder}>
                    <Image source={require('../../assets/upper_logo.png')} style={styles.logoImage} resizeMode="contain" />
                </View>

                <View style={styles.rightIconsGroup}>
                    <TouchableOpacity onPress={() => navigation.navigate('StickerGallery')} style={styles.iconButton}>
                        <FontAwesome5 name="book-open" size={22} color={COLORS.textDark} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
                        <Ionicons name="home" size={26} color={COLORS.textDark} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.titleBanner}>
                <Text style={styles.titleText}>Minhas Metas da Semana</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* 3. Indicador de Meta do Dia Atual */}
                <View style={styles.todayGoalBanner}>
                    <FontAwesome5 name="tooth" size={20} color={COLORS.primaryPink} style={{ marginRight: 10 }} />
                    <Text style={styles.todayGoalText}>
                        {currentDayName}:
                        {brushesLeftToday === 0
                            ? " Parabéns! Meta diária atingida!!"
                            : ` Faltam ${brushesLeftToday} escovações hoje`}
                    </Text>
                </View>


                {/* 4. Calendário (Ícones fora + Tabela Menor) */}
                {/* 4. Calendário (Ícones fora + Tabela Menor) */}
                <View style={styles.calendarWrapper}>

                    {/* Coluna da Esquerda (Ícones Flutuantes) */}
                    <View style={styles.iconColumn}>

                        {/* Espaço vazio para alinhar com o cabeçalho da tabela */}
                        <View style={styles.iconHeaderSpace} />

                        {brushingShifts.map((shift) => (
                            <View key={`icon-${shift.id}`} style={styles.iconCell}>
                                <FontAwesome5 name={shift.icon} size={18} color="#A08B8B" />
                            </View>
                        ))}
                    </View>

                    {/* Coluna da Direita (Tabela com Bordas) */}
                    <View style={styles.tableContainer}>

                        {/* Cabeçalho (Seg - Dom) */}
                        <View style={styles.tableHeaderRow}>
                            {daysOfWeek.map((day, index) => (
                                <View key={`header-${index}`} style={styles.tableHeaderCell}>
                                    <Text style={styles.tableHeaderText}>{day}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Linhas de Checkbox */}
                        {brushingShifts.map((shift, shiftIndex) => (
                            <View key={shift.id} style={[
                                styles.tableRow,
                                shiftIndex === brushingShifts.length - 1 && { borderBottomWidth: 0 }
                            ]}>
                                {daysOfWeek.map((day, index) => {
                                    const key = `${day}-${shift.id}`;
                                    const isChecked = !!completedBrush[key];
                                    const isFutureDay = index > currentDayIndex;

                                    return (
                                        <View key={key} style={styles.tableCell}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.checkbox,
                                                    isChecked && styles.checkboxActive,
                                                    isFutureDay && styles.checkboxDisabled
                                                ]}
                                                onPress={() => toggleCheck(day, shift.id)}
                                                activeOpacity={0.7}
                                                disabled={isFutureDay}
                                            >
                                                {isChecked ? <Ionicons name="checkmark" size={16} color={COLORS.primaryPink} /> : null}
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                </View>

                {/* 5. Barra de Progresso Semanal */}
                <View style={styles.progressSection}>
                    <Text style={styles.progressText}>{totalCompleted}/{totalGoal} escovações concluídas</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${(totalCompleted / totalGoal) * 100}%` }]} />
                    </View>
                </View>

                {/* 6. Card de Incentivo e Espaço para Adesivo */}
                <View style={styles.incentiveCard}>
                    <Text style={styles.incentiveMainText}>Continue assim! Você está indo muito bem! ✨</Text>
                    <Text style={styles.incentiveSubText}>Ganhe um adesivo se completar sua meta semanal!</Text>

                    {/* Placeholder para a imagem do adesivo no canto */}
                    <View style={styles.stickerImagePlaceholder}>
                        <Image source={require('../../assets/star.png')} style={styles.stickerImage} />

                    </View>
                </View>

                {/* 7. Botão Concluir */}
                <TouchableOpacity style={styles.actionButton} onPress={() => setIsCelebrating(true)} activeOpacity={0.8}>
                    <Text style={styles.actionButtonText}>Concluir Escovação</Text>
                </TouchableOpacity>
            </ScrollView>

            <FloatingBalloons
                visible={isCelebrating}
                onComplete={() => {
                    setIsCelebrating(false);
                    navigation.navigate('Home');
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    // Header
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 10,
        elevation: 10,
    },

    rightIconsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    // iconButton: {
    //     padding: 5,
    // },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E8D4D8',
    },

    logoPlaceholder: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoImage: {
        width: 230,
        height: 230,
    },

    logoText: {
        color: '#A08B8B',
        fontSize: 12,
        fontWeight: 'bold',
    },

    // Título
    titleBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    titleArrow: {
        marginRight: 15,
    },

    titleText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'center',
        marginRight: 35,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    // Banner da meta do dia
    todayGoalBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9E4E8',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F4D1D9',
    },

    todayGoalText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },

    // Tabela
    // --- ESTILOS DO CALENDÁRIO ---
    calendarWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'stretch'
    },
    iconColumn: {
        width: 26, // Coluna fininha só para os ícones
        marginRight: 8,
        justifyContent: 'flex-start'
    },
    iconHeaderSpace: {
        height: 36 // Altura exata do cabeçalho da tabela
    },
    iconCell: {
        height: 44, // Altura exata das linhas da tabela
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableContainer: {
        flex: 1, // Ocupa o restante da tela
        backgroundColor: COLORS.tableCell,
        borderRadius: 15, // Curvatura um pouco mais suave
        borderWidth: 2, // Borda um pouco mais fina
        borderColor: '#F4D1D9',
        overflow: 'hidden'
    },
    tableHeaderRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.tableHeader,
        height: 36, // Fixado para alinhar com iconHeaderSpace
        alignItems: 'center'
    },
    tableHeaderCell: {
        flex: 1,
        alignItems: 'center'
    },
    tableHeaderText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12 // Fonte menor para caber em telas pequenas
    },
    tableRow: {
        flexDirection: 'row',
        height: 44, // Fixado para alinhar com iconCell
        borderBottomWidth: 1,
        borderBottomColor: '#F4D1D9'
    },
    tableCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#F4D1D9'
    },
    checkbox: {
        width: 24, // Bem menor que os 30 de antes
        height: 24,
        borderRadius: 6,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#E8C5CC',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },
    checkboxActive: {
        borderColor: COLORS.primaryPink
    },
    checkboxDisabled: {
        backgroundColor: '#F5E9EC',
        borderColor: '#E8D4D8',
        opacity: 0.5
    },

    // Barra de progresso semanal
    progressSection: {
        backgroundColor: '#F3A1B5',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    progressText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 14,
    },

    progressBarBackground: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 4,
        overflow: 'hidden',
    },

    progressBarFill: {
        height: '100%',
        backgroundColor: '#FFF',
    },

    // Card de incentivo
    incentiveCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: '#F4D1D9',
        position: 'relative',
        marginBottom: 30,
    },

    incentiveMainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'center',
        marginBottom: 10,
        paddingRight: 40,
    },

    incentiveSubText: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
        paddingRight: 40,
    },

    stickerImagePlaceholder: {
        position: 'absolute',
        bottom: -15,
        right: -10,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FDF7F8',
        borderWidth: 2,
        borderColor: '#F4D1D9',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },

    stickerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    // Botão concluir
    actionButton: {
        backgroundColor: COLORS.primaryPink,
        paddingVertical: 18,
        borderRadius: 35,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 6,
        borderBottomColor: COLORS.darkPink,
    },

    actionButtonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: {
            width: 0,
            height: 1,
        },
        textShadowRadius: 2,
    },
    shiftIconCell: {
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#F4D1D9'
    },

});

export default WeeklyGoalsScreen;