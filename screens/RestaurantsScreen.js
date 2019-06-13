import React from 'react';
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import {
  Alert, AsyncStorage, BackHandler, FlatList, Picker, Platform,
  ScrollView,
  StyleSheet, Text, View
} from "react-native";
import { createStackNavigator } from 'react-navigation';
import { Root, Toast } from "native-base";
import { Constants } from "expo";

class ListScreen extends React.Component {
  constructor(inProps) {
    super(inProps);
    this.state = { listData: [] };
  }

  render() {
    console.log('Listing: ', this.state.listData);
    return (
      <Root>
        <View style={styles.listScreenContainter} >
          <CustomButton text={"Add Restaurant"} width={'94%'}
            onPress={() => { this.props.navigation.navigate('AddScreen'); }} />
          <FlatList style={styles.restaurantList} data={this.state.listData}
            renderItem={(item) => {
              <View style={styles.restaurantContainer}>
                <Text style={styles.restaurantName} >{item.name}</Text>
                <CustomButton text={'Delete'}
                  onPress={() => {
                    Alert.alert('Please confirm',
                      'Are you sure you want to delete this restaurant?',
                      [
                        {
                          text: 'Yes',
                          onPress: () => {
                            AsyncStorage.getItem('restaurants',
                              function (inError, inRestaurants) {
                                if (inRestaurants === null) {
                                  inRestaurants = [];
                                } else {
                                  inRestaurants = JSON.parse(inRestaurants);
                                }

                                for (let i = 0; i < inRestaurants.length; ++i) {
                                  const restaurant = inRestaurants[i];
                                  if (restaurant.key === item.key) {
                                    inRestaurants.splice(i, 1);
                                    break;
                                  }
                                }

                                AsyncStorage.setItem('restaurants', JSON.stringify(inRestaurants),
                                  function () {
                                    this.setState({ listData: inRestaurants });
                                    Toast.show({
                                      text: 'Restaurant deleted', position: 'bottom',
                                      type: 'danger', duration: 2000
                                    });
                                  }.bind(this)
                                );

                              }.bind(this));
                          }
                        },
                        { text: 'No' }, { text: 'Cancel', style: 'cancel' }],
                      { cancelable: true }
                    )
                  }} />
              </View>
            }} />

        </View>
      </Root>
    )
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => { return true })
    AsyncStorage.getItem('restaurants', function (inError, inRestaurants) {
      if (inRestaurants === null) {
        inRestaurants = [];
      } else {
        inRestaurants = JSON.parse(inRestaurants);
      }
      this.setState({ listData: inRestaurants });
    }.bind(this));
  }
};


class AddScreen extends React.Component {
  constructor(inProps) {
    super(inProps);
    this.state = {
      name: '',
      cuisine: '',
      price: '',
      rating: '',
      phone: '',
      address: '',
      webSite: '',
      delivery: '',
      key: `r_${new Date().getTime()}`
    }
  }

