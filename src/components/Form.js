import RNGooglePlaces from 'react-native-google-places'; 
import React, { Component } from 'react';
import { Text, View, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../commons/Button';
import { strings } from '../Lang/Strings';

//import console = require('console');

const { width, height } = Dimensions.get('window');

class Form extends Component {

    state = {
        startLoc: '',
        destLoc: '',
        startImgOK: require('../RouteFinder_SourceAssets/img/ok.png'),
        destImgOK: require('../RouteFinder_SourceAssets/img/ok.png'),
        startLongLat: [],
        destLongLat: []
    }

    componentWillMount() {
        this.setState({
            startLoc: strings.startlocation,
            destLoc: strings.destlocation,
        });
    }
    
    openSearchModal(type) {
        // place represents user's selection from 
        //the suggestions and it is a simplified Google Place object.
        RNGooglePlaces.openAutocompleteModal()
        .then((place) => {
            console.log(place);
            if (type === 'start') {
                this.setState({ 
                    startLoc: place.name,
                    startImgOK: require('../RouteFinder_SourceAssets/img/check.png'),
                    startLongLat: [place.latitude, place.longitude]
                });
            } else {
                this.setState({ 
                    destLoc: place.name,
                    destImgOK: require('../RouteFinder_SourceAssets/img/check.png'),
                    destLongLat: [place.latitude, place.longitude]
                });
            } 
        })
        .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    renderSection(text, onPress, img) {
        return (
        <View style={styles.section}>
            <TouchableOpacity
                onPress={onPress}  
                style={{ flex: 1, 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                flexDirection: 'row' 
                }}
            >
                <Text style={{ textAlign: 'center', flex: 18 }}>{text}</Text>
                <Image source={img} />
            </TouchableOpacity>
        </View>
        );
    }

    render() {
        return (
            <ImageBackground
            source={require('../RouteFinder_SourceAssets/img/rfbkg.jpg')}
            style={{ width, height, alignItems: 'center', justifyContent: 'center' }}
            >
                
                <Image style={styles.appicon} source={require('../RouteFinder_SourceAssets/img/AppIcon.png')} />
                
                {this.renderSection(
                    this.state.startLoc,
                    () => this.openSearchModal('start'),
                    this.state.startImgOK
                )}
                
                {this.renderSection(
                    this.state.destLoc,
                    () => this.openSearchModal('destination'),
                    this.state.destImgOK
                )}
            <Button
            onPress={() => Actions.Map({
                data: {
                    startLongLat: this.state.startLongLat,
                    destLongLat: this.state.destLongLat,
                    startLoc: this.state.startLoc,
                    destLoc: this.state.destLoc    
                }
            })} 
            text={strings.createplan} 
            />
            </ImageBackground>           
        );
    }
}

const styles = {
    section: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width: width * 0.59,
        height: height * 0.05,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    appicon: {
        borderRadius: 20
    }
};

export default Form;

//ios: AIzaSyC9zZfHLud2na91ugE1FrOv92qX2cbHvto 