import { PEOPLE_LOADED, PEOPLE_LOADING } from '../actions'

export const people = (state = false, action) => {
  switch (action.type) {
    case PEOPLE_LOADED:
    return action.people;
    case PEOPLE_LOADING:
        return {
            isLoading: action.isLoading
        };
    default:
        return state;
  }
};
