import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RecepieDescription from '../RecepieDescription';

it('renders without crashing, shallow', () => {
    shallow(<RecepieDescription description="" />);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecepieDescription description="" />, div);
  });

