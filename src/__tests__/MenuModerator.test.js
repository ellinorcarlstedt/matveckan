import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MenuModerator from '../menu/pages/MenuModerator'; 

it('renders without crashing, shallow', () => {
    shallow(<MenuModerator />);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuModerator />, div);
  });


