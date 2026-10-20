import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const NUM_BALLOONS = 15;

const COLORS = [
  '#E74C3C',
  '#3498DB',
  '#F1C40F',
  '#2ECC71',
  '#9B59B6',
  '#FF8FAB',
  '#00B894',
  '#F39C12',
];

const FloatingBalloons = ({ visible, onComplete }) => {
  const animations = useRef(
    [...Array(NUM_BALLOONS)].map(() => new Animated.Value(0))
  ).current;

  const messageScale = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;

  const balloonProps = useRef(
    [...Array(NUM_BALLOONS)].map(() => {
      const size = 50 + Math.random() * 45;

      return {
        size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        left: Math.random() * (width - size),
        wobbleAmount: Math.random() * 40 + 15,
        wobbleDirection: Math.random() > 0.5 ? 1 : -1,
      };
    })
  ).current;

  useEffect(() => {
    if (!visible) return;

    animations.forEach((anim) => anim.setValue(0));
    messageScale.setValue(0);
    messageOpacity.setValue(0);

    const balloonAnimations = animations.map((anim) => {
      return Animated.timing(anim, {
        toValue: 1,
        duration: 3500 + Math.random() * 2500,
        useNativeDriver: true,
      });
    });

    const messageAnimation = Animated.sequence([
      Animated.parallel([
        Animated.spring(messageScale, {
          toValue: 1,
          friction: 4,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1800),
      Animated.timing(messageOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    Animated.parallel([
      Animated.stagger(150, balloonAnimations),
      messageAnimation,
    ]).start(() => {
      if (onComplete) onComplete();
    });
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View
        style={[
          styles.messageBox,
          {
            opacity: messageOpacity,
            transform: [{ scale: messageScale }],
          },
        ]}
      >
        <Text style={styles.messageTitle}>Muito bem!</Text>
        <Text style={styles.messageSubtitle}>Escovação concluída</Text>
      </Animated.View>

      {animations.map((anim, index) => {
        const props = balloonProps[index];

        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(height + 300)],
        });

        const translateX = anim.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [
            0,
            props.wobbleAmount * props.wobbleDirection,
            -(props.wobbleAmount * props.wobbleDirection),
            props.wobbleAmount * props.wobbleDirection,
            0,
          ],
        });

        const opacity = anim.interpolate({
          inputRange: [0, 0.8, 1],
          outputRange: [1, 1, 0],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.balloonWrapper,
              {
                left: props.left,
                opacity,
                transform: [{ translateY }, { translateX }],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="balloon"
              size={props.size}
              color={props.color}
            />

            <View style={styles.string} />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },

  messageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
  },

  messageSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 4,
  },

  balloonWrapper: {
    position: 'absolute',
    bottom: -150,
    alignItems: 'center',
  },

  string: {
    width: 2,
    height: 35,
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    marginTop: -8,
    zIndex: -1,
  },
});

export default FloatingBalloons;