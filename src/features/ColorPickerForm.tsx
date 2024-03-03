import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./styles/ColorPickerForm.scss";

interface ColorPickerFormProps {
  addNewColor: (newColor: { color: string; name: string }) => void;
  paletteIsFull: boolean;
  colors: { color: string; name: string }[];
}

const ColorPickerForm: React.FC<ColorPickerFormProps> = (props) => {
  const [currentColor, setCurrentColor] = useState("#EF5959");
  const [newColorName, setNewColorName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", () => {
      return props.colors.every(
        ({ color }) => color.toLowerCase() !== currentColor.toLowerCase()
      );
    });
  }, [currentColor, props.colors]);

  const updateCurrentColor = (color: { hex: string }) =>
    setCurrentColor(color.hex);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewColorName(e.target.value);
  };

  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    props.addNewColor(newColor);
    setNewColorName("");
  };

  return (
    <div>
      <ChromePicker
        className="CPF-picker"
        color={currentColor}
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm
        autoComplete="off"
        onSubmit={handleSubmit}
        instantValidate={false}
      >
        <TextValidator
          id="filled-error-helper-text"
          label="Color Name"
          value={newColorName}
          className="CPF-colorNameInput"
          name="newColorName"
          variant="filled"
          margin="normal"
          onChange={handleChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Color name is required",
            "Name must be unique",
            "You already used this color",
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          className="CPF-addColor"
          type="submit"
          disabled={props.paletteIsFull}
          style={{
            backgroundColor: props.paletteIsFull ? "grey" : currentColor,
          }}
        >
          {props.paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;
