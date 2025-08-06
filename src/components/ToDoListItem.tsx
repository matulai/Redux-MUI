import {
  ListItem,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { deleteToDoItem, editToDoItem } from "../redux/actions/actions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store/store";
import type { ToDoItem } from "../types/toDoItem";
import ToDoListItemCreation from "./ToDoListItemCreation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Status from "../types/status";
import * as React from "react";

interface ToDoListItemProps {
  toDoItem: ToDoItem;
}

const colors = {
  0: "#00b71bff",
  1: "#b0cf01ff",
  2: "#bd1c00ff",
};

const ToDoListItem = ({ toDoItem }: ToDoListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleDeleteItem() {
    handleMenuClose();
    dispatch(deleteToDoItem(toDoItem.id));
  }

  function handleEditItem() {
    handleMenuClose();
    setIsEditing(true);
  }

  function saveEdit(description: string, status: string) {
    if (description !== "") {
      if (description !== toDoItem.content || status !== toDoItem.status) {
        setIsEditing(false);
        dispatch(editToDoItem(toDoItem.id, description, status));
      }
    }
  }

  const options = [
    { text: "Delete", handler: handleDeleteItem },
    { text: "Edit", handler: handleEditItem },
  ];

  return (
    <ListItem
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderBottom: 1,
        gap: 1,
      }}
    >
      {isEditing ? (
        <ToDoListItemCreation
          handleClose={() => setIsEditing(false)}
          handleSave={saveEdit}
          toDoItem={toDoItem}
        />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              width: 1,
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{
                color: "secondary.main",
                bgcolor: `${colors[Status[toDoItem.status]]}`,
                border: "1.5px solid ",
                cursor: "default",
              }}
            >
              {toDoItem.status}
            </Button>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
            >
              {options.map(option => (
                <MenuItem key={option.text} onClick={option.handler}>
                  {option.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography fontSize={20}>{toDoItem.content}</Typography>
        </>
      )}
    </ListItem>
  );
};

export default ToDoListItem;
