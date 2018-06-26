import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import Home from './components/Home';
import CreatePost from './components/CreatePost';

const RootStack = createStackNavigator({
  Register: {
    screen: RegisterUser
  },
  Login: {
    screen: LoginUser
  },
  Home: {
    screen: Home
  },
  Post: {
    screen: CreatePost
  }
}, {
  initialRouteName: 'Login'
})

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}