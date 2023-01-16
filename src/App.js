import "./App.scss";
import { useState, useEffect, useRef } from "react";
import Control from "./components/Control.jsx";

const CONTROL_TYPE = {
    SESSION: "session",
    BREAK: "break",
};

const minutesToMillis = (min) => min * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

function App() {
    const [isStart, setIsStart] = useState(false);
    const [length, setLength] = useState({
        break: 5,
        session: 15,
    });
    const [timeType, setTimeType] = useState("session");
    const [timeLeft, setTimeLeft] = useState(minutesToMillis(length.session));
    const intervalId = useRef(null);
    const alarm = useRef(null);

    const handleStartStop = () => {
        setIsStart(!isStart);
    };

    useEffect(() => {
        setTimeLeft(minutesToMillis(length.session));
    }, [length]);

    useEffect(() => {
        if (isStart) {
            intervalId.current = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1000);
            }, 1000);
        } else {
            clearInterval(intervalId.current);
        }

        return () => clearInterval(intervalId.current);
    }, [isStart]);

    useEffect(() => {
        if (timeLeft === 0) {
            alarm.current.play();
            if (timeType === "session") {
                setTimeType("break");
                setTimeLeft(minutesToMillis(length.break));
            } else {
                setTimeType("session");
                setTimeLeft(minutesToMillis(length.session));
            }
        }
    }, [timeType, timeLeft, length]);

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

    const handleReset = () => {
        clearInterval(intervalId.current);
        setIsStart(false);
        setLength({ session: 25, break: 5 });
        setTimeType("session");
        if (!alarm.current.ended) {
            alarm.current.pause();
            alarm.current.load();
        }
    };

    const minute =
        length.session === 60 ? 60 : Math.floor(timeLeft / 1000 / 60) % 60;
    const seconds = Math.floor(timeLeft / 1000) % 60;

    return (
        <div className="App">
            <div className="container">
                <div className="pomodoro-box">
                    <div className="pomodoro">
                        <div className="timer-box">
                            <p className="timer" id="time-left">
                                {formatTime(minute)}:{formatTime(seconds)}
                            </p>
                            <p className="timer-label" id="timer-label">
                                {timeType === "session" ? "Session" : "Break"}
                            </p>
                        </div>
                        <button
                            className="btn btn-startStop"
                            id="start_stop"
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
                            <button
                                className="btn"
                                id="reset"
                                onClick={handleReset}
                            >
                                <i className="ph-clock-clockwise-bold"></i>
                            </button>
                        </div>
                        <audio
                            id="beep"
                            ref={alarm}
                            src="https://www.dropbox.com/s/wmwkzenkp7jh3ip/alarm-pomodoro.mp3?dl=1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
