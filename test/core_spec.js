import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Cache', 'Funny Games');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Cache', 'Funny Games')
      }));
    });

    it('convets to immmutable', () => {
      const state = Map();
      const entries = ['Cache', 'Funny Games'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Cache', 'Funny Games')
      }));
    });

    it('takes next 2 entries under vote', () => {
      const state = Map({
        entries: List.of('Cache', 'Funny Games', 'Piano Teacher')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Cache', 'Funny Games')
        }),
        entries: List.of('Piano Teacher')
      }));
    });
  });
});
