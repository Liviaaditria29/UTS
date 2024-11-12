import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  TambahResep: {addRecipe: (newRecipe: Recipe) => void};
};

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredients: string[];
};

type TambahResepNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TambahResep'
>;
type TambahResepRouteProp = RouteProp<RootStackParamList, 'TambahResep'>;

interface TambahResepProps {
  navigation: TambahResepNavigationProp;
  route: TambahResepRouteProp;
}

const TambahResep = ({navigation, route}: TambahResepProps) => {
  const [judul, setJudul] = useState('');
  const [urlGambar, setUrlGambar] = useState('');
  const [bahan, setBahan] = useState('');
  const [langkah, setLangkah] = useState('');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);

  const handleAddIngredientAndSave = () => {
    // Memastikan bahan ditambahkan dulu sebelum membuat resep
    const newIngredients = bahan
      .split(',')
      .map(ingredient => ingredient.trim());

    if (newIngredients.length > 0) {
      setIngredientsList(prev => [...prev, ...newIngredients]);
    }

    const newRecipe: Recipe = {
      idMeal: Date.now().toString(),
      strMeal: judul,
      strMealThumb: urlGambar,
      strInstructions: langkah,
      strIngredients: [...ingredientsList, ...newIngredients], // Gabungkan bahan yang baru dengan yang lama
    };

    route.params.addRecipe(newRecipe);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.headerImage}
        />
      </View>

      {/* Input Judul */}
      <TextInput
        style={styles.input}
        placeholder="Judul Resep"
        value={judul}
        onChangeText={setJudul}
      />

      {/* Input URL Gambar */}
      <TextInput
        style={styles.input}
        placeholder="URL Gambar"
        value={urlGambar}
        onChangeText={setUrlGambar}
      />

      {/* Input Bahan */}
      <TextInput
        style={styles.input}
        placeholder="Bahan-bahan (pisahkan dengan koma)"
        value={bahan}
        onChangeText={setBahan}
      />

      {/* Daftar Bahan */}
      <FlatList
        data={ingredientsList}
        renderItem={({item}) => (
          <Text style={styles.ingredientText}>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Input Langkah-langkah */}
      <TextInput
        style={styles.input}
        placeholder="Langkah-langkah"
        value={langkah}
        onChangeText={setLangkah}
        multiline
      />

      {/* Tombol Simpan Resep */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddIngredientAndSave}>
        <Text style={styles.addButtonText}>Simpan Resep</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
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
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#1E2A39',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientText: {
    fontSize: 16,
    marginVertical: 0,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#1E2A39',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TambahResep;
