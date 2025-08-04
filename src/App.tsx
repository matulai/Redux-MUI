import {
  Box,
  List,
  Button,
  ListItem,
  Checkbox,
  Container,
  IconButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ToDoItem } from "./types/toDoItem";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store/store";
import "./App.css";
import { WidthFull } from "@mui/icons-material";

function App() {
  const toDoList: ToDoItem[] = useSelector(
    (state: RootState) => state.toDoList
  );

  return (
    <Container sx={{ p: 8 }}>
      <Box
        sx={{
          flexDirection: "column",
          borderRadius: 3,
          bgcolor: "primary.main",
          display: "flex",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button sx={{ color: "secondary.main" }}>Add</Button>
          <Button sx={{ color: "secondary.main" }}>Add</Button>
        </Box>
        <List sx={{ p: 2, width: 1 }}>
          {toDoList.map(toDo => (
            <ListItem>
              {toDo.content}
              {toDo.status}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
