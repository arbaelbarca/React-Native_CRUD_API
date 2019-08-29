import React, { Component } from 'react';
import {
    View, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity,
    Dimensions, Alert, Image
} from 'react-native';
import styleComponent from './Component/styleComponent';

export default class UpdateContact extends Component {
    static navigationOptions = {
        title: "Update Contact"
    }
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: "",
            age: '',
            photo: "",
            isCameraOn: false,
            getData: this.props.navigation.state.params
        };
    }
    conditionImage() {
        const sourceImage = this.state.getData.passImage;
        if (sourceImage == "default") {
            console.log("responSuccee")
            return (
                <View>
                    <Image style={styleComponent.imageCircle}
                        source={require("./ImageSource/user.png")}
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
        console.log("responGetdata", this.getData)
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
                    > Update Data </Text>

                </View>

                <View
                    style={{
                        paddingTop: 10,
                    }}>

                </View>

                <View style={{
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    {this.conditionImage()}
                </View>




                <TextInput style={{
                    width: "100%",
                    backgroundColor: "#fafafa",
                    borderBottomWidth: 1,

                }}
                    onChangeText={(firstName) => this.setState({ firstName })}
                    value={this.state.getData.passName}
                    placeholder="Masukin Nama Depan"
                >

                </TextInput>


                <TextInput style={{
                    width: "100%",
                    backgroundColor: "#fafafa",
                    borderBottomWidth: 1,

                }}
                    onChangeText={(lastName) => this.setState({ lastName })}
                    value={this.state.getData.passLastName}
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
                    value={this.state.getData.passAge}
                    placeholder="Masukin Umur"
                >

                </TextInput>

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
                    // onPress={() => { this.setState({ isCameraOn: true }) }}
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
