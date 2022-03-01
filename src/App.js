import React,{useEffect, useRef, useState} from "react";
import Board from "./components/Board/Board"
import Timer from "./components/Timer/Timer"
import './App.css';

function App() {
  const timerRef = useRef()
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
  useEffect(()=>{
  },[])
  const handleTimer = () =>{
    timerRef.current.resetTimer()
  }
  return (
    <div className="sudoku-game">
      <Timer duration={2} ref={timerRef} />
      <Board rows={rows} handleCellValueChange={handleCellValueChange} />
    </div>
  );
}

export default App;
