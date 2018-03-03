import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {


  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.header}>Shopping</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  item: {
    padding: 10,
  }
});
