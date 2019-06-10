import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { strings } from './Lang/Strings';
import Form from './components/Form';
import Map from './components/Map';
import Step from './components/Step';

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Scene key='Root'>
                    <Scene 
                    key='Form'
                    component={Form}
                    hideNavBar
                    initial 
                    />

                    <Scene 
                    key='Map'
                    component={Map}
                    />

                </Scene>
            </Router>
        );
    }
}
