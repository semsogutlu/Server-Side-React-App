import HandleErrors from '../infrastructure/HandleErrors';
import { peopleLoading, peopleLoaded } from '../actions/index';

export const fetchPeople = () => {
    return (dispatch) => {
        dispatch(peopleLoading(true));
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
            dispatch(peopleLoading(false));
            dispatch(peopleLoaded(data));
        }).catch(error => {
            window.location.href = '/error';
    });
};
}
