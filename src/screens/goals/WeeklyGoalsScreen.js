import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import FloatingBalloons from '../../components/animation/FloatingBalloons';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LudicInfoModal from '../../components/goals/LudicInfoModal';
import {
    completeCurrentBrushingGoal,
    getCurrentBrushingGoal,
    updateBrushingGoalCheck,
} from '../../services/brushingGoalService';

const COLORS = {
    background: '#FFF5F7',
    darkPink: '#D67C92',
    tableHeader: '#E8A7B9',
    tableCell: '#FDF7F8',
    textLightPink: '#FFF',
    grayBorder: '#E8D4D8',
    textDark: '#4A2C2A',
    primaryPink: '#f3aec0',
    pinkShadow: '#D67C92',
    pastelBlue: '#2f97a7',
    blueShadow: '#74AEB6',
    pastelGreen: '#A9DFBF',
    greenShadow: '#4dc075',
    cream: '#FFFDFC',
    creamBorder: '#DCEEEF',
    disabledBg: '#F5ECEF',
    disabledBorder: '#E8D7DD',
    mutedText: '#7F8C8D',
    bgCheckbox: 'E9F8EF',
    progressBarText: '2C3E50',
    lightPink: '#F4D1D9',
    finishButton: '#78dda0',
    finishButtonShadow: '#33b962',
    progressColor: '#a1d3eb',
    progressColorBar: '#5a70ad',
};

const WEEKLY_REWARD_STORAGE_PREFIX = '@weekly_brushing_goal_claimed_';

