import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const DentistMenuScreen = ({ navigation }) => {
  
  const menuItems = [
    { id: '1', title: 'APLICAÇÃO TÓPICA DE FLÚOR EM CRIANÇAS' },
    { id: '2', title: 'ESCOVAÇÃO SUPERVISIONADA' },
    { id: '3', title: 'USO DE FIO DENTAL NA INFÂNCIA' },
    { id: '4', title: 'ABORDAGEM COMPORTAMENTAL DA CRIANÇA' },
    { id: '5', title: 'ATENDIMENTO ODONTOLÓGICO PARA CRIANÇAS SURDAS' },
  ];

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem}
            onPress={() => alert(`Abrindo: ${item.title}`)}
          >
            <Text style={styles.itemText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#7F8C8D" />
          </TouchableOpacity>
        ))}
      </ScrollView>

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
  listContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#BDC3C7',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
    backgroundColor: '#FFF',
  },
  itemText: {
    fontSize: 18,
    color: '#34495E',
    fontWeight: '500',
  }
});

export default DentistMenuScreen;