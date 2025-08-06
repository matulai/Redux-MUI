import {
  visibilityFilters,
  SET_VISIBILITY_FILTER,
  ADD_TO_DO_ITEM,
  DELETE_TO_DO_ITEM,
  EDIT_TO_DO_ITEM,
} from "../actions/actions";
import type { ToDoItem } from "../../types/toDoItem";

type ToDoAction =
  | { type: "SET_VISIBILITY_FILTER"; payload: string }
  | { type: "ADD_TO_DO_ITEM"; payload: ToDoItem }
  | { type: "DELETE_TO_DO_ITEM"; payload: string }
  | {
      type: "EDIT_TO_DO_ITEM";
      payload: { id: string; description: string; status: string };
    };

interface ToDoState {
  visibilityFilter: string;
  toDoList: ToDoItem[];
}

const initialState: ToDoState = {
  visibilityFilter: visibilityFilters.SHOW_ALL,
  toDoList: [],
};

function toDoApp(state = initialState, action: ToDoAction) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.payload,
      });
    case ADD_TO_DO_ITEM:
      return Object.assign({}, state, {
        toDoList: [...state.toDoList, action.payload],
      });
    case DELETE_TO_DO_ITEM:
      return Object.assign({}, state, {
        toDoList: state.toDoList.filter(item => item.id !== action.payload),
      });
    case EDIT_TO_DO_ITEM:
      return Object.assign({}, state, {
        toDoList: state.toDoList.map(toDoItem =>
          toDoItem.id === action.payload.id
            ? {
                ...toDoItem,
                description: action.payload.description,
                status: action.payload.status,
              }
            : toDoItem
        ),
      });
    default:
      return state;
  }
}

export { toDoApp };
