import React, {Component} from 'react';
import HeroBanner from './HeroBanner';



export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
         <HeroBanner />
        );
    }
}