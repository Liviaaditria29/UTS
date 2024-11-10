import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DetailResep from '../screens/TabScreen/DetailResep'; // Import the screen
import Home from '../screens/TabScreen/Home';
import EditResep from '../screens/TabScreen/Edit';
import TambahResep from '../screens/TabScreen/TambahResep';

type RootDrawerParamList = {
  Home: undefined;
  DetailResep: {recipe: Recipe};
  EditResep: {recipe: Recipe};
  TambahResep: {recipe: Recipe};
};

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  // ... other ingredients
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="DetailResep"
        component={DetailResep}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="EditResep"
        component={EditResep}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="TambahResep"
        component={TambahResep}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
