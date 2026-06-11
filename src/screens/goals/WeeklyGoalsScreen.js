import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatingBalloons from '../../components/animation/FloatingBalloons';

const COLORS = {
    background: '#FFF5F7',
    darkPink: '#D67C92',
    tableHeader: '#E8A7B9',
    tableCell: '#FDF7F8',
    textLightPink: '#FFF',
    grayBorder: '#E8D4D8',
    textDark: '#4A2C2A',
    primaryPink: '#F3A1B5',
    pinkShadow: '#D67C92',
    pastelBlue: '#A2C4C9',
    blueShadow: '#74AEB6',
    pastelGreen: '#A9DFBF',
    greenShadow: '#7FBF95',
    cream: '#FFFDFC',
    creamBorder: '#DCEEEF',
    disabledBg: '#F5ECEF',
    disabledBorder: '#E8D7DD',
    mutedText: '#7F8C8D',
    bgCheckbox: 'E9F8EF',
    progressBarText: '2C3E50',
    lightPink: '#F4D1D9',
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
        <ImageBackground
            source={require("../../assets/imagem_fundo.png")}
            style={styles.background}
            resizeMethod="cover"
        >
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
                            <MaterialCommunityIcons name="sticker-emoji" size={22} color={COLORS.textDark} />
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
                        <FontAwesome5 
                            name="tooth" 
                            size={20} 
                            color={COLORS.blueShadow} 
                            style={{ marginRight: 10 }} 
                        />
                        <Text style={styles.todayGoalText}>
                            {currentDayName}:
                            {brushesLeftToday === 0
                                ? " Parabéns! Meta diária atingida!!"
                                : ` Faltam ${brushesLeftToday} escovações hoje`}
                        </Text>
                    </View>

                    <View style={styles.calendarWrapper}>

                       
                        <View style={styles.iconColumn}>
                            <View style={styles.iconHeaderSpace} />
                            {brushingShifts.map((shift) => (
                                <View key={`icon-${shift.id}`} style={styles.iconCell}>
                                    <FontAwesome5 name={shift.icon} size={18} color="#74AEB6" />
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
                                                    disabled={isFutureDay}
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

                    <View style={styles.progressSection}>
                        <Text style={styles.progressText}>{totalCompleted}/{totalGoal} escovações concluídas</Text>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: `${(totalCompleted / totalGoal) * 100}%` }]} />
                        </View>
                    </View>

                    <View style={styles.incentiveCard}>
                        <Text style={styles.incentiveMainText}>Continue assim! Você está indo muito bem! ✨</Text>
                        <Text style={styles.incentiveSubText}>Ganhe um adesivo se completar sua meta semanal!</Text>

                        <View style={styles.stickerImagePlaceholder}>
                            <Image source={require('../../assets/star.png')} style={styles.stickerImage} />

                        </View>
                    </View>

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
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
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
        backgroundColor: COLORS.creamBorder,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#A2C4C9',
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
        elevation: 1
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
        backgroundColor: COLORS.pastelGreen,
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
        backgroundColor: COLORS.blueShadow,
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
    stickerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    actionButton: {
        backgroundColor: COLORS.pastelGreen,
        paddingVertical: 18,
        borderRadius: 35,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 6,
        borderBottomColor: COLORS.blueShadow,
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