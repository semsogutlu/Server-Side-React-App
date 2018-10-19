import HandleErrors from '../infrastructure/HandleErrors';
import { peopleLoaded } from '../actions/index';

export const fetchPeople = () => {
    return (dispatch) => {
        fetch(`/api/people/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'GET',
            credentials: 'same-origin',
        })
        .then(HandleErrors)
        .then(response => response.json())
        .then(data => {
            dispatch(peopleLoaded(data));
        }).catch(error => {
            window.location.href = '/error';
    });
};
}
