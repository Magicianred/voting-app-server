import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('it a Redux store configured with correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Cache', 'Funny Games']
    });
    expect(store.getState()).to.equal(fromJS({
      entries: ['Cache', 'Funny Games']
    }));
  });

});
