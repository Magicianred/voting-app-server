import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

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

  });

  describe('next', () => {

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

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Cache', 'Funny Games'),
          tally: Map({
            'Cache': 89,
            'Funny Games': 99
          })
        }),
        entries: List.of('Piano Teacher', 'Code Unknown', 'White Ribbon')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Piano Teacher', 'Code Unknown')
        }),
        entries: List.of('White Ribbon', 'Funny Games')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Cache', 'Funny Games'),
          tally: Map({
            'Cache': 343,
            'Funny Games': 343
          })
        }),
        entries: List.of('Piano Teacher', 'Code Unknown', 'White Ribbon')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Piano Teacher', 'Code Unknown')
        }),
        entries: List.of('White Ribbon', 'Cache', 'Funny Games')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Cache', 'Funny Games'),
          tally: Map({
            'Cache': 29,
            'Funny Games':1089
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Funny Games'
      }));
    });

  });

  describe('vote', () => {

    it('creates a tallly for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Cache', 'Funny Games')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Cache');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Cache', 'Funny Games'),
          tally: Map({
            'Cache': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Cache', 'Funny Games'),
          tally: Map({
            'Cache': 239,
            'Funny Games': 999
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Cache');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Cache', 'Funny Games'),
          tally: Map({
            'Cache': 240,
            'Funny Games': 999
          })
        }),
        entries: List()
      }));
    });

  });
});
