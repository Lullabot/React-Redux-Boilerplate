/* eslint-disable no-undef */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App')).to.have.length(1);
  });
});
/* eslint-enable no-undef */
