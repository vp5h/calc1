import { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [nums, setNums] = useState([...Array(9).keys(), -1].map((i) => i + 1));
  const inputRef = useRef("");
  const [finalRes, setFinalRes] = useState(0);
  const [inputValue, setInputValue] = useState("");
  let operators = ["+", "*", "-", "/", "="];

  const handleEdgeCase = (inputVal) => {
    let nonReptableOperators = ["+", "*", "-", "/", "="];
    if (nonReptableOperators.includes(inputVal)) {
      if (inputValue.length === 0) {
        return false;
      }
      if (nonReptableOperators.includes(inputValue[inputValue.length - 1])) {
        return false;
      }
      return true;
    }
    return true;
  };

  return (
    <div className="App">
      <div>
        <input value={inputValue} />
      </div>

      {/* {JSON.stringify(finalRes)} */}
      <div className="resClear">
        <div>{finalRes}</div>
        <button
          onClick={() => {
            setFinalRes(0);
            setInputValue("");
          }}
        >
          Clear
        </button>
      </div>
      <div
        className="grid"
        onClick={(e) => {
          let each = e.target.textContent;
          if (!handleEdgeCase(each)) return;

          if (each === "=") {
            setInputValue("");
            setFinalRes(eval(inputValue));
          } else if (each === "Clear") {
            setFinalRes(0);
            setInputValue("");
          } else {
            setInputValue((curr) => curr + each);
          }
        }}
      >
        {nums.map((each) => {
          return (
            <button className="cell" key={each}>
              {each}
            </button>
          );
        })}
        {operators.map((each) => {
          return (
            <button key={each} disabled={!handleEdgeCase(each)}>
              {each}
            </button>
          );
        })}
      </div>
    </div>
  );
}
