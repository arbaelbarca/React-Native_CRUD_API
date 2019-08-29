import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";

// import Home from "./Home";
import DetailCrud from './Detail';
import homeScreen from './Home';
import UpdateContact from './UpdateContact';
import CameraStyle from './Component/CameraStyle';


const AppNavigator = createStackNavigator ({
    home : homeScreen,
    detail : DetailCrud,
    update: UpdateContact,
    camera: CameraStyle
})

const AppNav = createAppContainer(AppNavigator)

export default AppNav;