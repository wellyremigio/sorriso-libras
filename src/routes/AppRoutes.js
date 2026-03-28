import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ChildMenuScreen from '../screens/menuProfile/ChildMenuScreen';
import DentistMenuScreen from '../screens/menuProfile/DentistMenuScreen';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChildMenu"
                component={ChildMenuScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="DentistMenu"
                component={DentistMenuScreen}
                options={{ 
                    headerShown: false, 
                    animation: 'slide_from_right' 
                }}
            />
        </Stack.Navigator>
    );
};

export default AppRoutes;