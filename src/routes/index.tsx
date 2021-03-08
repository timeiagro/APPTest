import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { StackScreen } from '../config';

const Stack = createStackNavigator();

import Home from '../pages/Home';
import Extrato from '../pages/Extrato';
import Despesa from '../pages/Despesa';
import Receita from '../pages/Receita'; 

export default function App() {
	return (
		<NavigationContainer >
			<Stack.Navigator initialRouteName="App">
                
                <Stack.Screen 
                    name="Home" 
                    component={ Home } 
                    options={{ headerShown: false }} 
                />

                <Stack.Screen 
                    name="Receita" 
                    component={ Receita } 
                    options={{ 
                        ...StackScreen as StackNavigationOptions
                    }} 
                />

                <Stack.Screen 
                    name="Despesa" 
                    component={ Despesa } 
                    options={{ 
                        ...StackScreen as StackNavigationOptions
                    }} 
                />

                <Stack.Screen 
                    name="Extrato" 
                    component={ Extrato } 
                    options={{ 
                        ...StackScreen as StackNavigationOptions
                    }} 
                />

				
			</Stack.Navigator>
		</NavigationContainer>
	);
  }