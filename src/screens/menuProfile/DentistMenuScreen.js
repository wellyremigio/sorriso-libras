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
      source={require('../../assets/imagem_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
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
              style={[styles.menuItem, styles.btnColor]}
              onPress={() => navigation.navigate('ChildLesson', {
                menuItems: menuItems,
                initialIndex: index,
              })}
            >
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.itemImage} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.title}</Text>
              </View>
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
    backgroundColor: 'transparent',
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
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8D4D8',
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    marginHorizontal: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#F3E5F5',
    alignItems: 'center',
    marginBottom: 25,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderRadius: 25,
    paddingHorizontal: 1,
    borderWidth: 2,
    borderBottomWidth: 6,
    paddingVertical: 8,
    marginBottom: 16,
    borderColor: 'rgba(255, 255, 255, 0.4)', // Reflexo claro na borda superior
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnColor: {
    backgroundColor: '#74C4CD',
    borderBottomColor: '#50A2AC',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
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