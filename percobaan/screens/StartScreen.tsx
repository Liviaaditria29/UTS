import {View, Text, Image} from 'react-native';
import React from 'react';
import {Link} from '@react-navigation/native';

const StartScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00171F',
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../assets/img/logo.png')}
          style={{width: 180, height: 150, marginBottom: 30}}
        />
      </View>
      <Link
        screen="Home" // Replace "to" with "screen"
        style={{
          backgroundColor: '#C67C4E',
          width: 315,
          height: 62,
          borderRadius: 16,
          padding: 18,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '600',
          }}>
          Go To App
        </Text>
      </Link>
    </View>
  );
};

export default StartScreen;
