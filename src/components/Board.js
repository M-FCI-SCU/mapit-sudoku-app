import React from "react";
import "./Board.css"

export default function Board({rows, handleCellValueChange}) {

    const changeCellValue = (e, row, col) => {
        let char = e.nativeEvent.data
        if (parseInt(char) >= 1 && parseInt(char) <= 4) {
            let arr = [...rows]
            arr[row][col].value = char
            handleCellValueChange(arr)
        }
    }
    const handleKeyDown = (e, row, col) => {
        if (e.keyCode === 37) {
            //========Left========
            if (col > 0) {
                col--;
                document.getElementById(`cell_${row}_${col}`).focus();
            }

        } else if (e.keyCode === 38) {
            //========UP========
            if (row > 0) {
                row--;
                document.getElementById(`cell_${row}_${col}`).focus();
            }


        } else if (e.keyCode === 39) {
            //========Right========
            if (col < 3) {
                col++;
                document.getElementById(`cell_${row}_${col}`).focus();
            }

        } else if (e.keyCode === 40) {
            //========Down========
            if (row < 3) {
                row++;
                document.getElementById(`cell_${row}_${col}`).focus();
            }

        }

    }
    return (
        <div className="board-card">
            <div className="cells-container">
                {rows.map((row, row_index) => {
                    return row.map(
                        (col, col_index) => (
                            <input
                                id={`cell_${row_index}_${col_index}`}
                                key={`cell_${row_index}_${col_index}`}
                                className="cell"
                                style={{backgroundColor: col.readonly ? '#3F51B5' : ''}}
                                type="number"
                                value={col.value}
                                onChange={(e) => changeCellValue(e, row_index, col_index)}
                                onKeyDown={(e) => handleKeyDown(e, row_index, col_index)}
                                readOnly={col.readonly}
                            ></input>
                        )
                    )
                })}

            </div>
        </div>
    )
}