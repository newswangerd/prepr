import React from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {
  deleteTask = i => {
    this.setState(
      prevState => {
        let shopping = prevState.shopping.slice();

        shopping.splice(i, 1);

        return { shopping: shopping };
      }
    );
  };

  state = {
    shopping: [
      {key: "ingredient 1", amount: 2, units:"cup"},
      {key: "ingredient 2", amount: 2, units:"tsp"},
      {key: "ingredient 3", amount: 1, units:"tbsp"},
      {key: "ingredient 4", amount: 1, units:"unit"},
    ],
  };

  render() {


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

// let Tasks = {
//   convertToArrayOfObject(tasks, callback) {
//     return callback(
//       tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
//     );
//   },
//   convertToStringWithSeparators(tasks) {
//     return tasks.map(task => task.text).join("||");
//   },
//   all(callback) {
//     return AsyncStorage.getItem("TASKS", (err, tasks) =>
//       this.convertToArrayOfObject(tasks, callback)
//     );
//   },
//   save(tasks) {
//     AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
//   }
// };

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
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
});