  render() {
    return (
      <ScrollView style={styles.addScreenContainer}>
        <View style={styles.addScreenInnerContainer}>
          <View style={styles.addScreenFormContainer}>
            <CustomTextInput label='Name' maxLength={25}
              stateHolder={this} stateFieldName='name' />
            <Text style={styles.fieldLabel}>Cuisine</Text>
            <View style={styles.pickerContainer}>
              <Picker styles={styles.picker} prompt='Cuisine'
                selectedValue={this.state.cuisine}
                onValueChange={(inItemName) => this.setState({ cuisine: inItemName })}
              >
                <Picker.Item label='' value='' />
                <Picker.Item label='Algerian' value='Algerian' />
                <Picker.Item label='American' value='American' />
                <Picker.Item label='Bulgarian' value='Bulgarian' />
                <Picker.Item label='Chinese' value='Chinese' />
                <Picker.Item label='Greek' value='Greek' />
                <Picker.Item label='Romanian' value='Romanian' />
                <Picker.Item label='Turkish' value='Turkish' />
              </Picker>
            </View>
            <Text style={styles.fieldLabel}>Price</Text>
            <View style={styles.pickerContainer}>
              <Picker styles={styles.picker} prompt='Price'
                selectedValue={this.state.price}
                onValueChange={(inItemName) => this.setState({ price: inItemName })}
              >
                <Picker.Item label='' value='' />
                <Picker.Item label='1' value='1' />
                <Picker.Item label='2' value='2' />
                <Picker.Item label='3' value='3' />
                <Picker.Item label='4' value='4' />
                <Picker.Item label='5' value='5' />
              </Picker>
            </View>

            <Text style={styles.fieldLabel}>Rating</Text>
            <View style={styles.pickerContainer}>
              <Picker styles={styles.picker} prompt='Rating'
                selectedValue={this.state.rating}
                onValueChange={(inItemName) => this.setState({ rating: inItemName })}
              >
                <Picker.Item label='' value='' />
                <Picker.Item label='1' value='1' />
                <Picker.Item label='2' value='2' />
                <Picker.Item label='3' value='3' />
                <Picker.Item label='4' value='4' />
                <Picker.Item label='5' value='5' />
              </Picker>
            </View>

            <CustomTextInput label='Phone Number' maxLength={20}
              stateHolder={this} stateFieldName={'phone'} />

            <CustomTextInput label='Address' maxLength={30}
              stateHolder={this} stateFieldName={'address'} />

            <CustomTextInput label='Website' maxLength={30}
              stateHolder={this} stateFieldName={'webSite'} />

            {/* Does the restaurant have delivery or not */}
            <Text style={styles.fieldLabel}>Delivery?</Text>
            <View style={styles.pickerContainer}>
              <Picker style={styles.picker} prompt="Delivery?"
                selectedValue={this.state.delivery}
                onValueChange={(inItemValue) => this.setState({
                  delivery:
                    inItemValue
                })}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>

            <View style={styles.addScreenButtonsContainer}>
              <CustomButton text="Add" width="44%"
                onPress={() => {
                  AsyncStorage.getItem('restaurants', function (inError, inRestaurants) {
                    if (inRestaurants === null) {
                      inRestaurants = []
                    } else {
                      inRestaurants = JSON.parse(inRestaurants);
                    }
                    inRestaurants.push(this.state);
                    console.log(this.state);
                    AsyncStorage.setItem('restaurants', JSON.stringify(inRestaurants),
                      function () {
                        this.props.navigation.navigate('ListScreen');
                      }.bind(this));
                  }.bind(this));
                }} />
              <CustomButton text="Cancel" width="44%"
                onPress={() => { this.props.navigation.navigate('ListScreen'); }} />
            </View>

          </View>
        </View>

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  listScreenContainter: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    ...Platform.select({
      ios: { paddingTop: Constants.statusBarHeight },
      android: {}
    })
  },
  restaurantList: { width: '94%' },
  restaurantContainer: {
    flexDirection: 'row', marginTop: 4,
    marginBottom: 4,
    borderColor: '#e0e0e0', borderBottomWidth: 2, alignItems: 'center'
  },
  restaurantName: { flex: 1 },
  addScreenContainer: { marginTop: Constants.statusBarHeight },
  addScreenInnerContainer: {
    flex: 1, alignItems: "center", paddingTop:
      20, width: "100%"
  },
  addScreenFormContainer: { width: "96%" },
  fieldLabel: { marginLeft: 10 },
  pickerContainer: {
    ...Platform.select({
      ios: {},
      android: {
        width: '96%',
        borderRadius: 8,
        borderColor: 'c0c0c0',
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 4
      }
    })
  },
  picker: {
    ...Platform.select({
      ios: {
        width: "96%", borderRadius: 8, borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10, marginBottom: 20, marginTop: 4
      },
      android: {}
    })
  },
  addScreenButtonsContainer: {
    flexDirection: "row", justifyContent:
      "center"
  }
});

const RestaurantsScreen = createStackNavigator(
  {
    ListScreen: { screen: ListScreen },
    AddScreen: { screen: AddScreen }
  },
  {
    headerMode: 'none',
    initialRouteName: 'ListScreen'
  }
);

export default RestaurantsScreen;
