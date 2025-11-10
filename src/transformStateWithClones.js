'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    let newState = { ...currentState };

    if (action.type === 'clear') {
      newState = {};
      history.push(newState);
      currentState = newState;
    } else if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      history.push(newState);
      currentState = newState;
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      history.push(newState);
      currentState = newState;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
