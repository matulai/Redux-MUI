import { Box, List, Button, Container, FormGroup } from "@mui/material";
import type { AppDispatch } from "./redux/store/store";
import type { ToDoItem } from "./types/toDoItem";
import {
  addToDoItem,
  setVisibilityFilter,
  visibilityFilters,
} from "./redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { selectVisibleToDos } from "./selectors/selectVisibleToDos";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoListItemCreation from "./components/ToDoListItemCreation";
import ToDoListItem from "./components/ToDoListItem";
import CheckedBox from "./components/CheckedBox";
import "./App.css";

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [isChoosingFilters, setIsChoosingFilters] = useState(false);
  const [hasAFilterChecked, setHasAFilterChecked] = useState(false);

  const toDoList: ToDoItem[] = useSelector(selectVisibleToDos);
  const dispatch = useDispatch<AppDispatch>();
  console.log("render");

  function addItem(description: string, status: string) {
    if (description.trim() !== "") {
      const id = uuidv4();
      dispatch(addToDoItem({ id: id, content: description, status: status }));
      handleCloseIsAdding();
    }
  }

  function handleCloseIsAdding() {
    setIsAdding(!isAdding);
  }

  function handleSetFilter(filter: string) {
    dispatch(setVisibilityFilter(filter));
  }

  function handleSetHasFilterChecked() {
    // Se tiene en cuenta el siguiente estado no el actual, uso exclusivo para checkboxs
    if (hasAFilterChecked) {
      dispatch(setVisibilityFilter("SHOW_ALL"));
    }
    setHasAFilterChecked(!hasAFilterChecked);
  }

  return (
    <Container sx={{ p: 8 }}>
      <Box
        sx={{
          flexDirection: "column",
          borderRadius: 3,
          bgcolor: "primary.main",
          display: "flex",
          gap: 1,
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            disabled={isAdding}
            sx={{
              color: "primary.main",
              bgcolor: "primary.dark",
              border: "1.5px solid ",
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "primary.main",
              },
            }}
            onClick={() => setIsAdding(!isAdding)}
          >
            Add
          </Button>
          <Button
            sx={{
              color: "primary.main",
              bgcolor: "primary.dark",
              border: "1.5px solid ",
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "primary.main",
              },
            }}
            onClick={() => setIsChoosingFilters(!isChoosingFilters)}
          >
            Filters
          </Button>
        </Box>
        {isChoosingFilters ? (
          <FormGroup sx={{ flexDirection: "row", borderTop: 1 }}>
            {Object.keys(visibilityFilters).map(filter =>
              filter !== "SHOW_ALL" ? (
                <CheckedBox
                  key={filter}
                  handleSetFilter={() => handleSetFilter(filter)}
                  filter={filter}
                  hasAFilterChecked={hasAFilterChecked}
                  setHasAFilterChecked={handleSetHasFilterChecked}
                />
              ) : null
            )}
          </FormGroup>
        ) : null}
        {isAdding ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              borderTop: 1,
              paddingTop: 1,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <ToDoListItemCreation
              handleClose={handleCloseIsAdding}
              handleSave={addItem}
            />
          </Box>
        ) : null}
        <List sx={{ width: 1, borderTop: 1, p: 0 }}>
          {toDoList.map(toDo => (
            <ToDoListItem toDoItem={toDo} key={toDo.id} />
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
