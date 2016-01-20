import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

  describe('A List', () => {

    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Cache', 'Funny Games');
      let nextState = addMovie(state, 'Piano Teacher');
      
      expect(nextState).to.equal(List.of(
        'Cache',
        'Funny Games',
        'Piano Teacher'
      ));
      expect(state).to.equal(List.of(
        'Cache',
        'Funny Games'
      ));
    });
  });

  describe('A tree', () => {

    function addMovie(currentState, movie) {
      return currentState.set(
        'movies',
        currentState.get('movies').push(movie)
      );
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Cache', 'Funny Games')
      });
      let nextState = addMovie(state, 'Piano Teacher');
      
      expect(nextState).to.equal(Map({
        movies: List.of(
        'Cache',
        'Funny Games',
        'Piano Teacher'
        )
      }));
      expect(state).to.equal(Map({
        movies: List.of(
        'Cache',
        'Funny Games'
        )
      }));
    });
  });
});
