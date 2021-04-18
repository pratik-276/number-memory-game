import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
    board: []
}

const LeaderBoard = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.GET_ALL_DATA:
            return updateObject(state, {
                board: action.data
            });
        default:
            return state;
    }
}
 
export default LeaderBoard;