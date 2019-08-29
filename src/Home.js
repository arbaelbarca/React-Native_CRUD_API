import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity,
  Dimensions, Alert, Image, Modal
} from 'react-native';
// import Modal from "react-native-modal"
// import { TabNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomNavigation, { FullTab } from "react-native-material-bottom-navigation";
import Axios from 'axios';
import { ListItem } from 'react-native-elements';
const url_contact = "https://simple-contact-crud.herokuapp.com/contact";
import CardList from "./Component/CardList";
import UpdateContact from './UpdateContact';
import ImagePicker from "react-native-image-picker";
import styleComponent from './Component/styleComponent';
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
class homeScreen extends Component {
  constructor(props) {
    super(props);
    prefik_url = 'http://wadaya.rey1024.com/upload/kategori/';
    this.state = {
      dataPribadi: [
        {
          name: "Dimas",
          contact: "9988"
        },
        {
          name: "Arba",
          contact: "9988"
        },
      ],


      categories: [],
      isLoading: true,
      dataSource: null,
      dataContact: []
    }
  }

  componentWillMount() {
    // {this.fetchData()}
    // { this.getDataAxios() }
    { this.getDataContact() }
  }

  fetchData() {
    return fetch("http://facebook.github.io/react-native/movies.json")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }

  getDataAxios() {
    Axios.get('http://facebook.github.io/react-native/movies.json')
      .then(function (response) {
        console.log(response.data.movies)
      })
      .catch(function (error) {
        console.log(error)
      })

  }

  getDataKategori() {
    Axios.get("http://mhs.rey1024.com/apibudaya/getListCategory.php")
      .then(res => {
        const categories = res.data;
        console.log("respon ", categories)
        this.setState({
          categories,
          isLoading: false
        })
      })
  }

  getDataContact() {
    Axios.get(url_contact)
      .then((response) => {
        const dataContact = response.data.data
        console.log("response ", dataContact)
        this.setState({
          dataContact,
          isLoading: false
        })
      })
      .catch(function (error) {
        console.log("responseEror ", error.response)
      })
  }

  deleteAction(item) {

    // alert("heiii depan ", nama.firstName, "nama last ", namaLast)
    Axios.delete("https://simple-contact-crud.herokuapp.com/contact/", item.id)
      .then((res) => {
        console.log("responSuccesDelete")
        this.setState({ isLoading: true })
        // debugger
      })
      .catch(function (e) {
        console.log("responErrorDelete", e.response)
        // debugger
      })

  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item, index }) => (
    <CardList
      propsFirsname={item.firstName}
      propsLastname={item.lastName}
      propsImage={item.photo}
      clickAction={() => {
        Alert.alert(
          'Perhatian',
          'Apakah anda ingin hapus ' + item.firstName,
          [
            { text: 'Update ', onPress: () => this.UpdateContact(item) },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => this.deleteAction(item) },
          ],
          { cancelable: false },
        );
      }}
    >
    </CardList>



  )

  UpdateContact(item) {
    this.props.navigation.navigate("update", {
      passName: item.firstName,
      passLastName: item.lastName,
      passImage: item.photo,
      passAge: item.age.toString()
    }
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size={50}
            animating={true}
            color="red">

          </ActivityIndicator>
        </View>
      )
    }
    else {
      // let movies = this.state.dataSource.map((val, key) => {
      //   return <View
      //     key={key} style={{
      //       padding: 2,
      //       color: "black"
      //     }}>

      //     <Text style={{
      //       color: "red"
      //     }}>
      //       {val.title}
      //     </Text>
      //     <Text>
      //       {val.releaseYear}
      //     </Text>
      //   </View>
      // })
      return (
        <View style={{
          backgroundColor: "#fafafa",
          justifyContent: 'center',
          alignItems: "center"
        }}>


          <Text
            style={{
              fontSize: 20,
            }}>
            Hello Home
          </Text>


          <View style={{
            paddingTop: 20
          }}>

          </View>

          <View style={{
            width: "100%",
          }}>

            <FlatList
              // data={this.state.dataPribadi}
              // renderItem={({ item }) =>
              //   <View style={{
              //     padding: 10
              //   }}>
              //     <Text>
              //       {item.name}
              //     </Text>
              //     <Text>
              //       {item.contact}
              //     </Text>

              //   </View>
              // }
              data={this.state.dataContact}
              keyExtractor={this.keyExtractor}
              data={this.state.dataContact}
              renderItem={this.renderItem}
            >

            </FlatList>

            <View style={{
              paddingTop: 10
            }}>

            </View>

            <View>
              {/* {movies} */}
            </View>
          </View>


        </View>
      );
    }



  }
}
const CustomProgressBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);

