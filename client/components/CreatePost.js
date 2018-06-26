import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import SocialMedia from '../store';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

@observer
class CreatePost extends Component {
  handleOnchange = (input) => (text) => {
    input === 'text' ? SocialMedia.post.text = text : SocialMedia.post.image = text;
  }

  handleOnSubmit = () => {

  }

  render() {
    return (
      <View style={ styles.box }>
        <TextInput
          style={{ width: 350, height: 50 }}
          placeholder="Just write down whatever you want"
          onChangeText={ this.handleOnchange('text').bind(this) }
        />
        <TextInput
          style={{ width: 350, height: 50 }}
          placeholder="That should be image here"
        />
        <Button
          title="Post"
          color="#000000"
          onPress={ this.handleOnSubmit() }
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

export default CreatePost;