import type { RootState } from "../redux/store/store";
import { visibilityFilters } from "../redux/actions/actions";

export function selectVisibleToDos(state: RootState) {
  const { toDoList, visibilityFilter } = state;

  switch (visibilityFilter) {
    case visibilityFilters.SHOW_ALL:
      return toDoList;
    case visibilityFilters.ON_GOING:
      return toDoList.filter(item => item.status === "ON_GOING");
    case visibilityFilters.WAITING:
      return toDoList.filter(item => item.status === "WAITING");
    case visibilityFilters.INACTIVE:
      return toDoList.filter(item => item.status === "INACTIVE");
    default:
      return toDoList;
  }
}
