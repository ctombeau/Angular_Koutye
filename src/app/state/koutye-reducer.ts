import {ActionReducer, createReducer, MetaReducer, on} from '@ngrx/store';
import { changeUsername, initAction } from './koutye-action';
import { state } from '@angular/animations';

const initialState= {
    appName : 'Koutye',
    user:{
        username: '',
        isAdmin: false
    }
}

function log(reducer: ActionReducer<any>) : ActionReducer<any>{
    return (state, action)=>{
        const currentState = reducer(state, action);
        console.groupCollapsed(action.type)
        console.log("Action: ", action)
        console.log("Etat precedent: ", state);
        console.log("Etat suivant: ", currentState);
        console.groupEnd();
        return currentState;
    }
}

export const metaReducers: MetaReducer[]=[log];

export const rootReducer = createReducer(initialState,
    on(initAction,(state)=>{
        return{
            ...state,
            user:{
                ...state.user,
                isAdmin:true
            }
        }
    }),
    on(changeUsername, (state,props)=>{
        return{
            ...state,
            user:{
                ...state.user,
                username:props.username
            }
        }
    })
);