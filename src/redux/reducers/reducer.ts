import { VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TO_DO_ITEM, DELETE_TO_DO_ITEM, UPDATE_TO_DO_ITEM } from "../actions/actions";
import type { ToDoItem } from "../../types/toDoItem";

type ToDoAction =
  | { type: 'SET_VISIBILITY_FILTER'; payload: string }
  | { type: 'ADD_TO_DO_ITEM'; payload: ToDoItem}
  | { type: 'DELETE_TO_DO_ITEM'; payload: number}
  | { type: 'UPDATE_TO_DO_ITEM'; payload: {toDoItem: ToDoItem, index: number}}

interface ToDoState {
    visibilityFilter: string,
    toDoList: ToDoItem[]
}

const initialState: ToDoState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    toDoList: []
}

function toDoApp(state = initialState, action: ToDoAction) {
    switch(action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.payload
            })
        case ADD_TO_DO_ITEM:
            return Object.assign({}, state, {
                toDoList: [...state.toDoList, action.payload]
            });
        case DELETE_TO_DO_ITEM:
            return Object.assign({}, state, {
                toDoList: state.toDoList.filter((_, index) => index !== action.payload),
            });
        case UPDATE_TO_DO_ITEM:
            return Object.assign({}, state, {
                toDoList: state.toDoList.map((toDoItem, index) => index === action.payload.index? action.payload.toDoItem: toDoItem)
            });
        default:
            return state;
    }
}

export { toDoApp };