import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Cache']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Cache']
    }));
  });
  
  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Cache', 'Funny Games']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Cache', 'Funny Games']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Cache', 'Funny Games']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Cache' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Cache', 'Funny Games'],
        tally: { Cache: 1}
      },
      entries: []
    }));
  });
});
