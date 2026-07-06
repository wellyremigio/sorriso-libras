import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LudicInfoModal = ({
    visible,
    title,
    message,
    buttonLabel = 'Entendi',
    onPress,
    iconName = 'sparkles',
    iconColor = '#F3A1B5',
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(18)).current;
    const scale = useRef(new Animated.Value(0.92)).current;

    useEffect(() => {
        if (!visible) {
            opacity.setValue(0);
            translateY.setValue(18);
            scale.setValue(0.92);
            return;
        }

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 220,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                friction: 7,
                tension: 70,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 6,
                tension: 80,
                useNativeDriver: true,
            }),
        ]).start();
    }, [visible, opacity, translateY, scale]);

    if (!visible) {
        return null;
    }

    return (
        <Modal visible={visible} transparent animationType="none" statusBarTranslucent onRequestClose={onPress}>
            <View style={styles.backdrop}>
                <Animated.View
                    style={[
                        styles.card,
                        {
                            opacity,
                            transform: [{ translateY }, { scale }],
                        },
                    ]}
                >
                    <View style={styles.iconBubble}>
                        <Ionicons name={iconName} size={36} color={iconColor} />
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
                        <Text style={styles.buttonText}>{buttonLabel}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(76, 44, 42, 0.28)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    card: {
        width: '100%',
        maxWidth: 360,
        borderRadius: 28,
        paddingHorizontal: 22,
        paddingTop: 26,
        paddingBottom: 20,
        backgroundColor: '#FFFDFB',
        borderWidth: 3,
        borderColor: '#F4D1D9',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
    },
    iconBubble: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#FFF2F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#F0B8C8',
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#4A2C2A',
        textAlign: 'center',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        lineHeight: 23,
        color: '#6E5A57',
        textAlign: 'center',
        marginBottom: 22,
    },
    button: {
        minWidth: width * 0.5,
        backgroundColor: '#78DDA0',
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)',
        borderBottomWidth: 5,
        borderBottomColor: '#33B962',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#2C3E50',
    },
});

export default LudicInfoModal;
