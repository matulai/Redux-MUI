import type { ToDoItem } from "../../types/toDoItem";

// ACTIONS
export const ADD_TO_DO_ITEM = "ADD_TO_DO_ITEM";
export const DELETE_TO_DO_ITEM = "DELETE_TO_DO_ITEM";
export const UPDATE_TO_DO_ITEM = "UPDATE_TO_DO_ITEM";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";


export const VisibilityFilters = {
    SHOW_ALL: "SHOW_ALL",
    ON_GOING: "ON_GOING",
    WAITING: "WAITING",
    INACTIVE: "INACTIVE"
};

// ACTIONS CREATORS
function addToDoItem(toDoItem: ToDoItem) {
    return {
        type: ADD_TO_DO_ITEM,
        payload: toDoItem
    }
}

function deleteToDoItem(index: number) {
    return {
        type: DELETE_TO_DO_ITEM,
        payload: index
    }
}

function updateToDoItem(toDoItem: ToDoItem, index: number) {
    return {
        type: UPDATE_TO_DO_ITEM,
        payload: {item: toDoItem, index: index}
    }
}

function setVisibilityFilter(filter: string) {
    return {
        type: SET_VISIBILITY_FILTER,
        payload: filter
    }
}

export { addToDoItem, deleteToDoItem, updateToDoItem, setVisibilityFilter };