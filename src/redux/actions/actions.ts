import type { ToDoItem } from "../../types/toDoItem";

// ACTIONS
export const ADD_TO_DO_ITEM = "ADD_TO_DO_ITEM";
export const DELETE_TO_DO_ITEM = "DELETE_TO_DO_ITEM";
export const EDIT_TO_DO_ITEM = "EDIT_TO_DO_ITEM";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const visibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  ON_GOING: "ON_GOING",
  WAITING: "WAITING",
  INACTIVE: "INACTIVE",
};

// ACTIONS CREATORS
function addToDoItem(toDoItem: ToDoItem) {
  return {
    type: ADD_TO_DO_ITEM,
    payload: toDoItem,
  };
}

function deleteToDoItem(id: string) {
  return {
    type: DELETE_TO_DO_ITEM,
    payload: id,
  };
}

function editToDoItem(id: string, description: string, status: string) {
  return {
    type: EDIT_TO_DO_ITEM,
    payload: { id: id, description: description, status: status },
  };
}

function setVisibilityFilter(filter: string) {
  return {
    type: SET_VISIBILITY_FILTER,
    payload: filter,
  };
}

export { addToDoItem, deleteToDoItem, editToDoItem, setVisibilityFilter };
