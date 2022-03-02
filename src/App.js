import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import Board from "./components/Board/Board"
import Timer from "./components/Timer/Timer"
import Popup from "./components/Popup/Popup";
import './App.css';

function App() {
  const timerRef = useRef()
  const [show, setShow] = useState(false)
  const [rows, setCellValue] = useState([])
  const [message, setMessage] = useState("Good luck next time")
  useEffect(() => {
    let result = generateSudokuGame()
    setCellValue([...result])
  }, [])
  const generateSudokuGame = () => {
    let arr = [1, 2, 3, 4].map(() => [1, 2, 3, 4].map(() => ({ value: "", readonly: false })));
    let row,col;
    let clues = [];
    [1, 2, 3, 4].forEach(element => {
      let is_exist = true;
      while (is_exist) {
         row = Math.floor(Math.random() * 4);
         col = Math.floor(Math.random() * 4);
        if (!clues.find(clue=> clue[0] == row || clue[1] == col)) {
          arr[row][col] = { value: element + '', readonly: true }
          clues.push([row,col])
          is_exist = false
        }
      }
    })
    return arr
  }

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
    handleUserWon()
  }
  const checkForDublicateAndEmptyValue = (arry) => {
    let emptyExist = false
    let dublicatedElementsExist = arry.filter((item, index) => {
      if (item.value == "") {
        emptyExist = true
      }
      if (item.value != "" && arry.findIndex(elem => elem.value == item.value) !== index) {
        return true
      }
    })
    if (dublicatedElementsExist.length > 0 || emptyExist) {
      return true;
    } else {
      return false
    }
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
    let result = generateSudokuGame()
    setCellValue([...result])
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
