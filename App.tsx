import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Home, Heart, BookOpen, Settings, Music, MoreHorizontal } from "lucide-react-native";

// Import screens
import HomeScreen from "./src/app/screens/HomeScreen";
import HymnsScreen from "./src/app/screens/HymnsScreen";
import FavoritesScreen from "./src/app/screens/FavoritesScreen";
import ResourcesScreen, { OrderOfServiceScreen, AnnouncementsScreen, OfferingTitheScreen, ContactUsScreen, PrayerRequestScreen } from "./src/app/screens/ResourcesScreen";
import { BibleListScreen, BibleChaptersScreen, BibleVersesScreen } from "./src/app/screens/BibleScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export type TabParamList = {
  Home: undefined;
  Hymns: undefined;
  Bible: undefined;
  Favorites: undefined;
  More: undefined;
};

import HymnDetailScreen from "./src/app/screens/HymnDetailScreen";

function HymnsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HymnsList" component={HymnsScreen} />
      <Stack.Screen name="HymnDetail" component={HymnDetailScreen} />
    </Stack.Navigator>
  );
}

const BibleStack = createNativeStackNavigator();

function BibleStackNavigator() {
  return (
    <BibleStack.Navigator screenOptions={{ headerShown: false }}>
      <BibleStack.Screen name="BibleList" component={BibleListScreen} />
      <BibleStack.Screen name="BibleChapters" component={BibleChaptersScreen} />
      <BibleStack.Screen name="BibleVerses" component={BibleVersesScreen} />
    </BibleStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ size }) => {
          switch (route.name) {
            case "Home":
              return <Home size={size} color="#FFFFFF" />;
            case "Hymns":
              return <Music size={size} color="#FFFFFF" />;
            case "Bible":
              return <BookOpen size={size} color="#FFFFFF" />;
            case "Favorites":
              return <Heart size={size} color="#FFFFFF" />;
            case "More":
              return <MoreHorizontal size={size} color="#FFFFFF" />;
            default:
              return null;
          }
        },
        tabBarLabel: ({ focused, color, children }: { focused: boolean; color: string; children: React.ReactNode }) => (
          React.createElement(require('react-native').Text, {
            style: {
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: 13,
              textAlign: 'center',
              backgroundColor: focused ? 'rgba(0,0,0,0.15)' : 'transparent',
              borderRadius: 12,
              paddingHorizontal: focused ? 12 : 0,
              paddingVertical: focused ? 4 : 0,
            }
          }, children)
        ),
        tabBarStyle: {
          backgroundColor: "#1D6FFF",
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          height: 60, // Increased height for blue card
          position: 'absolute',
          overflow: 'hidden',
          marginBottom: 8, // Reduce space from the bottom
          left: 10,
          right: 10,
          paddingTop: 10,
          paddingBottom: 10, // Add padding to the bottom of the tab bar
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Hymns" component={HymnsStack} />
      <Tab.Screen name="Bible" component={BibleStackNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="More" component={MoreStack} />
    </Tab.Navigator>
  );
}
// Stack for More tab
import { createNativeStackNavigator as createStackNavigator } from "@react-navigation/native-stack";
const MoreStackNav = createStackNavigator();

function MoreStack() {
  return (
    <MoreStackNav.Navigator screenOptions={{ headerShown: true }}>
      <MoreStackNav.Screen name="ResourcesMain" component={ResourcesScreen} options={{ title: "More" }} />
      <MoreStackNav.Screen name="OrderOfService" component={OrderOfServiceScreen} options={{ title: "Order of Service" }} />
      <MoreStackNav.Screen name="Announcements" component={AnnouncementsScreen} options={{ title: "Announcements" }} />
      <MoreStackNav.Screen name="OfferingTithe" component={OfferingTitheScreen} options={{ title: "Offering & Tithe" }} />
      <MoreStackNav.Screen name="ContactUs" component={ContactUsScreen} options={{ title: "Contact Us" }} />
      <MoreStackNav.Screen name="PrayerRequest" component={PrayerRequestScreen} options={{ title: "Send a Prayer Request" }} />
    </MoreStackNav.Navigator>
  );

}

export default function App() {
  return (
    // gesture root view doesn't declare `children` in its prop types, so
    // TS complains. use ts-ignore since casting style alone isn't enough.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: children prop is missing from @types/react-native-gesture-handler
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
