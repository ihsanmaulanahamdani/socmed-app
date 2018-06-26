import React, { Component } from 'react';
import { View, Text, BackHandler, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SocialMedia from '../store';
import { observer } from 'mobx-react/native';

@observer
class Home extends Component {
  constructor() {
    super()
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: null,
    headerRight: <TouchableOpacity onPress={ () => navigation.navigate('Post') } style={{ marginRight: 10 }}><Ionicons name="md-add" size={32} color="black" /></TouchableOpacity>
  })

  componentDidMount () {
    SocialMedia.getAllData()
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      return true;
  }

  render() {
    if (SocialMedia.data.posts.length === 0) {
      return (
        <View>
          <Text>Loading.....</Text>
        </View>
      );
    } else {
      const posts = SocialMedia.data.posts.data.data;

      return (
        <FlatList
          data={ posts }
          renderItem={({ item }) => (
            <View style={ styles.box }>
              <View style={ styles.flexbox }>
                <Image source={{uri: `${item.image}`}} style={{ width: 95, height: 120 }} />
                <Text style={ styles.text }>{ item.text }</Text>
              </View>
            </View>
          )}
          keyExtractor={ (item) => item._id }
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    padding: 10
  },
  flexbox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  name: {
    fontSize: 20,
    paddingLeft: 13,
    fontWeight: 'bold'
  },
  text: {
    width: '70%',
    paddingTop: 20,
    paddingLeft: 15,
    fontSize: 16
  }
})

export default Home;