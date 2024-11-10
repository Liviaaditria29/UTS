import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  DetailResep: {recipe: Recipe};
  TambahResep: {recipe: Recipe};
};

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

const Home = ({navigation}: HomeProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => {
        setRecipes(response.data.meals);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch recipes');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => setLoading(true)}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.headerImage}
        />
      </View>

      <View style={styles.banner}>
        <Image
          source={require('../../assets/img/banner.png')}
          style={styles.bannerImage}
        />
        <Image
          source={require('../../assets/img/image-banner.png')}
          style={styles.judulBanner}
        />
      </View>

      <FlatList
        data={recipes}
        numColumns={2}
        key={'2-columns'}
        keyExtractor={item => item.idMeal}
        renderItem={({item}) => (
          <View style={styles.recipeCard}>
            <Image source={{uri: item.strMealThumb}} style={styles.image} />
            <Text style={styles.recipeTitle}>{item.strMeal}</Text>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => navigation.navigate('DetailResep', {recipe: item})}>
              <Image
                source={require('../../assets/img/panah.png')}
                style={styles.arrowImage}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TambahResep', {recipe: {} as Recipe})
          }>
          <Image
            source={require('../../assets/img/addButton.jpg')}
            style={styles.addImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  header: {
    backgroundColor: '#1E2A39',
    paddingVertical: 20,
    alignItems: 'center',
    height: 75,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  headerImage: {
    width: 85,
    height: 65,
    bottom: 13,
  },
  banner: {
    marginVertical: 10,
    height: 150,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  bannerImage: {
    width: 100,
    height: 130,
    resizeMode: 'cover',
    position: 'absolute',
    top: 15,
    left: 20,
  },
  judulBanner: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    position: 'absolute',
    left: 95,
    top: 20,
  },
  recipeCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    padding: 0,
    borderRadius: 10,
    elevation: 3,
    height: 230,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '60%',
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    left: 20,
  },
  arrowButton: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    padding: 10,
  },
  arrowImage: {
    width: 40,
    height: 35,
    resizeMode: 'contain',
  },
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    height: 65,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: 'rgba(204, 204, 204, 0.5)',
  },
  addImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    top: -12,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Home;
