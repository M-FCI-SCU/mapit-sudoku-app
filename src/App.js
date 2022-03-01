import React,{useState} from "react";
import Board from "./components/Board"
import './App.css';

function App() {
  let FlexableCell = { value: "", readonly: false }
  const data = [
    [{ ...FlexableCell }, { ...FlexableCell }, { ...FlexableCell }, { value: "4", readonly: true }],
    [{ ...FlexableCell }, { value: "1", readonly: true }, { ...FlexableCell }, { ...FlexableCell }],
    [{ ...FlexableCell }, { ...FlexableCell }, { value: "3", readonly: true }, { ...FlexableCell }],
    [{ ...FlexableCell }, { value: "2", readonly: true }, { ...FlexableCell }, { ...FlexableCell }]
  ]
  const [rows, setCellValue] = useState([...data])
  const handleCellValueChange = (payload) => {
    setCellValue(payload)
  }
  return (
    <div className="App">
      <Board rows={rows} handleCellValueChange={handleCellValueChange} />
    </div>
  );
}

export default App;
