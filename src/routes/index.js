import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Sell from '../pages/Sell';
import StackRoutes from './StackRoutes';

const Drawer = createDrawerNavigator();

function Routes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerStyle:{
          backgroundColor: '#090E0E',
          paddingTop: 20,
        },

        drawerActiveBackgroundColor: '#E72F49',
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#FFF'
      }}
    >
      <Drawer.Screen 
        name="HomeDrawer" 
        component={StackRoutes} 
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons 
              name={focused ? 'car' : 'car-side'} 
              size={size} 
              color={color} 
            />
          )

        }}
      />
      <Drawer.Screen 
        name="Sell" 
        component={Sell} 
        options={{
          title: "Carros á venda",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons 
              name={ focused ? 'archive' : 'archive-outline'}
              size={size} 
              color={color} 
            />
          )
        }}
      />
    </Drawer.Navigator>
  )
}

export default Routes;