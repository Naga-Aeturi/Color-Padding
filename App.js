import "./styles.css";
import React, { useState } from "react";
import { CirclePicker } from "react-color";
const undoArray = [];
const redoArray = [];
export default function App() {
  const [circleColor, setCircleColor] = useState("white");
  const [squareColors, setSquareColors] = useState(
    JSON.parse(localStorage.getItem("SavedColors")) ??
      Array(256).fill("#FFFFFF")
  );

  function handleColor(colorName) {
    let hexCode = colorName.hex;
    setCircleColor(hexCode);
  }

  function handleClick(index) {
    let newSquareColors = [...squareColors];
    undoArray.push(squareColors);
    newSquareColors[index] = circleColor;
    setSquareColors(newSquareColors);
    localStorage.setItem("SavedColors", JSON.stringify(newSquareColors));
  }

  function handleReset() {
    setSquareColors(Array(256).fill("#FFFFFF"));
    localStorage.setItem(
      "SavedColors",
      JSON.stringify(Array(256).fill("#FFFFFF"))
    );
  }
  function handleMouseEnter(event) {
    // console.log(event.target);
    event.target.style.backgroundColor = circleColor;
  }
  function handleUndo() {
    if (undoArray.length > 0) {
      redoArray.push(squareColors);
      let past = undoArray.pop();
      setSquareColors(past);
      localStorage.setItem("SavedColors", JSON.stringify(past));
    }
  }
  function handleRedo() {
    if (redoArray.length > 0) {
      undoArray.push(squareColors);
      let next = redoArray.pop();
      setSquareColors(next);
      localStorage.setItem("SavedColors", JSON.stringify(next));
    }
  }
  return (
    <div className="container">
      <div>
        <h1 className="titleStyle">Color-Padding</h1>
      </div>
      <div className="div2">
        <CirclePicker className="gridStyle" onChange={handleColor} />
      </div>
      <div className="gridWrapperStyle">
        <div className="containerStyle">
          <Container
            squareColors={squareColors}
            onSquareClick={handleClick}
            onMouseEnter={handleMouseEnter}
          />
        </div>
      </div>
      <div className="buttonStyle">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
    </div>
  );
}

const Container = ({ squareColors, onSquareClick, onMouseEnter }) => {
  let res = squareColors.map((color, index) => {
    return (
      <Square
        key={index}
        color={color}
        onSquareClick={() => onSquareClick(index)}
        onSquareMouseEnter={onMouseEnter}
        onSquareMouseLeave={(event) => {
          event.target.style.backgroundColor = squareColors[index];
        }}
      />
    );
  });

  return res;
};

const Square = ({
  color,
  onSquareClick,
  onSquareMouseEnter,
  onSquareMouseLeave
}) => {
  const squareStyle = {
    width: "1em",
    height: "1em",
    border: "1px solid #000",
    backgroundColor: color
  };

  return (
    <div
      style={squareStyle}
      onClick={onSquareClick}
      onMouseEnter={onSquareMouseEnter}
      onMouseLeave={onSquareMouseLeave}
    />
  );
};
