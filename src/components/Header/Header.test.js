/* eslint-disable no-undef */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('renders', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.Header')).to.have.length(1);
  });
});
/* eslint-enable no-undef */
