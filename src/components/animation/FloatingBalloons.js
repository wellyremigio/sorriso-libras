import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const FloatingBalloons = ({ visible, onComplete }) => {

  const balloons = useRef([...Array(5)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (visible) {
      balloons.forEach(anim => anim.setValue(0));

      const animations = balloons.map((anim) => {
        return Animated.timing(anim, {
          toValue: -(height + 200),
          duration: 4000 + (Math.random() * 2000),
          useNativeDriver: true,
        });
      });

      Animated.stagger(100, animations).start(() => {
        if (onComplete) onComplete();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const colors = ['#E74C3C', '#3498DB', '#F1C40F', '#2ECC71', '#9B59B6'];

  return (
    <View style={styles.container} pointerEvents="none">
      {balloons.map((anim, index) => {
        const horizontalPosition = (width / 5) * index + (Math.random() * 20);

        return (
          <Animated.View
            key={index}
            style={[
              styles.balloonWrapper,
              {
                transform: [{ translateY: anim }],
                left: horizontalPosition,
              }
            ]}
          >
            <MaterialCommunityIcons name="balloon" size={70} color={colors[index]} />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  balloonWrapper: {
    position: 'absolute',
    bottom: -100,
  }
});

export default FloatingBalloons;