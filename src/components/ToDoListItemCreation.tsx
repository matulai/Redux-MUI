import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import Status from "../types/status";
import type { ToDoItem } from "../types/toDoItem";

interface ToDoListItemCreation {
  handleSave: (description: string, status: string) => void;
  handleClose: () => void;
  toDoItem?: ToDoItem;
}

const colors = {
  0: "#00b71bff",
  1: "#b0cf01ff",
  2: "#bd1c00ff",
};

const ToDoListItemCreation = ({
  handleSave,
  handleClose,
  toDoItem,
}: ToDoListItemCreation) => {
  const [status, setStatus] = useState<number>(
    toDoItem ? Status[toDoItem.status] : 0
  );
  const [description, setDescription] = useState(
    toDoItem ? toDoItem.content : ""
  );

  function nextStatus() {
    if (status < 2) {
      setStatus(prev => prev + 1);
    } else {
      setStatus(0);
    }
  }

  return (
    <>
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
          value={description}
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
          onClick={() => handleSave(description, Status[status])}
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
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default ToDoListItemCreation;
