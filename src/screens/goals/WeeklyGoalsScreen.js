import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import FloatingBalloons from '../../components/animation/FloatingBalloons';

const WeeklyGoalsScreen = ({ navigation }) => {
    // Simulando dados do calendário
    const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const brushingShifts = [
        { id: 'morning', title: 'Manhã', icon: 'sun' },
        { id: 'afternoon', title: 'Tarde', icon: 'cloud-sun' },
        { id: 'night', title: 'Noite', icon: 'moon' },
    ];

    const [completedBrush, setCompleteBrush] = useState({});
    const [isCelebrating, setIsCelebrating] = useState(false);

    const toggleCheck = (day, shiftId) => {
        const key = `${day}-${shiftId}`;
        setCompleteBrush((prevState) => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    const totalCompleted = Object.values(completedBrush).filter(Boolean).length;
    const totalGoal = 21;

    const earnedStickersCount = daysOfWeek.reduce((acc, day) => {
        const isMorningDone = completedBrush[`${day}-morning`];
        const isAfternoonDone = completedBrush[`${day}-afternoon`];
        const isNightDone = completedBrush[`${day}-night`];

        if (isMorningDone && isAfternoonDone && isNightDone) {
            return acc + 1;
        }
        return acc;
    }, 0);

    const stickerRewards = [
        { icon: 'star', color: '#F1C40F' },
        { icon: 'smile', color: '#3498DB' },
        { icon: 'heart', color: '#E74C3C' },
        { icon: 'award', color: '#9B59B6' },
        { icon: 'medal', color: '#E67E22' },
        { icon: 'crown', color: '#1ABC9C' },
        { icon: 'trophy', color: '#F39C12' }
    ];

    return (
        <SafeAreaView style={styles.container}>

            {/* Header Clássico */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Ionicons name="chevron-back" size={28} color="#2C3E50" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>LOGO</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
                    <Ionicons name="home" size={26} color="#7F8C8D" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.topSection}>
                    <Text style={styles.mainTitle}>Minhas Metas da Semana</Text>
                    <View style={styles.mascotPlaceholder}>
                        <Text style={styles.mascotText}>[Área para o Mascote Incentivador]</Text>
                    </View>
                </View>

                <View style={styles.calendarCard}>
                    <Text style={styles.goalText}>✨ Meta: 3x ao dia ✨</Text>

                    <View style={styles.calendarHeaderRow}>
                        <View style={styles.shiftColumnHeader} />
                        {daysOfWeek.map((day, index) => (
                            <View key={`header-${index}`} style={styles.dayHeaderCell}>
                                <Text style={styles.dayHeaderText}>{day}</Text>
                            </View>
                        ))}
                    </View>

                    {brushingShifts.map((shift) => (
                        <View key={shift.id} style={styles.calendarRow}>
                            <View style={styles.shiftIconCell}>
                                <FontAwesome5 name={shift.icon} size={16} color="#7F8C8D" />
                            </View>

                            {daysOfWeek.map((day, index) => {
                                const key = `${day}-${shift.id}`;
                                const isChecked = !!completedBrush[key];
                                return (
                                    <View key={key} style={styles.checkCell}>
                                        <TouchableOpacity
                                            style={[styles.checkbox, isChecked && styles.checkboxActive]}
                                            onPress={() => toggleCheck(day, shift.id)}
                                        >
                                            {isChecked ? <Ionicons name="checkmark" size={16} color="#FFF" /> : null}
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>

                <View style={styles.progressSection}>
                    <Text style={styles.progressText}>{totalCompleted}/{totalGoal} escovações cumpridas</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${(totalCompleted / totalGoal) * 100}%` }]} />
                    </View>
                </View>

                <View style={styles.rewardsSection}>
                    <Text style={styles.rewardsTitle}>Meus Adesivos Diários</Text>
                    <View style={styles.stickersContainer}>
                        {stickerRewards.map((reward, index) => {
                            const isUnlocked = index < earnedStickersCount;
                            return (
                                <View key={`sticker-${index}`} style={[styles.stickerPlaceholder, !isUnlocked && styles.stickerLocked]}>
                                    {isUnlocked ? (
                                        <FontAwesome5 name={reward.icon} size={20} color={reward.color} />
                                    ) : (
                                        <FontAwesome5 name="lock" size={14} color="#BDC3C7" />
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={() => setIsCelebrating(true)}>
                    <Text style={styles.actionButtonText}>CONCLUIR ESCOVAÇÃO</Text>
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
        backgroundColor: '#FAFAFA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    iconButton: {
        padding: 5,
    },
    logoContainer: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    logoText: {
        fontWeight: 'bold',
        color: '#7F8C8D',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    topSection: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 15,
    },
    mascotPlaceholder: {
        width: '100%',
        height: 100,
        backgroundColor: '#EBF5FB',
        borderRadius: 15,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#3498DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mascotText: {
        color: '#3498DB',
        fontWeight: 'bold',
    },
    calendarCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        elevation: 2, // Sombra Android
        shadowColor: '#000', // Sombra iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    goalText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F39C12',
        marginBottom: 15,
    },
    calendarHeaderRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ECF0F1',
        paddingBottom: 8,
        marginBottom: 8,
    },
    shiftColumnHeader: {
        width: 30, // Espaço para o ícone lateral
    },
    dayHeaderCell: {
        flex: 1,
        alignItems: 'center',
    },
    dayHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#7F8C8D',
    },
    calendarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    shiftIconCell: {
        width: 30,
        alignItems: 'center',
    },
    checkCell: {
        flex: 1,
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#BDC3C7',
        backgroundColor: '#F8F9F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: '#2ECC71',
        borderColor: '#2ECC71',
    },
    progressSection: {
        marginTop: 20,
    },
    progressText: {
        fontSize: 14,
        color: '#34495E',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#3498DB',
    },
    rewardsSection: {
        marginTop: 25,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    rewardsTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 10,
    },
    stickersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    stickerPlaceholder: {
        width: 45,
        height: 45,
        backgroundColor: '#FDFEFE',
        borderRadius: 22.5,
        borderWidth: 2,
        borderColor: '#F1C40F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stickerLocked: {
        borderColor: '#ECF0F1',
        backgroundColor: '#F8F9F9',
    },
    actionButton: {
        backgroundColor: '#3498DB',
        marginTop: 25,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    actionButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WeeklyGoalsScreen;