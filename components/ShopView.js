import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class App extends React.Component {

  shopFocusSubscription = this.props.navigation.addListener(
    'didFocus',
    payload => {
      console.log('loaded');
      this.loadData();
    }
  );

  deleteTask = i => {
    this.setState(
      prevState => {
        let shopping = prevState.shopping.slice();
        shopping.splice(i, 1);
        AsyncStorage.setItem('SHOPPING', JSON.stringify(shopping), () => {});

        return { shopping: shopping };
      }
    );
  };

  loadData() {
    AsyncStorage.getItem('SHOPPING', (err, result) => {
      this.state.shopping = JSON.parse(result);
      this.forceUpdate();
    });
  }

  constructor(props) {
    super(props);
    this.state = { };
    this.loadData();
  }



  render() {
    // AsyncStorage.setItem('SHOPPING', JSON.stringify(this.state.shopping), () => {});

    return (
      <View style={styles.container}>
      <Text style={styles.header}>Shopping</Text>
      <FlatList
      data={this.state.shopping}
      renderItem={({item, index}) =>
      <View>
        <View style={styles.listItemCont}>
          <Text style={styles.item}>{item.key}: {item.amount} {item.units}</Text>
          <Button title="X" onPress={() => this.deleteTask(index)} />
        </View>
        <View style={styles.hr} />
      </View>
      }
      />

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
  },

  hr: {
    height: 1,
    backgroundColor: "gray"
  },

  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
});
