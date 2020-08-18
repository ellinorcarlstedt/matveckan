import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MealTitle from '../MealTitle';

it('renders without crashing, shallow', () => {
    shallow(<MealTitle />);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MealTitle />, div);
  });

  it('renders with the right props', () => {
    const prop = "Spaghetti bolognese";
    const { getByText } = render(<MealTitle title={prop} />);
    expect(getByText(prop)).toBeInTheDocument();
  });

  it('renders a div with the right class', () => {
    render(<MealTitle />);
    expect(screen.getByTestId('test-div-meal-title')).toHaveClass('meal-title');
  });
