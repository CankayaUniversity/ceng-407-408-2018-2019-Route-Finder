import React, { Component } from 'react';
import Accordion from 'react-native-accordion';
import Collapsible from 'react-native-collapsible';
import RNGooglePlaces from 'react-native-google-places'; 
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
// eslint-disable-next-line max-len
import { View, Text, Dimensions, ListView, StyleSheet, Image, TextInput, FlatList, SectionList, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, MyCustomMarkerView } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { strings } from '../Lang/Strings';
import Button from '../commons/Button';
import Header from '../commons/Header';
//import console = require('console');

const { width, height } = Dimensions.get('window');


class Step extends Component {
  
    
    constructor(props) {
        super(props);
        this.state = {
          steps: [],
          legs: null,
          transits: [],
          stepList: [],
          index: 1,
        };
        this.obj = null;
    }
    
    componentWillMount() {
        //console.log(this.props.data);

        this.obj = this.props.data; 
    }

    getState() {
      this.setState({ index: this.state.index + 1 });
      return this.state.index.toString();
    }

  
    render() {
      if (!this.props.data) {
        return (
          <View style={styles.loadingScreen} >
            <Image source={require('../RouteFinder_SourceAssets/img/loadingLogo.gif')} /> 
          </View>
            );
      }
      this.obj = this.props.data;
      return (
        
        <ScrollView>       
          <Text style={styles.sectiontitle}> {strings.routedetailsheader} </Text> 
          <View style={styles.section}>
              <Text style={styles.viewheader}>{strings.departureheader}{this.obj.legs.start_address}</Text>
              <Text style={styles.viewheader}>{strings.arrivalheader}{this.obj.legs.end_address}</Text>
              <Text style={styles.viewtext}>{strings.departureTimeheader}{this.obj.legs.departure_time.text}</Text>
              <Text style={styles.viewtext}>{strings.arrivalTimeheader}{this.obj.legs.arrival_time.text}</Text>
              <Text style={styles.viewtext}>{strings.totaldurationheader}{this.obj.legs.duration.text}</Text>
              <Text style={styles.viewtext}>{strings.totaldistanceheader}{this.obj.legs.distance.text}</Text>
              <Text style={styles.viewtext}>{strings.totalMinCostheader}{this.obj.totalCostMin}₺</Text>
              <Text style={styles.viewtext}>{strings.totalMaxCostheader}{this.obj.totalCostMax}₺</Text>
          </View>
          <SectionList
            sections={this.obj.stepList}
            renderSectionHeader={({ section }) => <Text style={styles.sectiontitle}> { section.title } </Text>}
            renderItem={({ item }) => 
            <View style={styles.section}>
              <Text style={styles.viewheader}>{ item.html_instructions }</Text> 
              <Text style={styles.viewtext}>{strings.distanceheader}{ item.distance.text }</Text>
              <Text style={styles.viewtext}>{strings.durationheader}{ item.duration.text }</Text> 
            </View>
            }
            keyExtractor={(item, index) => index}
          />   
        </ScrollView>
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
      fontSize: 15,
      color: 'white'
  },
  viewtext: {
      fontSize: 13,
      //backgroundColor: 'green',
      color: 'white'
  },
  section: {
    margin: 5,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: '#809c13',
    borderRadius: 5,
    padding: 10,
    borderWidth: 3,
    borderColor: '#a1c45a'
  },
  loadingScreen: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//{ width, height, alignItems: 'center', justifyContent: 'center' }
//style={styles.section}
export default Step;
