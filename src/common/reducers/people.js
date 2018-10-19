import { PEOPLE_LOADED } from '../actions'

export const people = (state = false, action) => {
  switch (action.type) {
    case PEOPLE_LOADED:
    return action.people;
    default:
        return state;
  }
};
