import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MenuDisplayer from '../menu/pages/MenuDisplayer';

const mockMenu = [
    {
        id: 105,
        mealName: "Tacos",
        mealCategory: 1,
        ingredients: [
            {
                id: "101",
                name: "Köttfärs",
                amount: 500,
                unit: "g",
                details: ""
            },
            {
                id: "102",
                name: "Gul lök",
                amount: 2,
                unit: "",
                details: "finhackad"
            },
            {
                id: "103",
                name: "Salt",
                amount: null,
                unit: "",
                details: ""
            }
        ],
        description: [
            {
                description: "Stek köttfärsen i olja"
            },
            {
                description: "Hacka löken."
            }
            ,        {
                description: "Blanda ihop."
            }
        ]
    },

    {
        id: 106,
        mealName: "Kycklinggryta",
        mealCategory: 2,
        ingredients: [
            {
                id: "101",
                name: "Kycklingfilé",
                amount: 300,
                unit: "g",
                details: ""
            },
            {
                id: "102",
                name: "Grevéost",
                amount: 2,
                unit: "st",
                details: ""
            },
            {
                id: "103",
                name: "Salt",
                amount: null,
                unit: "",
                details: "Finkornigt"
            }
        ],
        description: [
            {
                description: "Sätt på ugnen."
            },
            {
                description: "Tillaga maten."
            }
            ,        {
                description: "Ät middag."
            }
        ]
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


