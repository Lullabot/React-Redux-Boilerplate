import sinon from 'sinon';

/**
 * Mocks props for testing top level components, e.g. HomePage.
 * @return {object} the mocked props.
 */

const fn = sinon.spy();

export default () => (
  {
    posts: [
      {
        title: 'Some title',
        id: 1
      }
    ],
    params: {
      postID: '1'
    },
    dispatch: fn,
    isFetching: false
  }
);
