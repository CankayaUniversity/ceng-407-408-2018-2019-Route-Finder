import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import PlacesItem from './PlacesItem';


export default class Places extends Component {

    render() {
        return (
            <View>
                <FlatList
                data={this.props.places}
                keyExtractor={(item, key) => item.id}
                renderItem={({ item }) => <PlacesItem map={this.props.map} key={item.id} item={item} />}
                ItemSeparatorComponent={() => <View style={{ marginRight: 10 }} />}
                />
            </View>
        );
    }
}
