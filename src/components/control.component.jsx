import React from "react";

function Control({ type, length, handleClick }) {
    return (
        <div className="control">
            <p className="control-title" id={`${type}-label`}>
                {type}
            </p>
            <div className="input-group">
                <button
                    className="btn"
                    id={`${type}-decrement`}
                    value={type}
                    onClick={handleClick}
                >
                    <i className="ph-minus-bold"></i>
                </button>
                <span className="length-number" id={`${type}-length`}>
                    {length}
                </span>
                <button
                    className="btn"
                    id={`${type}-increment`}
                    value={type}
                    onClick={handleClick}
                >
                    <i className="ph-plus-bold"></i>
                </button>
            </div>
        </div>
    );
}

export default Control;
