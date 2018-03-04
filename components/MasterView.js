import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform
} from "react-native";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;


export default class App extends React.Component {
  state = {
    tasks: [],
    text: ""
  };
  changeTextHandler = text => {
    this.setState({ text: text });
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text ,state:false}),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };
  changeState = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks[i].state=!tasks[i].state;
        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };
  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }
  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
      <Text style={styles.header}>Shopping</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={this.changeTextHandler}
        onSubmitEditing={this.addTask}
        value={this.state.text}
        placeholder="Add Tasks"
        returnKeyType="done"
        returnKeyLabel="done"
      />
      <FlatList
        style={styles.list}
        data={this.state.tasks}
        renderItem={({ item, index }) =>
          <View>
            <View style={styles.listElementCont}>
              <Text style={styles.listElement}>
                {item.text}
              </Text>
              <Button
              title={item.state ? "+":"-"}
              color = {item.state ? "#27d800":"#ff0000"}
              onPress={() => this.changeState(index)} />
            </View>
            <View style={styles.hr} />
          </View>}
      />
      </View>
    );
  }
}



let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listElement: {
    justifyContent: 'center',
    // paddingTop: 5,
    // paddingBottom: 5,
    fontSize: 18
  },
  header:{
    fontSize:20
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listElementCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    fontSize: 18,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});
