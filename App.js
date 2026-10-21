import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import AppRoutes from './src/routes/AppRoutes';
import linking from './src/routes/linking';

const App = () => {
  return (
    <NavigationContainer linking={Platform.OS === 'web' ? linking : undefined}>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default App;
