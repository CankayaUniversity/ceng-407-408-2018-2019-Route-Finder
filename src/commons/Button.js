import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

class Button extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{ width: (width * 0.71), 
                height: (height * 0.07),
                backgroundColor: '#00a6a6',
                marginTop: 20, 
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
                }}
                onPress={ () => this.props.onPress() }
            >
          <Text style={{ color: 'white' }} >{this.props.text}</Text>
          </TouchableOpacity>
        );
    }
}

export default Button;
