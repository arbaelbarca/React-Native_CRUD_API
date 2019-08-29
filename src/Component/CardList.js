import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styleComponent from './styleComponent';

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textLastName: this.props.propsLastname,
      click: this.props.clickAction,
      defaultImage: ""
    };
  }

  conditionImage() {
    const sourceImage = this.props.propsImage;
    if (sourceImage == "default") {
      console.log("responSuccee")
      return (
        <View>
          <Image style={styleComponent.imageCircle}
            source={require("../ImageSource/user.png")}
          >
          </Image>
        </View>
      )
    }
    else {
      console.log("responElse")
      return (
        <View>
          <Image style={styleComponent.imageCircle}
            source={{ uri: sourceImage }}
          >
          </Image>

        </View>
      );
    }

  }

  render() {
    return (
      <View style={{
      }}>

        <TouchableOpacity style={{
          shadowColor: 'rgba(0,0,0, .4)', // IOS
          shadowOffset: { height: 5, width: 5 }, // IOS
          shadowOpacity: 5, // IOS
          shadowRadius: 5, // IOS
          backgroundColor: '#fff',
          elevation: 2, // Android
          height: 60,
          width: '100%',
          padding: 5,
        }}
          onPress={this.props.clickAction}
        >

          <View style={{
            flex: 1,
            flexDirection: "row",
          }}>

            {this.conditionImage()}

            <View style={{
              paddingLeft: 10,
              flexDirection: "column"
            }}>

              <Text style={{
                marginTop: 5,
                marginBottom: 2,
                textAlign: 'left',
              }}>
                {this.props.propsFirsname}
              </Text>
              <Text style={{
                marginTop: 2,
                marginBottom: 5,
                textAlign: 'left',
              }}>
                {this.state.textLastName}
              </Text>

            </View>

          </View>


        </TouchableOpacity>

      </View>
    );
  }
}
