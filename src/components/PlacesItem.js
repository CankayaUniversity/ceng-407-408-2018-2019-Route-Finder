import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { API_ENDPOINT, API_KEY } from '../../constants';
import { thisExpression } from '@babel/types';


export default class PlacesItem extends Component {
    state = {
        ptypes: ''
    }

    componentWillMount() {
        const { types } = this.props.item;
        var pxtypes = '';
        var i = 0;
        var mystr = '';
        for (i; i < types.length; i++) {
            mystr = types[i].replace(new RegExp('_', 'g'), ' ');
            mystr = mystr.charAt(0).toUpperCase() + mystr.slice(1);
            pxtypes += mystr + ', ';
        }
        pxtypes = pxtypes.substring(0, pxtypes.length - 2);
        this.setState({
            ptypes: pxtypes
            }
        );
    }

    render() {
        const { photos } = this.props.item;
		let source;
		if (photos) {
			// eslint-disable-next-line max-len
            source = { uri: `${API_ENDPOINT}/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${API_KEY}` };
            console.log(source);
		} else {
			source = require('../RouteFinder_SourceAssets/img/no-image.jpg');
		}
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.viewheader}>
                    {this.props.item.name}
                </Text >
                <Text style={styles.viewtext}>
                    {this.props.item.vicinity}
                </Text>
                <View style={styles.itemContainerTypes}>
                    <Text style={styles.viewtext}>
                        Place types: {this.state.ptypes}
                    </Text>
                </View>
                {/*<Image style={styles.photo} source={source} />*/}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        margin: 5,
        marginLeft: 4,
        marginRight: 4,
        backgroundColor: '#ff9a00',
        borderRadius: 5,
        padding: 10,
        borderWidth: 3,
        borderColor: '#ffa73b',
    },
    itemContainerTypes: {
        margin: 5,
        marginLeft: 4,
        marginRight: 4,
        backgroundColor: '#809c13',
        borderRadius: 5,
        padding: 10,
        borderWidth: 3,
        borderColor: '#809c13',
    },
    viewheader: {
        justifyContent: 'center',
        textAlign: 'center',
        //backgroundColor: 'red',
        fontSize: 15,
        color: 'white'
    },
    viewtext: {
        fontSize: 13,
        //backgroundColor: 'green',
        color: 'white'
    },
    container: {
        marginTop: 20,
        flex: 1,
      },
      row: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue',
      }
});
