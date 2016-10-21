/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './Home';

// Make a setup() helper that passes props and renders the component with shallow rendering
function setup() {
  // Mock required props
  const props = {
    posts: {
      items: []
    },
    isFetching: false,
    dispatch: jest.fn() // eslint-disable-line
  };
  const wrapper = shallow(<Home {...props} />);

  return {
    props,
    wrapper
  };
}

describe('components', () => {
  describe('Home', () => {
    it('should render', () => {
      const { wrapper } = setup();
      expect(wrapper.is('.page-home')).toBe(true);
    });
  });
});
/* eslint-enable no-undef */
