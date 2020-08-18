import React, {Component} from 'react';
import '../App.css';
import MealDisplayer from './MealDisplayer';

class MenuDisplayer extends Component {
    state = {
        isARecepieOpen: false,
        indexOfOpenRecepie: null
    }

    openRecepie = this.openRecepie.bind(this);
    closeRecepie = this.closeRecepie.bind(this);
    reloadMenu = this.reloadMenu.bind(this);

    openRecepie(recepieIndex) {
        this.setState({isARecepieOpen: true, indexOfOpenRecepie: recepieIndex});
    }

    closeRecepie() {
        this.setState({isARecepieOpen: false, indexOfOpenRecepie: null});
    }

    reloadMenu() {
        this.props.reloadMenu();
        this.closeRecepie();
    }

    render () {

        const menu = this.props.menu.map((meal, index) => 
            (
            <MealDisplayer 
                key={meal.index} 
                weekday={index + 1}
                meal={meal} 
                isARecepieOpen={this.state.isARecepieOpen}
                indexOfOpenRecepie={this.state.indexOfOpenRecepie}
                openRecepie={() => this.openRecepie(meal.index)}
                closeRecepie={() => this.closeRecepie()}/>
            )
        )

        return (
            <div>
            <div className="menu-displayer">
                <h2 className="menu-displayer-title">Veckans meny</h2>
                {menu} 
            </div>
            <button className="menu-displayer-button-reload" onClick={this.reloadMenu}>Nytt menyförslag</button>
        </div>
        )
    }
}

export default MenuDisplayer;