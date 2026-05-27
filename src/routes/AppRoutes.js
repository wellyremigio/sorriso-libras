import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ChildMenuScreen from '../screens/menuProfile/ChildMenuScreen';
import DentistMenuScreen from '../screens/menuProfile/DentistMenuScreen';
import CaregiverMenuScreen from '../screens/menuProfile/CaregiverMenuScreen';
import ChildLessonScreen from '../screens/lessons/ChildLessonScreean';
import WeeklyGoalsScreen from '../screens/goals/WeeklyGoalsScreen';
import AdultLessonScreen from '../screens/lessons/AdultLessonScreen';
import StickerGalleryScreen from '../screens/goals/StickerGalleryScreen';
import StickerAchievementScreen from '../screens/goals/StickerAchievementScreen';

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
            <Stack.Screen
                name="CaregiverMenu"
                component={CaregiverMenuScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="ChildLesson"
                component={ChildLessonScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="WeeklyGoals"
                component={WeeklyGoalsScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="AdultLesson"
                component={AdultLessonScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="StickerGallery"
                component={StickerGalleryScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="StickerAchievementScreen"
                component={StickerAchievementScreen}
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
        </Stack.Navigator>
    );
};

export default AppRoutes;