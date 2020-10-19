import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RecipeDescription from '../menu/components/RecipeDescription';

it('renders without crashing, shallow', () => {
    shallow(<RecipeDescription description={[{description: "Test 1"}, {description: "Test 2"}]} />);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeDescription description={[{description: "Test 1"}, {description: "Test 2"}]} />, div);
  });

