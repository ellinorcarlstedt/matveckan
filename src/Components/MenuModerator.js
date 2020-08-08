import React, {Component} from 'react';
import '../App.css';
import MenuDisplayer from './MenuDisplayer';
import recepies from '../recepies';

class MenuModerator extends Component {
    state = {
        allRecepies: [],
        numberOfDays: 7 
    }

    reloadMenu = this.reloadMenu.bind(this);

    componentDidMount() {
        this.setState({allRecepies: recepies})
    } 

    reloadMenu(days) {
        this.setState({numberOfDays: days});
    }

    getRandomNumber(maxNumber) {
        return Math.floor(Math.random() * maxNumber)
    }

    getMenu(recepies, numberOfDays) {  
        let allRecepies = [...recepies];
        let newMenu = [];
        while (allRecepies.length > 0 && newMenu.length < numberOfDays) {
            let currentLength = allRecepies.length;
            let randomNumber = this.getRandomNumber(currentLength);
            newMenu.push(allRecepies[randomNumber]);
            allRecepies.splice(randomNumber, 1);
        }        
        return newMenu;
    }


    render () {
        let menu = this.getMenu(this.state.allRecepies, this.state.numberOfDays);

        return (
        <div className="week-menu-moderator">
            <MenuDisplayer menu={menu} reloadMenu={() => this.reloadMenu(7)}/>
        </div>
        )
    }
}

export default MenuModerator;