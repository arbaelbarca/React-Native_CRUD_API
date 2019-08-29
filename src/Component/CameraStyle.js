import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Camera from "react-native-camera";

export default class CameraStyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
       
      </View>
    );
  }
}


