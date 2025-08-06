import { useState } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

interface CheckedBoxProps {
  handleSetFilter: (filter: string) => void;
  filter: string;
  setHasAFilterChecked: () => void;
  hasAFilterChecked: boolean;
}

const CheckedBox = ({
  handleSetFilter,
  filter,
  setHasAFilterChecked,
  hasAFilterChecked,
}: CheckedBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isChecked) {
      handleSetFilter(filter);
    }
    setHasAFilterChecked();
    setIsChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          disabled={hasAFilterChecked && !isChecked}
          color="default"
        />
      }
      label={filter}
    />
  );
};

export default CheckedBox;
