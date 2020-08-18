import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RecepieDescriptionRow from '../RecepieDescriptionRow';

it('renders without crashing, shallow', () => {
    shallow(<RecepieDescriptionRow />);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecepieDescriptionRow />, div);
  });

  it('renders with the right props', () => {
    const prop1 = "Koka upp pastan i hett vatten";
    const prop2 = "."
    const { getByText } = render(<RecepieDescriptionRow row={prop1} separator={prop2} />);
    expect(getByText("Koka upp pastan i hett vatten.")).toBeInTheDocument();
  });