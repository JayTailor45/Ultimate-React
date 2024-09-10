import {useEffect} from "react";

function Timer({secondsRemaining, dispatch}) {

    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type: 'tick'});
        }, 1000)

        return () => clearInterval(id);
    }, [dispatch])

    return (
        <div className="timer">
            {mins < 10 && "0"}{mins}:{secs}{secs < 10 && "0"}
        </div>
    );
}

export default Timer;