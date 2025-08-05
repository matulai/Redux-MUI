import { Box, List, Button, Container, TextField } from "@mui/material";
import ToDoListItem from "./components/ToDoListItem";
import type { ToDoItem } from "./types/toDoItem";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store/store";
import Status from "./types/status";
import { useState } from "react";
import { addToDoItem } from "./redux/actions/actions";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const colors = {
  0: "#00b71bff",
  1: "#b0cf01ff",
  2: "#bd1c00ff",
};

function App() {
  const [status, setStatus] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState("");
  const toDoList: ToDoItem[] = useSelector(
    (state: RootState) => state.toDoList
  );
  const dispatch = useDispatch<AppDispatch>();

  function nextStatus() {
    if (status < 2) {
      setStatus(prev => prev + 1);
    } else {
      setStatus(0);
    }
  }

  function addItem() {
    if (description.trim() !== "") {
      const id = uuidv4();
      dispatch(
        addToDoItem({ id: id, content: description, status: Status[status] })
      );
      setDescription("");
      setIsAdding(!isAdding);
    }
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
          >
            Filters
          </Button>
        </Box>
        {isAdding ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              borderTop: 1,
              p: 2,
            }}
          >
            <Button
              sx={{
                color: "secondary.main",
                bgcolor: `${colors[status]}`,
                border: "1.5px solid ",
              }}
              onClick={nextStatus}
            >
              {Status[status]}
            </Button>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { width: 1 }, width: 1 }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                variant="filled"
                maxRows={4}
                multiline
                color="secondary"
                onChange={e => setDescription(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
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
                onClick={addItem}
              >
                Confirm
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
                onClick={() => setIsAdding(!isAdding)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : null}
        <List sx={{ width: 1, borderTop: 1 }}>
          {toDoList.map(toDo => (
            <ToDoListItem toDoItem={toDo} key={toDo.id} />
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
