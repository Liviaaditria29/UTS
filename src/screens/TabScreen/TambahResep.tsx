import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const TambahResep = ({navigation}: any) => {
  const [judul, setJudul] = useState('');
  const [bahan, setBahan] = useState('');
  const [langkah, setLangkah] = useState('');

  const handleTambahResep = () => {
    const newRecipe = {
      idMeal: String(Date.now()),
      strMeal: judul,
      strMealThumb: '',
      strInstructions: langkah,
      strIngredient1: bahan,
    };
    console.log('Resep baru:', newRecipe);
    // Navigate back to Home and pass the new recipe
    navigation.navigate('Home', {newRecipe});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.headerImage}
        />
      </View>

      <TouchableOpacity style={styles.imageContainer}>
        <TextInput
          style={styles.imageInput}
          placeholder="Tambah Gambar"
          placeholderTextColor="#999"
          editable={false}
        />
        <Image
          source={require('../../assets/img/input-gambar.png')}
          style={styles.addImageIcon}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Judul"
        placeholderTextColor="#999"
        value={judul}
        onChangeText={setJudul}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Bahan-bahan"
        placeholderTextColor="#999"
        value={bahan}
        onChangeText={setBahan}
        multiline
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Langkah-langkah"
        placeholderTextColor="#999"
        value={langkah}
        onChangeText={setLangkah}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleTambahResep}>
        <Text style={styles.buttonText}>Tambah</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 0,
  },
  header: {
    backgroundColor: '#1E2A39',
    paddingVertical: 20,
    alignItems: 'center',
    height: 75,
    width: '100%',
  },
  headerImage: {
    width: 85,
    height: 65,
    bottom: 13,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },
  imageInput: {
    flex: 1,
    fontSize: 16,
    color: '#999',
  },
  addImageIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1E2A39',
    paddingVertical: 15,
    borderRadius: 30, 
    alignItems: 'center',
    margin: 20,
    height: 60,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    top: 2,
  },
});

export default TambahResep;
