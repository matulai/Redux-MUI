import {
  ListItem,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { ToDoItem } from "../types/toDoItem";
import * as React from "react";

interface ToDoListItemProps {
  toDoItem: ToDoItem;
}

const colors = {
  0: "#00b71bff",
  1: "#b0cf01ff",
  2: "#bd1c00ff",
};

const options = ["Delete", "Edit"];

const ToDoListItem = ({ toDoItem }: ToDoListItemProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <ListItem
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
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
            bgcolor: `${colors[toDoItem.status]}`,
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
            <MenuItem key={option} onClick={handleMenuClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Typography fontSize={20}>{toDoItem.content}</Typography>
    </ListItem>
  );
};

export default ToDoListItem;
