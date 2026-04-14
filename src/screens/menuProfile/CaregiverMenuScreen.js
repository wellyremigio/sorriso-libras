import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CaregiverMenuScreen = ({ navigation }) => {

  const menuItems = [
    { id: '1', title: 'IMPORTÂNCIA DA SUPERVISÃO DA ESCOVAÇÃO E FIO DENTAL' },
    { id: '2', title: 'IMPORTÂNCIA DA DENTIÇÃO DECÍDUA E DA DENTIÇÃO MISTA' },
    { id: '3', title: 'RELAÇÃO ENTRE SAÚDE BUCAL E SAÚDE GERAL SISTÊMICA' },
    { id: '4', title: 'ALIMENTAÇÃO E CONTROLE DA CÁRIE DENTÁRIA' },
    { id: '5', title: 'IMPORTÂNCIA DA IDA PERIÓDICA AO DENTISTA NA INFÂNCIA' },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#2C3E50" />
        </TouchableOpacity>

      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Cuidados com a Saúde Bucal</Text>
      </View>

      <ScrollView style={styles.listContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => alert(`Abrindo: ${item.title}`)}
          >
            <View style={styles.itemLeftContent}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>

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
  headerIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  squareIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#BDC3C7',
    borderRadius: 4,
  },
  squareIconOutline: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#BDC3C7',
    borderRadius: 4,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
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
  itemLeftContent: {
    flex: 1, // Impede que o texto expulse a seta do botão
    marginRight: 10, // Garante que o texto longo não grude na seta
  },
  itemText: {
    fontSize: 16, // Tamanho reduzido levemente para encaixar melhor os textos de duas linhas
    color: '#FFF',
    fontWeight: 'bold',
  },
  itemIconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#BDC3C7',
    borderRadius: 4,
    marginRight: 15,
  },
});

export default CaregiverMenuScreen;