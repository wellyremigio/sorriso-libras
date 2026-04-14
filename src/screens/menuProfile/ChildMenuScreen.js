import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ChildMenuScreen = ({ navigation }) => {

  const menuItems = [
    { id: '1', title: 'COMO SUPERAR O MEDO DE IR AO DENTISTA?' },
    { id: '2', title: 'COMO ESCOVAR OS DENTES DE FORMA CORRETA?' },
    { id: '3', title: 'COMO USAR FIO DENTAL CORRETAMENTE?' },
    { id: '4', title: 'ALIMENTOS SAUDÁVEIS PARA OS DENTES' },
    { id: '5', title: 'ALIMENTOS QUE FAZEM MAL PARA OS DENTES' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#2C3E50" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('WeeklyGoals')} style={styles.rewardButton}>
          <FontAwesome5 name="star" size={24} color="#F1C40F"/>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>APRENDA A CUIDAR DE SEUS DENTES!</Text>
      </View>

      <ScrollView style={styles.listContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => navigation.navigate('Lesson', {
              menuItems: menuItems,
              initialIndex: index,
            })}
          >
            <Text style={styles.itemText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  rewardButton:{
    padding: 5,
    backgroundColor: '#FEF9E7',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1C40F',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10, // Adiciona espaço nas laterais para os botões não colarem na tela
    paddingTop: 10, // Um respiro extra no topo da lista
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#63bcf7', // Fundo Azul
    borderRadius: 15, // Bordas bem arredondadas
    marginBottom: 15, // Espaço entre um botão e outro
    // Sombrinha leve para dar a sensação de botão clicável (efeito 3D)
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    flex: 1, // Ajuda a não encavalar o texto com a seta
    fontSize: 16,
    color: '#FFF', // Texto Branco
    fontWeight: 'bold', // Negrito fica melhor em fundos coloridos
    marginRight: 10,
  },
});

export default ChildMenuScreen;