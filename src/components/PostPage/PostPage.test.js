/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PostPage } from './PostPage';

// Make a setup() helper that passes props and renders the component with shallow rendering
function setup() {
  // Mock required props
  const props = {
    posts: {
      items: [
        {
          title: 'Some title',
          id: 1
        }
      ]
    },
    params: {
      postID: '1'
    }
  };
  const wrapper = shallow(<PostPage {...props} />);

  return {
    props,
    wrapper
  };
}

describe('PostPage', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.PostPage')).to.have.length(1);
  });
});
/* eslint-enable no-undef */
