import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type RootDrawerParamList = {
  Home: undefined;
  DetailResep: {recipe: Recipe};
  EditResep: {recipe: Recipe};
};

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
};

type DetailResepRouteProp = RouteProp<RootDrawerParamList, 'DetailResep'>;
type DetailResepNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  'DetailResep'
>;

export interface DetailProps {
  route: DetailResepRouteProp;
  navigation: DetailResepNavigationProp;
}

const DetailResep = ({route, navigation}: DetailProps) => {
  const {recipe} = route.params;

  const ingredientsWithMeasurements = Object.keys(recipe)
    .filter(
      key => key.startsWith('strIngredient') && recipe[key as keyof Recipe],
    )
    .map((key, index) => {
      const ingredient = recipe[key as keyof Recipe];
      const measure = recipe[`strMeasure${index + 1}` as keyof Recipe];
      return `${measure ? measure : ''} ${ingredient}`.trim();
    });

  const instructions = recipe.strInstructions
    .split('.')
    .map(step => step.trim())
    .filter(step => step.length > 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.headerImage}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: recipe.strMealThumb}}
            style={styles.recipeImage}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.strMeal}</Text>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredientsWithMeasurements.map((item, index) => (
            <Text key={index} style={styles.ingredient}>
              {item}
            </Text>
          ))}

          <Text style={styles.sectionTitle}>Instructions</Text>
          {instructions.map((step, index) => (
            <Text key={index} style={styles.instructionStep}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditResep', {recipe: {} as Recipe})
          }>
          <Image
            source={require('../../assets/img/Edit.png')}
            style={styles.editImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DeleteResep', {recipe: {} as Recipe})
          }>
          <Image
            source={require('../../assets/img/Delete.png')}
            style={styles.deleteImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  scrollContent: {padding: 20},
  header: {
    backgroundColor: '#1E2A39',
    paddingVertical: 20,
    alignItems: 'center',
    height: 75,
  },
  headerImage: {
    width: 85,
    height: 65,
    bottom: 13,
  },
  imageContainer: {alignItems: 'center', marginBottom: 20},
  recipeImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  content: {paddingHorizontal: 10},
  title: {fontSize: 24, fontWeight: 'bold', textAlign: 'center'},
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  ingredient: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  instructionStep: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    height: 65,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: 'rgba(204, 204, 204, 0.5)',
  },
  editImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    top: -8,
    left: 80,
  },
  deleteImage: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    bottom: 50,
    left: 310,
  },
});

export default DetailResep;
