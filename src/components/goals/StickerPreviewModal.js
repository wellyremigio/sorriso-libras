import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StickerPreviewModal = ({ visible, sticker, onClose }) => {
    const { width, height } = useWindowDimensions();
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

    if (!visible || !sticker) {
        return null;
    }

    const imageSize = Math.max(48, Math.min(width - 126, height - 200, 260));

    return (
        <Modal visible={visible} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
            <View style={styles.backdrop}>
                <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />

                <Animated.View
                    style={[
                        styles.card,
                        {
                            opacity,
                            transform: [{ translateY }, { scale }],
                        },
                    ]}
                >
                    <Pressable style={styles.closeButton} onPress={onClose} hitSlop={10}>
                        <Ionicons name="close" size={24} color="#5D4037" />
                    </Pressable>

                    <View style={styles.imageFrame}>
                        <Image
                            source={{ uri: sticker.image_url }}
                            style={{ width: imageSize, height: imageSize }}
                            resizeMode="contain"
                        />
                    </View>
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
        paddingTop: 68,
        paddingBottom: 28,
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
    closeButton: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#FFF2F5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#F0B8C8',
        zIndex: 1,
    },
    imageFrame: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF9E6',
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#ECA852',
        paddingVertical: 18,
        paddingHorizontal: 12,
    },
});

export default StickerPreviewModal;
