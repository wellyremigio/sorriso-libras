import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ChildMenuScreen = ({ navigation }) => {

  const menuItems = [
    {
      id: '1',
      title: 'Como escovar os dentes e usar fio dental de forma correta',
      image: require('../../assets/tooth_dental_menu_child.png'),
    },
    {
      id: '2',
      title: 'Uso de fio dental na infância',
      image: require('../../assets/dental_floss_menu_child.png'),
    },
    {
      id: '3',
      title: 'Alimentos saudáveis para os dentes e que fazem mal para os dentes',
      image: require('../../assets/food_menu_child.png'),
    },
    {
      id: '4',
      title: 'Creme dental ideal e quantidade de creme dental',
      image: require('../../assets/dental_pasta_menu_child.png'),
    },
    {
      id: '5',
      title: 'Como escolher a escova adequada e realizar a troca da escova',
      image: require('../../assets/toothbrush_menu_child.png'),
    },
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
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#F0E4E7',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imageContainer: {
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

export default ChildMenuScreen;