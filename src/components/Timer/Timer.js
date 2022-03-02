import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

function TimerHandler(props, ref) {
    const Duration = 2 * 60 - 1;
    let [timer, setTimer] = useState(Duration)
    let [seconds, setSeconds] = useState('00')
    let [minutes, setMinutes] = useState('02')
    const [isActive, setIsActive] = useState(true);

    useImperativeHandle(ref, () => ({
        resetTimer: () => reset(),
        endTimer: () => pause()
    }))
    function playSound() {
        const audio = new Audio(require('../../assets/alert.mp3'));
        audio.play();
      }
    function reset() {
        setTimer(Duration);
        setIsActive(true);
    }
    function pause() {
        setIsActive(false);
    }
    useEffect(() => {
        let min, sec;
        let intervalTimer = null;
        clearInterval(intervalTimer);
        if (isActive) {
            intervalTimer = setInterval(function () {
                min = parseInt(timer / 60, 10);
                sec = parseInt(timer % 60, 10);

                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                setMinutes(min)
                setSeconds(sec)
                if(timer == 10){
                    playSound()
                }
                if (timer > 0) {
                    setTimer(--timer)
                } else {
                    clearInterval(intervalTimer)
                    intervalTimer = null
                    props.handleUserLost()
                }
            }, 1000);
        } else {
            clearInterval(intervalTimer)
        }

        return () => clearInterval(intervalTimer);
    }, [timer])

    return (
        <div>
            <div style={{ fontSize: '50px', fontWeight: 'bold', paddingBottom: '25px' }}>{`${minutes} : ${seconds}`}</div>
        </div>
    )
}

TimerHandler = forwardRef(TimerHandler)
export default TimerHandler
