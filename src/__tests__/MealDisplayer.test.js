import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MealDisplayer from '../menu/components/MealDisplayer';

const mockMeal =   {
    id: 105,
    mealName: "Tacos",
    mealCategory: "kött",
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
};

it('renders without crashing, shallow', () => {
    shallow(<MealDisplayer key={mockMeal.id} meal={mockMeal}/>);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MealDisplayer key={mockMeal.id} meal={mockMeal} />, div);
  });

