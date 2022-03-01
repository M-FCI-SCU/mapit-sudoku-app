import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import Board from "./components/Board/Board"
import Timer from "./components/Timer/Timer"
import Popup from "./components/Popup/Popup";
import './App.css';

function App() {
  const timerRef = useRef()
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("Good luck next time")
  let FlexableCell = { value: "", readonly: false }
  const data = [
    [{ ...FlexableCell }, { ...FlexableCell }, { ...FlexableCell }, { value: "4", readonly: true }],
    [{ ...FlexableCell }, { value: "1", readonly: true }, { ...FlexableCell }, { ...FlexableCell }],
    [{ ...FlexableCell }, { ...FlexableCell }, { value: "3", readonly: true }, { ...FlexableCell }],
    [{ value: "2", readonly: true }, { ...FlexableCell }, { ...FlexableCell }, { ...FlexableCell }]
  ]
  const [rows, setCellValue] = useState([...data])
  const handleCellValueChange = (payload) => {
    setCellValue(payload)
    for (var i = 0; i < 4; i++) {
      let row_check = checkForDublicateAndEmptyValue(rows[i])
      if (row_check) {
        return;
      }
      let arr = []
      for (var j = 0; j < 4; j++) {
        arr.push(rows[i][j])
      }
      let col_check = checkForDublicateAndEmptyValue(arr)
      if (col_check) {
        return;
      }
    }
  }
  const checkForDublicateAndEmptyValue = (arry) => {
    let emptyExist = false
    let dublicatedElementsExist = arry.filter((item, index) => {
      if (item.value != "" && arry.findIndex(elem => elem.value == item.value) !== index) {
        return true
      } else if (item.value == "") {
        emptyExist = true
      }
    })
    if (dublicatedElementsExist.length > 0 || emptyExist) {
      return true;
    }
    handleUserWon()
  }
  const handleUserWon = () => {
    timerRef.current.endTimer()
    setMessage("You've Won")
    setShow(true)
  }
  const handleUserLost = () => {
    setMessage("Good luck next time")
    setShow(true)
  }
  const handlePlayAgain = () => {
    closePopup()
    timerRef.current.resetTimer()
    setCellValue([...data])
  }
  const closePopup = () => {
    setShow(false)
  }
  return (
    <div className="sudoku-game">
      <Timer handleUserLost={handleUserLost} duration={2} ref={timerRef} />
      <Board rows={rows} handleCellValueChange={handleCellValueChange} />
      {ReactDOM.createPortal(<Popup show={show} message={message} closePopup={closePopup} handlePlayAgain={handlePlayAgain} />, document.getElementById("model-alert"))}
    </div>
  );
}

export default App;
