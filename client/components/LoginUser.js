import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import SocialMedia from '../store';
import { observer } from 'mobx-react/native';

@observer
class LoginUser extends Component {
  static navigationOptions = {
    title: 'Login'
  }

  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      
      if (value) {
        this.props.navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  }


  componentDidMount() {
    this.getToken();
  }

  handleOnChange = (input) => (text) => {
    input === 'email' ? SocialMedia.user.email = text : SocialMedia.user.password = text;
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    SocialMedia.loginUser();
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={ styles.box }>
        <TextInput
          style={{ width: 350, height: 50 }}
          placeholder="Email"
          value={ SocialMedia.user.email }
          onChangeText={ this.handleOnChange('email').bind(this) }
        />
        <TextInput
          style={{ width: 350, height: 50 }}
          placeholder="Password"
          secureTextEntry={ true }
          value={ SocialMedia.user.password }
          onChangeText={ this.handleOnChange('password').bind(this) }
        />
        <Button
          title="Login"
          color="#000000"
          onPress={ this.handleOnSubmit }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginTop: 200,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 5,
    padding: 10
  },
  flexbox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default LoginUser;