class createDatascreen extends Component {
  static navigationOptions = {
    title: "Create Data"

  }
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: "",
      age: '',
      photo: "",
      isCameraOn: false,
      isProgress: false,
      showImage: false
    };
  }

  postDataContact() {
    console.log("postContact")

    return(
      <CustomProgressBar>
        
      </CustomProgressBar>
    )
    // const paramContact = {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   age: this.state.age,
    //   photo: this.state.photo,
    // }

    // if (this.state.firstName || this.state.lastName || this.state.age) {
    //   Axios.post(url_contact, paramContact)
    //     .then((res) => {
    //       console.log("responSucces", res)
    //       console.log("responSucces", res.data)
    //       this.setState({ isProgress: false })
    //       // debugger
    //     })
    //     .catch(function (error) {
    //       console.log("responEror", error.response)
    //       // debugger
    //       this.setState({ isProgress: true })
    //       return (
    //         <CustomProgressBar>
    //         </CustomProgressBar>
    //       )
    //     })
    // }
    // else {
    //   alert("form masih ada yg kosong")
    // }

  }

  getCamera() {
    // return this.state.isCameraOn && (
    //   <Camera
    //     ref={(cam) => {
    //       this.camera = cam;
    //     }}
    //     style={{
    //       flex: 1,
    //       justifyContent: "flex-end",
    //       alignItems: "center",
    //       height: Dimensions.get('window').height,
    //       width: Dimensions.get('window').width,
    //     }}>

    //   </Camera>
    // );
    this.props.navigation.navigate("camera")
  }

  chooseFile() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'Image Native',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      console.log('ResponseName', response.fileName);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({
          showImage: false
        })
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({
          showImage: false
        })
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          photo: response.uri
        });
        this.setState({
          avatarSource: source,
        });
      }

      if (response.uri != null) {
        this.setState({
          showImage: true
        })
      }
      else {
        this.setState({
          showImage: false
        })
      }
      console.log("responShowImage", this.state.showImage)
    });
  };


  render() {
    return (
      <View
        style={{

          padding: 10,
        }}
      >

        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 20
            }}
          > Create Data </Text>

        </View>

        <View
          style={{
            paddingTop: 10,
          }}>

        </View>

        <TextInput style={{

          width: "100%",
          backgroundColor: "#fafafa",
          borderBottomWidth: 1,

        }}
          onChangeText={(firstName) => this.setState({ firstName })}
          placeholder="Masukin Nama Depan"
        >


        </TextInput>


        <TextInput style={{
          width: "100%",
          backgroundColor: "#fafafa",
          borderBottomWidth: 1,

        }}
          onChangeText={(lastName) => this.setState({ lastName })}
          placeholder="Masukin Nama Belakang"
        >

        </TextInput>

        <TextInput style={{

          width: "100%",
          backgroundColor: "#fafafa",
          borderBottomWidth: 1,

        }}
          keyboardType="number-pad"
          onChangeText={(age) => this.setState({ age })}
          placeholder="Masukin Umur"
        >

        </TextInput>

        <View style={{
          margin: 10,
          justifyContent: 'center',
          alignItems: "center",
        }}>
          {this.state.showImage ? (
            <Image source={this.state.avatarSource} style={styleComponent.imageUpload} />
          ) :
            <Image source={require("./ImageSource/photo.png")} style={styleComponent.imageUpload} />
          }

        </View>

        <View style={{
          width: "100%",
          paddingTop: 15,
          justifyContent: "center",
          alignItems: "center"
        }}>

          <TouchableOpacity style={{
            shadowColor: 'rgba(0,0,0, .4)', // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1, //IOS
            backgroundColor: '#fff',
            elevation: 2, // Android
            height: 50,
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
            onPress={() => this.chooseFile()}
          >
            {/* {this.getCamera()} */}
            <Text
              style={{
                padding: 10,
              }}
            >
              Ambil Poto
          </Text>

          </TouchableOpacity>


        </View>
        <View
          style={{
            paddingTop: 10
          }}>

        </View>

        <View style={{
          paddingTop: 10,
          justifyContent: 'center',
          alignItems: "center"
        }}>

          <TouchableOpacity
            style={{
              width: "100%",
              shadowOffset: { height: 1, width: 1 }, // IOS
              height: 35,
              elevation: 2,
              shadowRadius: 2,
              shadowOpacity: 2,
              alignContent: 'center',
              backgroundColor: "red",
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.postDataContact()}
          >
            <Text style={{
              textAlign: "center",
              color: 'white'
            }}>


              Kirim
            </Text>
          </TouchableOpacity>

        </View>
      </View>


    );
  }
}



class akunScreen extends Component {
  static navigationOptions = {
    title: "Account",
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View
        style={{

          padding: 10,
        }}
      >
        <Text> Hello Akun </Text>


      </View>
    );
  }
}
const TabNavigator = createBottomTabNavigator({
  Home: homeScreen,
  Create: createDatascreen,
  akun: akunScreen
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : ''}`;
        } else if (routeName === 'Create') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'akun') {
          iconName = `ios-checkbox${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: true

  }

);

export default createAppContainer(TabNavigator)

