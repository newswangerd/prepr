import React from 'react';
import { AsyncStorage, StyleSheet, FlatList, Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'This Week\'s Recipes',
  };


  old = {
      recipes:[
        {
          visible: false,
          key: "Recipe 1",
          description: "Recipe McRecipeFace",
          meals: 6,
          steps: [
            "step 1",
            "step 2",
            "step 3",
          ],

          ingredients: [
            {key: "ingredient 1", amount: 1, units:"cup"},
            {key: "ingredient 2", amount: 1, units:"tsp"},
            {key: "ingredient 3", amount: 1, units:"tbsp"},
            {key: "ingredient 4", amount: 1, units:"unit"},
          ],
        },
        {
          visible: false,
          key: "Recipe 2",
          description: "Fried Rice McBurgerLiege",
          meals: 2,
          steps: [
            "step 1",
            "step 2",
          ],

          ingredients: [
            {key: "ingredient 1", amount: 1, units:"cup"},
            {key: "ingredient 2", amount: 1, units:"tsp"},

          ]
        }
      ],
    };

  constructor(props) {
    super(props);
    this.state = { };
    AsyncStorage.getItem('PREPLIST', (err, result) => {
      this.state.recipes = JSON.parse(result);
      // console.log(result);
      this.forceUpdate();
    });
  }

  render() {
    // AsyncStorage.setItem('PREPLIST', JSON.stringify(this.old.recipes), () => {});
    // console.log(this.state.recipes);
    return (
      <View>
        <FlatList
        data={this.state.recipes}
          renderItem={({item, index}) =>
            <View style={styles.item}>
              <Text style={styles.item, styles.lesserHeader}>{item.key}</Text>
              <Text >{item.description}</Text>
              <Text >Number of Meals: {item.meals}</Text>
              <Button
                title=">>"
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate('Details',{recipe: item});
                }}
              />
              <View style={styles.hr} />
            </View>
        }
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const recipe = params ? params.recipe : null;

    return (
      <View style={styles.container}>
      <Text style={styles.header}>{recipe.key}</Text>
      <FlatList
        keyExtractor={(item, index) => index}
        data={recipe.steps}
        renderItem={({item, index}) =>
          <View>
            <View style={styles.listItemCont}>
              <Text style={styles.item}>{item}</Text>
            </View>
            <View style={styles.hr} />
          </View>
        }
      />
      </View>

    );
  }
}


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
  },

  lesserHeader: {
    fontSize: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },

  item: {
    padding: 10,
  },

  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  hr: {
    height: 1,
    backgroundColor: "gray"
  },
});
