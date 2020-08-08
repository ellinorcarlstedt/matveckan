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
        const menu = [];
        this.props.menu.forEach((meal) => {
            menu.push(<MealDisplayer 
                                key={meal.index} 
                                meal={meal} 
                                isARecepieOpen={this.state.isARecepieOpen}
                                indexOfOpenRecepie={this.state.indexOfOpenRecepie}
                                openRecepie={() => this.openRecepie(meal.index)}
                                closeRecepie={() => this.closeRecepie()}/>)
            } 
        )

        return (
            <div>
            <div className="week-menu-displayer">
                <h2 className="week-menu-title">Veckans meny!</h2>
                {menu} 
            </div>
            <button className="week-menu-button" onClick={this.reloadMenu}>Nytt menyförslag</button>
        </div>
        )
    }
}

export default MenuDisplayer;