import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

class SocialMedia {
  @observable user = {
    full_name: '',
    username: '',
    newEmail: '',
    newPassword: '',
    email: '',
    password: ''
  }

  @observable post = {
    text: '',
    image: ''
  }

  @observable comment = {
    text: ''
  }

  @observable data = {
    posts: [],
    comments: []
  }

  registerUser = () => {
    const { user } = this;
    const { full_name, username, newEmail, newPassword } = user;

    axios
      .post('https://peaceful-escarpment-90300.herokuapp.com/register', {
        full_name,
        username,
        newEmail,
        newPassword
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  loginUser = async () => {
    try {
      const { user } = this;
      const { email, password } = user;
      
      const loginUser = await axios.post('https://peaceful-escarpment-90300.herokuapp.com/login', { email, password });

      try {
        await AsyncStorage.setItem('token', loginUser.data.token);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getAllData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      
      if (value) {
        try {
          const posts = await axios.get('https://peaceful-escarpment-90300.herokuapp.com/posts');

          this.data.posts = posts;
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  createPost = async () => {
    try {
      const value = await AsyncStorage.getItem('token');

      if (value) {
        try {
          const posting = await axios.post('https://peaceful-escarpment-90300.herokuapp.com/posts/create', {
            text,
            image
          }, {
            headers: {
              token: value
            }
          })
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  deletePost = async () => {
    try {
      const value = await AsyncStorage.getItem('token');

      if (value) {
        try {
          const deleting = await axios.delete(`https://peaceful-escarpment-90300.herokuapp.com/posts/delete/${id}`, {
            headers: {
              token: value
            }
          })
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  addComment = async () => {
    try {
      const value = await AsyncStorage.getItem('token');

      if (value) {
        try {
          const commenting = await axios.post(`https://peaceful-escarpment-90300.herokuapp.com/posts/${id}/comment`, {
            text
          }, {
            headers: {
              token: value
            }
          })
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  getAllComments = async () => {
    try {
      const value = await AsyncStorage.getItem('token');

      if (value) {
        try {
          const getComments = await axios.get(`https://peaceful-escarpment-90300.herokuapp.com/posts/${id}/comments`);

          this.data.comments = getComments;
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SocialMedia();