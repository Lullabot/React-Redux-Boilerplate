/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { HomePage } from './HomePage';

const fn = sinon.spy();

// Make a setup() helper that passes props and renders the component with shallow rendering
function setup() {
  // Mock required props
  const props = {
    posts: {
      items: []
    },
    isFetching: false,
    dispatch: fn
  };
  const wrapper = shallow(<HomePage {...props} />);

  return {
    props,
    wrapper
  };
}

describe('HomePage', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.HomePage')).to.have.length(1);
  });
});
/* eslint-enable no-undef */
