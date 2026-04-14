import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const FloatingBalloons = ({ visible, onComplete }) => {
  // Criamos 5 valores animados (um para cada balão), começando na parte de baixo da tela
  const balloons = useRef([...Array(5)].map(() => new Animated.Value(height))).current;

  useEffect(() => {
    if (visible) {
      // 1. Volta os balões para o chão
      balloons.forEach(anim => anim.setValue(height));

      // 2. Cria a animação de subida para cada balão
      const animations = balloons.map((anim) => {
        return Animated.timing(anim, {
          toValue: -150, // Vai até passar do topo da tela (-150px)
          duration: 2000 + (Math.random() * 1500), // Tempo aleatório entre 2s e 3.5s para ficarem irregulares
          useNativeDriver: true, // Melhora a performance rodando direto na placa de vídeo do celular
        });
      });

      // 3. Dispara as animações com um pequeno atraso entre elas (stagger)
      Animated.stagger(150, animations).start(() => {
        // Quando terminar, avisa a tela principal que a festa acabou
        if (onComplete) onComplete(); 
      });
    }
  }, [visible]);

  // Se não estiver visível, não renderiza nada na tela para não gastar memória
  if (!visible) return null;

  // Cores lúdicas para os balões
  const colors = ['#E74C3C', '#3498DB', '#F1C40F', '#2ECC71', '#9B59B6'];

  return (
    // pointerEvents="none" garante que os balões não bloqueiem o toque em botões da tela
    <View style={styles.container} pointerEvents="none">
      {balloons.map((anim, index) => {
        // Espalha os balões horizontalmente pela tela
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
    ...StyleSheet.absoluteFillObject, // Faz o container cobrir a tela inteira, flutuando por cima de tudo
    zIndex: 999, // Garante que fique acima de botões e textos
  },
  balloonWrapper: {
    position: 'absolute',
    bottom: 0,
  }
});

export default FloatingBalloons;