import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ChildMenuScreen = ({ navigation }) => {

  const menuItems = [
    { id: '1', title: 'Como escovar os dentes e usar fio dental de forma correta' },
    { id: '2', title: 'Uso de fio dental na infância' },
    { id: '3', title: 'Alimentos saudáveis para os dentes e que fazem mal para os dentes' },
    { id: '4', title: 'Creme dental ideal e quantidade de creme dental' },
    { id: '5', title: 'Como escolher a escova adequada e realizar a troca da escova' },
  ];
  return (
    <ImageBackground
      source={require('../../assets/background_menu_child.png')}
      style={styles.background}
      resizeMode="cover"    
    >
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
            <Ionicons name="chevron-back" size={28} color="#2C3E50" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('WeeklyGoals')} style={styles.rewardButton}>
            <FontAwesome5 name="star" size={24} color="#F1C40F" />
          </TouchableOpacity>
        </View>

        <View style={styles.containerLogo}>
          <Image
            source={require('../../assets/logo_menu_child.png')}
            style={styles.imageLogo}
            resizeMode="contain"
          />
        </View>

        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate('ChildLesson', {
                menuItems: menuItems,
                initialIndex: index,
              })}
            >
              <View style={styles.imagePlaceholder}>
                {/* Quando tiver as imagens, substitua esta View por:
                  <Image source={require('../../assets/sua_imagem.png')} style={styles.itemImage} /> 
                */}
              </View>

              <Text style={styles.itemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          ))}
        </ScrollView>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Garante que o fundo apareça
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Fundo translúcido para os botões do topo
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8D4D8',
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // Efeito pílula translúcida
    marginHorizontal: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#F3E5F5',
    alignItems: 'center',
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#6D4C41', // Marrom escuro/quente
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Estilo principal dos botões da lista (Wireframe)
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Quase branco, levemente transparente
    borderRadius: 30, // Bem arredondado
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#F0E4E7', // Borda rosinha/cinza bem suave
    // Sombra para dar profundidade
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // Área reservada para a imagem
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAECEE', // Cinza claro enquanto não tem a imagem
    marginRight: 15,
  },
  
  // Estilo para quando você colocar a tag <Image />
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'contain',
  },

  // Texto adaptado para o novo contraste
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#4E342E', // Texto em tom quente e escuro
    fontWeight: '700',
    marginRight: 10,
  },
  containerLogo: {
    marginTop: -50,
    alignItems: 'center',
    width: '100%',
    height: 170,
    marginBotton: 15,
  },
  imageLogo: {
    width: '100%',
    height: '100%',
  },
});

export default ChildMenuScreen;