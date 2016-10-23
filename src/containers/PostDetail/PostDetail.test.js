/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PostDetail } from './PostDetail';

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
  const wrapper = shallow(<PostDetail {...props} />);

  return {
    props,
    wrapper
  };
}

describe('PostDetail', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.page-post')).to.have.length(1);
  });
});
/* eslint-enable no-undef */
