import * as actionTypes from './actionsTypes';
import axios from 'axios';

const getTests = (data) => {
    return {
        type: actionTypes.GET_ALL_DATA,
        data: data
    }
}

export const getAllTests = () => {
    return dispatch => {
        axios.get("leaderboard.json")
            .then(response => {
                const tests = [];
                for(let h in response.data){
                    tests.push({
                        ...response.data[h],
                        id: h
                    });
                }
                dispatch(getTests(tests));
            }).catch(err => {
                console.log(err);
            })
    }
}

const postTesttoStore = (data) => {
    return {
        type: actionTypes.POST_DATA,
        data: data
    }
}

export const postTest = (data) => {
    return dispatch => {
        axios.post("leaderboard.json", data)
            .then(response => {
                const newData = {
                    ...data,
                    id: response.name
                }
                dispatch(postTesttoStore(newData));
            }).catch(err => {
                console.log(err);
            })
    }
}