import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {


  render() {
    recipes = [
      {
        name: "Recipe 1",
        description: "what is the recipe good for?",
        meals: 6,
        steps: [
          "step 1",
          "step 2",
          "step 3",
        ],

        ingredients: [
          {name: "ingredient 1", amount: 1, units:"cup"},
          {name: "ingredient 2", amount: 1, units:"tsp"},
          {name: "ingredient 3", amount: 1, units:"tbsp"},
          {name: "ingredient 4", amount: 1, units:"unit"},
        ],
      },
      {
        name: "Recipe 2",
        description: "what is the recipe good for?",
        meals: 6,
        steps: [
          "step 1",
          "step 2",
        ],

        ingredients: [
          {name: "ingredient 1", amount: 1, units:"cup"},
          {name: "ingredient 2", amount: 1, units:"tsp"},

        ]
      }
    ];

    shopping = [
      {name: "ingredient 1", amount: 2, units:"cup"},
      {name: "ingredient 2", amount: 2, units:"tsp"},
      {name: "ingredient 3", amount: 1, units:"tbsp"},
      {name: "ingredient 4", amount: 1, units:"unit"},
    ];

    prepping = [
      {
        name: "Recipe1",
        steps: [
          "step 1",
          "step 2",
          "step 3",
        ],
      },
      {
        name: "Recipe2",
        steps: [
          "step 1",
          "step 2",
        ],
      }
    ];

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
