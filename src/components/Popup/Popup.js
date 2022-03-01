import React from "react";
import "./Popup.css"
export default function Popup({ show, closePopup }) {
    return (
        <React.Fragment>
            {show && <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="model-message">You've Won</div>
                        <div className="model-actions">
                            <button className="button">Play Again</button>
                            <button className="button" onClick={closePopup}>Exist</button>
                        </div>
                    </div>
                </div>

            </div>}
        </React.Fragment>
    )
}