const getCurrentWeekKey = () => {
    const now = new Date();
    const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(monday.getDate() - dayIndex);
    const year = monday.getFullYear();
    const month = String(monday.getMonth() + 1).padStart(2, '0');
    const day = String(monday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const WeeklyGoalsScreen = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;
    const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const brushingShifts = [
        { id: 'morning', title: 'Manhã', icon: 'sun' },
        { id: 'afternoon', title: 'Tarde', icon: 'cloud-sun' },
        { id: 'night', title: 'Noite', icon: 'moon' },
    ];

    const [completedBrush, setCompleteBrush] = useState({});
    const [weeklyGoal, setWeeklyGoal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savingCheck, setSavingCheck] = useState(false);
    const [isCelebrating, setIsCelebrating] = useState(false);
    const [hasClaimedWeeklyReward, setHasClaimedWeeklyReward] = useState(false);
    const [infoModal, setInfoModal] = useState({
        visible: false,
        title: '',
        message: '',
        buttonLabel: 'Entendi',
        iconName: 'sparkles',
        iconColor: '#F3A1B5',
        onConfirm: null,
    });

    const hideInfoModal = useCallback(() => {
        setInfoModal((prevState) => ({
            ...prevState,
            visible: false,
            onConfirm: null,
        }));
    }, []);

    const showInfoModal = useCallback(({ title, message, buttonLabel, iconName, iconColor, onConfirm }) => {
        setInfoModal({
            visible: true,
            title,
            message,
            buttonLabel: buttonLabel || 'Entendi',
            iconName: iconName || 'sparkles',
            iconColor: iconColor || '#F3A1B5',
            onConfirm: onConfirm || null,
        });
    }, []);

    const handleInfoModalPress = useCallback(() => {
        const action = infoModal.onConfirm;
        hideInfoModal();

        if (action) {
            action();
        }
    }, [hideInfoModal, infoModal.onConfirm]);

    const loadWeeklyGoal = async () => {
        try {
            setLoading(true);
            setError(null);

            const [data, claimedReward] = await Promise.all([
                getCurrentBrushingGoal(),
                AsyncStorage.getItem(`${WEEKLY_REWARD_STORAGE_PREFIX}${getCurrentWeekKey()}`),
            ]);

            setWeeklyGoal(data);
            setCompleteBrush(data.checks || {});
            setHasClaimedWeeklyReward(claimedReward === 'true');
        } catch (error) {
            console.error("Erro ao carregar meta semanal:", error);
            setError("Não foi possível carregar suas metas agora.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadWeeklyGoal();
        }, [])
    );

    const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const currentDayName = daysOfWeek[currentDayIndex];

    const totalGoal = weeklyGoal?.total_goal || 21;


    const toggleCheck = async (day, shiftId) => {
        if (savingCheck) return;

        const key = `${day}-${shiftId}`;
        const newCheckedValue = !completedBrush[key];

        try {
            setSavingCheck(true);

            const updatedGoal = await updateBrushingGoalCheck({
                day,
                shift: shiftId,
                checked: newCheckedValue,
            });

            setWeeklyGoal(updatedGoal);
            setCompleteBrush(updatedGoal.checks || {});
        } catch (error) {
            console.error("Erro ao atualizar check:", error);

            showInfoModal({
                title: "Ops!",
                message: "Não conseguimos salvar essa escovação agora. Tente novamente.",
                buttonLabel: "Tentar de novo",
                iconName: "warning",
                iconColor: "#E58B9D",
                onConfirm: loadWeeklyGoal,
            });
        } finally {
            setSavingCheck(false);
        }
    };

    const totalCompleted = Object.values(completedBrush).filter(Boolean).length;
    const brushesToday = [
        completedBrush[`${currentDayName}-morning`],
        completedBrush[`${currentDayName}-afternoon`],
        completedBrush[`${currentDayName}-night`]
    ].filter(Boolean).length;

    const brushesLeftToday = 3 - brushesToday;
    const isWeeklyGoalCompleted = totalCompleted >= totalGoal;
    const isLastDayOfWeek = currentDayIndex === 6;

    const handleFinishBrushing = async () => {
        if (isWeeklyGoalCompleted) {
            if (hasClaimedWeeklyReward) {
                showInfoModal({
                    title: "Você já recebeu seu adesivo!",
                    message: "Esse adesivo da semana já foi conquistado e guardado com carinho. Na próxima semana tem outro esperando por você!",
                    buttonLabel: "Concluir!",
                    iconName: "gift",
                    iconColor: "#ECA852",
                });
                return;
            }

            try {
                const result = await completeCurrentBrushingGoal();

                if (result.goal) {
                    setWeeklyGoal(result.goal);
                    setCompleteBrush(result.goal.checks || {});
                }

                if (result.completed) {
                    await AsyncStorage.setItem(
                        `${WEEKLY_REWARD_STORAGE_PREFIX}${getCurrentWeekKey()}`,
                        'true'
                    );
                    setHasClaimedWeeklyReward(true);

                    navigation.navigate("StickerAchievementScreen", {
                        isFinalAchievement: false,
                        achievementType: "weekly_brushing_goal",
                        earnedStickers: result.earned_stickers || [],
                    });
                    return;
                }

                showInfoModal({
                    title: "Você está quase lá!",
                    message: result.message || "Continue tentando para conquistar seu adesivo.",
                    buttonLabel: "Vou tentar",
                    iconName: "sparkles",
                    iconColor: "#F3A1B5",
                });
            } catch (error) {
                console.error("Erro ao concluir meta semanal:", error);

                showInfoModal({
                    title: "Ops!",
                    message: "Não conseguimos finalizar sua meta agora. Tente novamente.",
                    buttonLabel: "Tentar de novo",
                    iconName: "warning",
                    iconColor: "#E58B9D",
                });
            }

            return;
        }

        // if (isLastDayOfWeek) {
        //     showInfoModal({
        //         title: "Você está quase lá!",
        //         message: "A semana terminou, mas tudo bem! Na próxima semana você pode tentar de novo e conquistar seu adesivo.",
        //         buttonLabel: "Tudo bem",
        //         iconName: "happy-outline",
        //         iconColor: "#A9DFBF",
        //     });
        //     return;
        // }

        setIsCelebrating(true);
    };

    if (loading) {
        return (
            <ImageBackground
                source={require("../../assets/imagem_fundo.png")}
                style={styles.background}
                resizeMethod="cover"
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.loadingContent}>
                        <ActivityIndicator size="large" color={COLORS.textDark} />
                        <Text style={styles.progressText}>Carregando metas...</Text>
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
                resizeMethod="cover"
            >
                <SafeAreaView style={styles.container}>
                    <Text style={styles.progressText}>{error}</Text>

                    <TouchableOpacity style={styles.actionButton} onPress={loadWeeklyGoal}>
                        <Text style={styles.actionButtonText}>Tentar novamente</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require("../../assets/imagem_fundo.png")}
            style={styles.background}
            resizeMethod="cover"
        >
            <SafeAreaView style={styles.container}>
                <View style={[styles.topHeader, isTablet && styles.sectionTablet]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.iconButton}
                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    >
                        <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <View style={styles.logoPlaceholder}>
                        <Image
                            source={require('../../assets/upper_logo.png')}
                            style={[styles.logoImage, isTablet && styles.logoImageTablet]}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.rightIconsGroup}>
                        <TouchableOpacity onPress={() => navigation.navigate('StickerGallery')} style={styles.iconButton}>
                            <MaterialCommunityIcons name="sticker-emoji" size={22} color={COLORS.textDark} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
                            <Ionicons name="home" size={26} color={COLORS.textDark} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.titleBanner, isTablet && styles.sectionTablet]}>
                    <Text style={styles.titleText}>Minhas Metas da Semana</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={[styles.todayGoalBanner, isTablet && styles.sectionTablet]}>
                        <FontAwesome5
                            name="tooth"
                            size={20}
                            color={'#fffefe'}
                            style={{ marginRight: 10 }}
                        />
                        <Text style={styles.todayGoalText}>
                            {currentDayName}:
                            {brushesLeftToday === 0
                                ? " Parabéns! Meta diária atingida!!"
                                : ` Faltam ${brushesLeftToday} escovações hoje`}
                        </Text>
                    </View>

                    <View style={[styles.flossReminderCard, isTablet && styles.sectionTablet]}>

                        <View style={styles.stickerImagePlaceholderDental}>
                            <Image source={require('../../assets/dental-floss.png')} style={styles.stickerImage} />

                        </View>

                        <Text style={styles.flossReminderText}>
                            Não se esqueça de usar o fio dental{"\n"}para deixar os seus dentes limpinhos!
                        </Text>
                    </View>

                    <View style={[styles.calendarWrapper, isTablet && styles.sectionTablet]}>
                        <View style={styles.iconColumn}>
                            <View style={styles.iconHeaderSpace} />
                            {brushingShifts.map((shift) => (
                                <View key={`icon-${shift.id}`} style={styles.iconCell}>
                                    <FontAwesome5 name={shift.icon} size={18} color={COLORS.pastelBlue}/>
                                </View>
                            ))}
                        </View>

                        <View style={styles.tableContainer}>

                            <View style={styles.tableHeaderRow}>
                                {daysOfWeek.map((day, index) => (
                                    <View key={`header-${index}`} style={styles.tableHeaderCell}>
                                        <Text style={styles.tableHeaderText}>{day}</Text>
                                    </View>
                                ))}
                            </View>

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
                                                    disabled={isFutureDay || savingCheck}
                                                >
                                                    {isChecked ? <Ionicons name="checkmark" size={16} color={COLORS.greenShadow} /> : null}
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })}
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={[styles.progressSection, isTablet && styles.sectionTablet]}>
                        <Text style={styles.progressText}>{totalCompleted}/{totalGoal} escovações concluídas</Text>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: `${(totalCompleted / totalGoal) * 100}%` }]} />
                        </View>
                    </View>

                    <View style={[styles.incentiveCard, isTablet && styles.sectionTablet]}>
                        <Text style={styles.incentiveMainText}>Continue assim! Você está indo muito bem!</Text>
                        <Text style={styles.incentiveSubText}>Ganhe um adesivo se completar sua meta semanal!</Text>

                        <View style={styles.stickerImagePlaceholder}>
                            <Image source={require('../../assets/star.png')} style={styles.stickerImage} />

                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.actionButton, isTablet && styles.actionButtonTablet]}
                        onPress={handleFinishBrushing}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.actionButtonText}>
                            {isLastDayOfWeek
                                ? (isWeeklyGoalCompleted
                                    ? (hasClaimedWeeklyReward ? "Adesivo já recebido" : "Receber Adesivo")
                                    : "Completar escovação")
                                : "Concluir Escovação"}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                <FloatingBalloons
                    visible={isCelebrating}
                    onComplete={() => {
                        setIsCelebrating(false);
                        navigation.navigate('Home');
                    }}
                />

                <LudicInfoModal
                    visible={infoModal.visible}
                    title={infoModal.title}
                    message={infoModal.message}
                    buttonLabel={infoModal.buttonLabel}
                    iconName={infoModal.iconName}
                    iconColor={infoModal.iconColor}
                    onPress={handleInfoModalPress}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    flossReminderCard: {
        position: 'relative',
        backgroundColor: COLORS.cream,
        borderWidth: 2,
        borderColor: "#8ccdf8",
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
    },
    flossReminderIcon: {
        marginRight: 10,
    },
    flossReminderText: {
        flex: 1,
        color: COLORS.textDark,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "600",
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 10,
        zIndex: 10,
        elevation: 10,
    },
    sectionTablet: {
        width: '82%',
        alignSelf: 'center',
    },
    rightIconsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
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
    // Ajuste de largura leve aplicado só em tablet.
    logoImageTablet: {
        width: 290,
        height: 290,
    },
    logoText: {
        color: '#A08B8B',
        fontSize: 12,
        fontWeight: 'bold',
    },
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
    todayGoalBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryPink,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#db8bdb',
    },
    todayGoalText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    calendarWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'stretch'
    },
    iconColumn: {
        width: 26,
        marginRight: 8,
        justifyContent: 'flex-start'
    },
    iconHeaderSpace: {
        height: 36
    },
    iconCell: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableContainer: {
        flex: 1,
        backgroundColor: COLORS.cream,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.pastelBlue,
        overflow: 'hidden'
    },
    tableHeaderRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.pastelBlue,
        height: 36,
        alignItems: 'center'
    },
    tableHeaderCell: {
        flex: 1,
        alignItems: 'center'
    },
    tableHeaderText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12
    },
    tableRow: {
        flexDirection: 'row',
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.creamBorder
    },
    tableCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: COLORS.creamBorder
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#E8C5CC',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0
    },
    checkboxActive: {
        borderColor: COLORS.greenShadow,
        backgroundColor: COLORS.bgCheckbox
    },
    checkboxDisabled: {
        backgroundColor: '#F5ECEF',
        borderColor: '#E8D7DD',
        opacity: 0.5
    },
    progressSection: {
        backgroundColor: COLORS.progressColor,
        borderBottomColor: COLORS.greenShadow,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    progressText: {
        color: COLORS.progressBarText,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 14,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.progressColorBar,
    },
    incentiveCard: {
        backgroundColor: COLORS.cream,
        borderRadius: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: COLORS.lightPink,
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
        backgroundColor: COLORS.cream,
        borderWidth: 2,
        borderColor: COLORS.lightPink,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    stickerImagePlaceholderDental: {
        position: 'absolute',
        bottom: -15,
        right: -10,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.cream,
        borderWidth: 2,
        borderColor: "#8ccdf8",
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    stickerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    actionButton: {
        backgroundColor: COLORS.finishButton,
        paddingVertical: 18,
        borderRadius: 35,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 6,
        borderBottomColor: COLORS.finishButtonShadow,
    },
    actionButtonTablet: {
        width: '50%',
        alignSelf: 'center',
    },
    actionButtonText: {
        color: '#2C3E50',
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
        borderRightColor: COLORS.lightPink
    },
});

export default WeeklyGoalsScreen;
