import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const StickerGalleryScreen = ({ navigation }) => {
  // Simulando um banco de dados de adesivos (misturando vídeos e escovação)
  const stickersData = [
    { id: '1', icon: 'star', color: '#F1C40F', title: '1ª Lição', unlocked: true },
    { id: '2', icon: 'smile', color: '#3498DB', title: 'Sorrisão', unlocked: true },
    { id: '3', icon: 'tooth', color: '#2ECC71', title: 'Dente Forte', unlocked: true },
    { id: '4', icon: 'award', color: '#9B59B6', title: 'Dedicação', unlocked: true },
    { id: '5', icon: 'apple-alt', color: '#E74C3C', title: 'Saudável', unlocked: false },
    { id: '6', icon: 'medal', color: '#E67E22', title: 'Medalha', unlocked: false },
    { id: '7', icon: 'crown', color: '#1ABC9C', title: 'Realeza', unlocked: false },
    { id: '8', icon: 'trophy', color: '#F39C12', title: 'Campeão', unlocked: false },
    { id: '9', icon: 'shield-alt', color: '#3498DB', title: 'Proteção', unlocked: false },
    { id: '10', icon: 'magic', color: '#9B59B6', title: 'Mágica', unlocked: false },
    { id: '11', icon: 'gem', color: '#1ABC9C', title: 'Precioso', unlocked: false },
    { id: '12', icon: 'check-double', color: '#2ECC71', title: 'Perfeito', unlocked: false },
  ];

  // Calculando o progresso da criança
  const totalStickers = stickersData.length;
  const unlockedStickers = stickersData.filter(s => s.unlocked).length;

  // Função que renderiza cada "Card" de adesivo na tela
  const renderStickerCard = ({ item }) => {
    return (
      <View style={[styles.card, !item.unlocked && styles.cardLocked]}>
        {item.unlocked ? (
          <>
            <View style={styles.iconContainer}>
              <FontAwesome5 name={item.icon} size={40} color={item.color} solid />
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          </>
        ) : (
          <>
            <View style={[styles.iconContainer, styles.iconContainerLocked]}>
              <FontAwesome5 name="lock" size={24} color="#BDC3C7" />
            </View>
            <Text style={styles.cardTitleLocked}>Bloqueado</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={28} color="#2C3E50" />
        </TouchableOpacity>
        
        <View style={styles.titleWrapper}>
          <Text style={styles.headerTitle}>Álbum de Adesivos</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
          <Ionicons name="home" size={26} color="#7F8C8D" />
        </TouchableOpacity>
      </View>

      {/* Seção de Progresso */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Sua Coleção</Text>
        <Text style={styles.progressText}>
          Você já conseguiu <Text style={styles.progressHighlight}>{unlockedStickers}</Text> de {totalStickers} adesivos!
        </Text>
        
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${(unlockedStickers / totalStickers) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Grid de Adesivos */}
      <FlatList
        data={stickersData}
        keyExtractor={(item) => item.id}
        renderItem={renderStickerCard}
        numColumns={3} // Exibe 3 cards por linha
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEF', // Cor de fundo padrão da área da criança
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  iconButton: {
    padding: 5,
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  progressSection: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498DB',
    textAlign: 'center',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 15,
  },
  progressHighlight: {
    color: '#F39C12',
    fontWeight: 'bold',
    fontSize: 18,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#ECF0F1',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F1C40F',
    borderRadius: 6,
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 8,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Garante que todos os cards fiquem do mesmo tamanho
    aspectRatio: 0.85, 
    justifyContent: 'center',
  },
  cardLocked: {
    backgroundColor: '#F8F9F9',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#ECF0F1',
    borderStyle: 'dashed',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FDFEFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainerLocked: {
    backgroundColor: '#EAEDED',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#34495E',
    textAlign: 'center',
  },
  cardTitleLocked: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#BDC3C7',
    textAlign: 'center',
  }
});

export default StickerGalleryScreen;