import React from "react";
import "./Popup.css"
export default function Popup({ show, message, closePopup, handlePlayAgain }) {
    return (
        <React.Fragment>
            {show && <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="model-message">{message}</div>
                        <div className="model-actions">
                            <button className="button" onClick={handlePlayAgain}>Play Again</button>
                            <button className="button" onClick={closePopup}>Exist</button>
                        </div>
                    </div>
                </div>

            </div>}
        </React.Fragment>
    )
}