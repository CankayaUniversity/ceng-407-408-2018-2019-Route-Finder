import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, MyCustomMarkerView } from 'react-native-maps';
import axios from 'axios';
import { Tabs, Tab, Icon } from 'react-native-elements';
import MapViewDirections from 'react-native-maps-directions';
import { Actions } from 'react-native-router-flux';
import { strings } from '../Lang/Strings';
import Step from './Step';
import { API_ENDPOINT, API_KEY } from '../../constants';
import Places from './Places';
import Button from '../commons/Button';
import SwitchButton from '../commons/SwitchButton';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
//import console = require('console');

const { width, height } = Dimensions.get('window');

class Map extends Component {
    constructor() {
        super();
        this.handleInputFunction = this.handleInputFunction.bind(this);
    }

    state = {
        region: {
            latitude: 39.920857,
            longitude: 32.854511,
            longitudeDelta: 0.30,
            latitudeDelta: 0.30,
            mylatitude: null,
            mylongitude: null
        },
        places: [],
        activePage: 1,
        currCoord: null
    }
    
    async componentWillMount() {
        console.log(this.props.data);
        const { startLongLat } = this.props.data;
        const { coords } = await this.getCurrentPosition();
     
        //const { route } = this.props.data; 
        this.setState({
            region: {
                latitude: startLongLat[0],
                longitude: startLongLat[1],
                routes: null,
            },
            selectedTab: 'steps'
        });
    }

    getCurrentPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.watchPosition(
				position => {                   
                    this.setState({ currCoord: position });
                    console.log(this.state.currCoord);
                    const { coords } = position;
                    console.log('ilk response ');
                    console.log(position);
                    resolve(position);
                    // eslint-disable-next-line max-len
                    return axios.get(`${API_ENDPOINT}/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=500&keyword&rankBy=distance&key=${API_KEY}`)
                    .then(resInner => {
                        console.log('ikinci response ');
                        console.log(resInner);
                        return Promise.resolve({
                            dataList: resInner
                        });
                    }).then(response2 => {
                        console.log('üçüncü response ');
                        console.log(response2);
            
                        const { startLongLat } = this.props.data;
                        const { data: { results } } = response2.dataList;
                        console.log('üçüncüdeyiz results');
                        console.log(results);
                        console.log('üçüncüdeyiz coords');
                        console.log(coords);
                        this.setState({
                            places: results,
                        });
                        console.log(this.state);
                        setTimeout(() => {
                            this.setState({
                                region: {
                                    ...this.state.region,
                                    latitude: coords.latitude,
                                    longitude: coords.longitude,
                                    mylatitude: coords.latitude,
                                    mylongitude: coords.longitude 
                                },
                                
                            });
                        }, 100);         
                    });
                }, // success
				() => reject(), // fail
				{
					timeout: 5000,
					maximumAge: 1000,
					enableHighAccuracy: true
				}
			);
		});
    }
    getActivePage() {
        if (this.state.activePage === 1) {            
            return <Step data={this.state.routes} />;        
        } else { 
            return <Places places={this.state.places} />;            
        }
    }
    handleInputFunction(obj) {
        this.setState({ routes: obj });
    }
  
    render() {
        const { startLongLat, destLongLat, startLoc, destLoc } = this.props.data;
        const origin = { latitude: startLongLat[0], longitude: startLongLat[1] };
        const destination = { latitude: destLongLat[0], longitude: destLongLat[1] };
        const GOOGLE_MAPS_APIKEY = 'AIzaSyC9zZfHLud2na91ugE1FrOv92qX2cbHvto';
        return (
            <View style={{ flex: 1 }} >
                <View style={{ height: '50%' }} >
                    <MapView 
                        //provider={PROVIDER_GOOGLE}
                        region={this.state.region}
                        showsUserLocation={true}
                        showsCompass={true}
                        style={{ flex: 1 }}
                        showsScale={true}
                        loadingEnabled={true}
                    >
                        <Marker
                            coordinate={origin}
                            title={strings.startlocation}
                            description={startLoc}
                            pinColor={'#809c13'}
                        />
                        <Marker
                            coordinate={destination}
                            title={strings.destlocation}
                            description={destLoc}
                            pinColor={'#809c13'}
                        />

                        {
                            this.state.places.map(place => {
                                const { geometry: { location: { lat, lng } } } = place;
                                return (
                                    <Marker
                                    key={place.id}
                                    pinColor={'#ff9a00'}
                                    coordinate={{
                                        latitude: lat,
                                        longitude: lng
                                    }}
                                    title={place.name}
                                    />
                                );
                            })
                        }

                        <MapViewDirections 
                            origin={origin} 
                            destination={destination} 
                            apikey={GOOGLE_MAPS_APIKEY} 
                            mode="transit"
                            strokeWidth={5}
                            strokeColor='#809c13'
                            optimizeWaypoints={true}
                            ourInputFunction={this.handleInputFunction}
                        />        
                    </MapView>
                </View>
                <View style={{ height: '50%', alignItems: 'center', backgroundColor: '#fff9e0', borderRadius: 20 }} >
                    <View><Text>{ (this.state.currCoord !== null) ? this.state.currCoord.coords.latitude + ', ' + this.state.currCoord.coords.longitude : 'boş' }</Text></View>
                    <SwitchButton
                        onValueChange={(val) => this.setState({ activePage: val })}      // this is necessary for this component
                        text1 = 'Route'                     // optional: first text in switch button --- default ON
                        text2 = 'Places'                    // optional: second text in switch button --- default OFF
                        switchWidth = {width - 2}           // optional: switch width --- default 44
                        switchHeight = {height / 16}        // optional: switch height --- default 100
                        switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                        switchBorderRadius = {10}           // optional: switch border radius --- default oval
                        switchSpeedChange = {500}           // optional: button change speed --- default 100
                        switchBorderColor = '#d4d4d4'       // optional: switch border color --- default #d4d4d4
                        switchBackgroundColor = 'white'      // optional: switch background color --- default #fff
                        btnBorderColor = 'white'          // optional: button border color --- default #00a4b9
                        btnBackgroundColor = '#00a6a6'      // optional: button background color --- default #00bcd4
                        fontColor = '#b1b1b1'               // optional: text font color --- default #b1b1b1
                        activeFontColor = '#fff'            // optional: active font color --- default #fff
                    />                
                    <View>
                        {this.getActivePage()}                 
                    </View>                                             
                </View>          
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    sectiontitle: {
      justifyContent: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 15,
    },
    viewheader: {
        justifyContent: 'center',
        textAlign: 'center',
        //backgroundColor: 'red',
        fontSize: 15
    },
    viewtext: {
        fontSize: 13,
        //backgroundColor: 'green',
    },
    section: {
      margin: 5,
      marginLeft: 4,
      marginRight: 4,
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'blue'
    },
    stepstyle: {
        height: height / 2,
    }
  });
export default Map;
