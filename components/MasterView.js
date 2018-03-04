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
  old = {
      recipes:[
        {
          key: "Arroz Con Pollo",
          description: "Classic Costarrican Cuisine",
          meals: 6,
          price: 7,
          steps: [
            "Boil Chicken in water with garlic",
            "Remove chicken",
            "Cook Rice in Broth",
            "Add chicken to rice",
          ],

          ingredients: [
            {key: "Rice", amount: 2, units:"cup"},
            {key: "Chicken", amount: 3, units:"lb"},
            {key: "Garlic", amount: 1, units:"unit"},
          ],
        },
        {
          key: "Gallo Pinto",
          description: "Rice and Beans for the masses.",
          meals: 4,
          price: 3,
          steps: [
            "Cook Rice",
            "Cook Beans",
            "Combine in pan and cook with cilantro and Lizano Sauce",

          ],

          ingredients: [
            {key: "Rice", amount: 1, units:"cup"},
            {key: "Beans", amount: 1, units:"cup"},
            {key: "Cilantro", amount: 1, units:"unit"},
            {key: "Lizano", amount: 2, units:"tbsp"},
          ]
        },
        {
          key: "Fried Chicken",
          description: "Everyone's favorite.",
          meals: 4,
          price: 10,
          steps: [
            "Fry Chicken",
          ],

          ingredients: [
            {key: "Chicken", amount: 3, units:"lb"},
          ]
        },
        {
          key: "Fried Rice",
          description: "Quick and easy food.",
          meals: 4,
          price: 2,
          steps: [
            "Cook Rice",
            "Chop Garlic",
            "Fry Everything",
          ],

          ingredients: [
            {key: "Rice", amount: 2, units:"cups"},
            {key: "Garlic", amount: 2, units:"unit"},
            {key: "Canola Oil", amount: 2, units:"tsp"},
          ]
        }
      ],
    };

  constructor(props) {
    super(props);
    this.state = {
      mealcount: 0,
      price: 0,
    };
    this.state.recipes = this.old.recipes;
    // AsyncStorage.getItem('RECIPES', (err, result) => {
    //   this.state.recipes = JSON.parse(result);
    //   this.forceUpdate();
    // });
  }

  changeState = i => {
    this.setState(
      prevState => {
        let recipes = prevState.recipes.slice();
        recipes[i].state=!recipes[i].state;
        if (recipes[i].state){
          this.state.mealcount += recipes[i].meals;
          this.state.price += recipes[i].price;
        } else {
          this.state.mealcount -= recipes[i].meals;
          this.state.price -= recipes[i].price;

        }
        return { recipes: recipes };
      }
    );
  };

  addRecipes () {
    var new_recipes = [];
    var new_ingredients = [];
    for (len = this.state.recipes.length, i=0; i<len; ++i) {
      if(this.state.recipes[i].state){
        delete this.state.recipes[i].state;
        new_recipes.push(this.state.recipes[i]);
      }

      for(len2 = this.state.recipes[i].ingredients.length, j=0; j<len2; j++){
        // console.log(this.state.recipes[i].ingredients[j]);

        result = new_ingredients.findIndex( ingredient => ingredient.key ===  this.state.recipes[i].ingredients[j].key);
        if (result > -1){
          console.log(result);
          new_ingredients[result].amount += this.state.recipes[i].ingredients[j].amount;
        } else {
          new_ingredients.push(this.state.recipes[i].ingredients[j]);
        }
      }
    }
    // console.log(new_recipes);
    // console.log(new_ingredients);
    AsyncStorage.setItem('PREPLIST', JSON.stringify(new_recipes), () => {});
    AsyncStorage.setItem('SHOPPING', JSON.stringify(new_ingredients), () => {});

    alert("New recipes added");
  };

  render() {
    // AsyncStorage.setItem('RECIPES', JSON.stringify(this.old.recipes), () => {});

    return (
      <View style={styles.container}>

      <Text style={styles.header}>Your Recipes</Text>
      <Text>Meal Count: {this.state.mealcount}</Text>
      <Text>Total Price: ${this.state.price}</Text>
      <FlatList
        style={styles.list}
        data={this.state.recipes}
        renderItem={({ item, index }) =>
          <View>
            <View style={styles.listElementCont}>
              <Text style={styles.listElement}>
                {item.key}
              </Text>
              <Button
              title={item.state ? "+":"-"}
              color = {item.state ? "#27d800":"#ff0000"}
              onPress={() => this.changeState(index)} />
            </View>
            <View style={styles.hr} />
          </View>}
      />
      <Button
        title="Add Recipes"
        color ="blue"
        onPress={() => this.addRecipes()}
      />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
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
