import "./App.scss";
import { useState } from "react";
import Control from "./components/control.component";

const CONTROL_TYPE = {
    SESSION: "session",
    BREAK: "break",
};

function App() {
    const [isStart, setIsStart] = useState(false);
    const [length, setLength] = useState({
        break: 5,
        session: 25,
    });

    const handleStartStop = () => {
        setIsStart(!isStart);
    };

    const handleLength = (event) => {
        const sessionType = event.currentTarget.value;
        const isIncrement = event.currentTarget.id.includes("increment");

        if (
            (length[sessionType] - 1 < 1 && isIncrement === false) ||
            (length[sessionType] + 1 > 60 && isIncrement === true)
        ) {
            return;
        }

        if (isIncrement) {
            setLength({ ...length, [sessionType]: length[sessionType] + 1 });
        } else {
            setLength({ ...length, [sessionType]: length[sessionType] - 1 });
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="pomodoro-box">
                    <div className="pomodoro">
                        <div className="timer-box">
                            <p className="timer" id="time-left">
                                25:00
                            </p>
                            <p className="timer-label" id="timer-label">
                                Session
                            </p>
                        </div>
                        <button
                            className="btn btn-startStop"
                            id="time-stop"
                            onClick={handleStartStop}
                        >
                            <i className={isStart ? "ph-pause" : "ph-play"}></i>
                        </button>
                        <div className="control-box">
                            <Control
                                type={CONTROL_TYPE.BREAK}
                                length={length.break}
                                handleClick={handleLength}
                            />
                            <Control
                                type={CONTROL_TYPE.SESSION}
                                length={length.session}
                                handleClick={handleLength}
                            />
                        </div>
                        <div className="option-box">
                            <button className="btn" id="reset">
                                <i className="ph-clock-clockwise-bold"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
