import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MealDisplayer from '../MealDisplayer';

const mockMeal =   {
    index: 105,
    mealName: "Tacos",
    mealCategory: "kött",
    ingredients: ["köttfärs", "riven ost", "majs", "paprika", "tomater", "avokado", "tortillasskal"],
    description: ""
};

it('renders without crashing, shallow', () => {
    shallow(<MealDisplayer key={mockMeal.index} meal={mockMeal}/>);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MealDisplayer key={mockMeal.index} meal={mockMeal} />, div);
  });

