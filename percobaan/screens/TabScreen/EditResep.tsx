import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  DetailResep: {recipe: Recipe; updateRecipe: (updatedRecipe: Recipe) => void};
  EditResep: {recipe: Recipe; updateRecipe: (updatedRecipe: Recipe) => void};
};

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
};

type EditResepRouteProp = RouteProp<RootStackParamList, 'EditResep'>;
type EditResepNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditResep'
>;

interface EditResepProps {
  route: EditResepRouteProp;
  navigation: EditResepNavigationProp;
}

const EditResep = ({route, navigation}: EditResepProps) => {
  const {recipe, updateRecipe} = route.params;
  const [updatedRecipe, setUpdatedRecipe] = useState<Recipe>(recipe);

  const handleSave = () => {
    updateRecipe(updatedRecipe);
    navigation.goBack();
  };

  // Combine ingredients with measurements into a more structured format
  const ingredientsWithMeasurements = [
    {
      ingredient: updatedRecipe.strIngredient1,
      measure: updatedRecipe.strMeasure1,
    },
    {
      ingredient: updatedRecipe.strIngredient2,
      measure: updatedRecipe.strMeasure2,
    },
    {
      ingredient: updatedRecipe.strIngredient3,
      measure: updatedRecipe.strMeasure3,
    },
  ];

  // Handle ingredient changes
  const handleIngredientChange = (index: number, text: string) => {
    const newIngredients = [...ingredientsWithMeasurements];
    if (index === 0) {
      updatedRecipe.strIngredient1 = text;
    } else if (index === 1) {
      updatedRecipe.strIngredient2 = text;
    } else {
      updatedRecipe.strIngredient3 = text;
    }
    setUpdatedRecipe({...updatedRecipe});
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.headerImage}
        />
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          value={updatedRecipe.strMeal}
          onChangeText={text =>
            setUpdatedRecipe({...updatedRecipe, strMeal: text})
          }
        />
        <Text style={styles.label}>Ingredients</Text>
        {ingredientsWithMeasurements.map((item, index) => (
          <View key={index}>
            <TextInput
              style={styles.input}
              value={item.ingredient}
              onChangeText={text => handleIngredientChange(index, text)}
              placeholder={`Ingredient ${index + 1}`}
            />
            <TextInput
              style={styles.input}
              value={item.measure}
              onChangeText={text =>
                setUpdatedRecipe({
                  ...updatedRecipe,
                  [`strMeasure${index + 1}`]: text,
                })
              }
              placeholder={`Measurement ${index + 1}`}
            />
          </View>
        ))}

        <Text style={styles.label}>Instructions</Text>
        <TextInput
          style={styles.input}
          value={updatedRecipe.strInstructions}
          multiline
          onChangeText={text =>
            setUpdatedRecipe({...updatedRecipe, strInstructions: text})
          }
        />
        <Button title="Save Changes" onPress={handleSave} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
});

export default EditResep;
