import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import Board from "./components/Board/Board"
import Timer from "./components/Timer/Timer"
import Popup from "./components/Popup/Popup";
import './App.css';

function App() {
  const timerRef = useRef()
  const [show, setShow] = useState(false)
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
  useEffect(() => {
  }, [])
  const handleTimer = () => {
    timerRef.current.resetTimer()
  }
  const closePopup = () => {
    setShow(false)
  }
  return (
    <div className="sudoku-game">
      <Timer duration={2} ref={timerRef} />
      <Board rows={rows} handleCellValueChange={handleCellValueChange} />
      {ReactDOM.createPortal(<Popup show={show} closePopup={closePopup} />, document.getElementById("model-alert"))}
    </div>
  );
}

export default App;
