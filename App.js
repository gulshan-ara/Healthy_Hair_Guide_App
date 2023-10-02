// import necessary libraries and components
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import HomeScreen from './screens/HomePage';
import HairHacks from './screens/HairHacks';
import CustomHome from './screens/CustomHome';
import CustomRoutine from './screens/CustomRoutine';
import HairHacksList from './screens/HairHacksList';
import ExploreScreen from './screens/ExploreScreen';
import Notes from './screens/Notes';
import Profile from './screens/Profile';
import GrowthRecord from './screens/GrowthRecord';
import UserAuthenticationScreen from './screens/AuthenticationScreen';

// navigation variable
const Stack = createStackNavigator();

// In this function, we're setting up the navigation between screens
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen name="Hair Hacks" component={HairHacks} />
        <Stack.Screen name="HairHacksList" component={HairHacksList} />
        <Stack.Screen name="Authentication" component={UserAuthenticationScreen} />
        <Stack.Screen name="Hair Quiz" component={CustomHome} />
        <Stack.Screen name="CustomRoutine" component={CustomRoutine} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Hair Journal" component={Notes}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Growth Record" component={GrowthRecord}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
