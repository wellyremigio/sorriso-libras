import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const DentistMenuScreen = ({ navigation }) => {

  const menuItems = [
    {
      id: '1',
      title: 'Apresentação do Dentista e de como não ter medo da consulta odontológica',
      image: require('../../assets/dentist_menu_dentist.png'),
    },
    {
      id: '2',
      title: 'Atendimento odontológico para crianças surdas',
      image: require('../../assets/deaf_child_menu_dentist.png'),
    },
    {
      id: '3',
      title: 'Conhecendo a Sala de Espera e o Consultório Odontológico',
      image: require('../../assets/wait_room_menu_dentist.png'),
    },
    {
      id: '4',
      title: 'Conhecendo a Sala de Raio x',
      image: require('../../assets/x_ray_menu_dentist.png'),
    },
    {
      id: '5',
      title: 'Conhecendo a Cadeira do Dentista e os Instrumentais Odontológicos',
      image: require('../../assets/presentation_menu_dentist.png'),
    },
    {
      id: '6',
      title: 'Conhecendo o flúor e as formas de uso',
      image: require('../../assets/fluor_menu_dentist.png'),
    },
  ];

  return (

    <ImageBackground
      source={require('../../assets/background_menu_dentist.png')}
      style={styles.background}
      resizeMode="contain"
    >
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        <View style={styles.containerLogo}>
          <Image
            source={require('../../assets/logo_menu_dentist.png')}
            style={styles.imageLogo}
            resizeMode="contain"
          />
        </View>

        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate('AdultLesson', {
                menuItems: menuItems,
                initialIndex: index,
                profileType: 'dentist'
              })}
            >

              <View style={styles.imagePlaceholder}>
                <Image source={item.image} style={styles.itemImage} />
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
    backgroundColor: '#FFFBEF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
    zIndex: 10,
  },
  backButton: {
    padding: 5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 5,
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
  squareIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#BDC3C7',
    borderRadius: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10, // Adiciona espaço nas laterais para os botões não colarem na tela
    paddingTop: 10, // Um r
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
  imagePlaceholder: {
    width: 80,
    height: 80,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnColor: {
    backgroundColor: '#f1becb',
    borderColor: '#e77e98',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    resizeMode: 'contain',
  },
  itemText: {
    fontSize: 17,
    color: '#4E342E',
    fontWeight: '700',
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

export default DentistMenuScreen;