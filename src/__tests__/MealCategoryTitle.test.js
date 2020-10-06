import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MealCategoryTitle from '../MealCategoryTitle';

it('renders without crashing, shallow', () => {
    shallow(<MealCategoryTitle />);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MealCategoryTitle />, div);
  });

  it('renders with the right props', () => {
    const prop = "kött";
    const { getByText } = render(<MealCategoryTitle title={prop} />);
    expect(getByText(prop)).toBeInTheDocument();
  });

