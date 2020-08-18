import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MenuDisplayer from '../MenuDisplayer';

const mockMenu = [
    {
        index: 105,
        mealName: "Tacos",
        mealCategory: "kött",
        ingredients: ["köttfärs", "riven ost", "majs", "paprika", "tomater", "avokado", "tortillasskal"],
        description: ""

    },

    {
        index: 106,
        mealName: "Quornpasta",
        mealCategory: "vegetariskt",
        ingredients: ["quornbitar", "broccoli", "champinjoner", "pasta", "pesto", "parmesanost"],
        description: ""

    },

    {
        index: 107,
        mealName: "Fisk i ugn",
        mealCategory: "fisk",
        ingredients: ["panerade torskfiléer", "potatis", "sparris", "remouladsås"],
        description: ""

    }
]

it('renders without crashing, shallow', () => {
    shallow(<MenuDisplayer menu={mockMenu}/>);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuDisplayer menu={mockMenu} />, div);
  });

  
it('renders with a button', () => {
    render(<MenuDisplayer menu={mockMenu} />);
    expect(screen.getByRole('button')).toHaveTextContent('Nytt menyförslag');
  });

  it('renders with the right heading', () => {
    render(<MenuDisplayer menu={mockMenu} />);
    expect(screen.getByRole('heading')).toHaveTextContent('Veckans meny!');
  });

