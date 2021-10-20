import React from 'react';
import {
	Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../home';
import User from '../user';


import HomeRegular from '../../assets/icons/home-regular.svg'
import MedalRegular from '../../assets/icons/medal-regular.svg'
import ChatRegular from '../../assets/icons/chat-regular.svg'
import UserRegular from '../../assets/icons/user-regular.svg'
import HomeFill from '../../assets/icons/home-fill.svg'
import MedalFill from '../../assets/icons/medal-fill.svg'
import ChatFill from '../../assets/icons/chat-fill.svg'
import UserFill from '../../assets/icons/user-fill.svg'

const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window')

const Main = () => {

  return (
      <Tab.Navigator
				screenOptions={({route}) => ({
					tabBarIcon: ({focused}) => {
						return focused ? (
							route.name == "Home"     ? <HomeFill width={28} height={28} /> : 
							route.name == "Medal"    ? <MedalFill width={28} height={28} /> : 
							route.name == "Messages" ? <ChatFill width={28} height={28} /> : 
																				 <UserFill width={28} height={28} />  
						) : (
							route.name == "Home"     ? <HomeRegular width={28} height={28} /> : 
							route.name == "Medal"    ? <MedalRegular width={28} height={28} /> : 
							route.name == "Messages" ? <ChatRegular width={28} height={28} /> : 
																				 <UserRegular width={28} height={28} />  
						)
					},
					tabBarShowLabel: false,
					tabBarStyle: {
						height: 70,
						borderTopWidth: 0,
						elevation: 30,
						paddingHorizontal: (width - 28 * 4) / 10,
					},
					showLabel: false,
					headerShown: false,
				})}
			>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Medal" component={Home} />
				<Tab.Screen name="Messages" component={Home} />
				<Tab.Screen name="User" component={Home} />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  
});

export default Main;
