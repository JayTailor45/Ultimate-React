import './App.css';
import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
    questions: [],

    // loading, error, ready, active, finished
    status: 'loading',

    index: 0,

    answer: null,

    points: 0,

    highscore: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            };
        case 'start':
            return {
                ...state,
                status: 'active'
            };
        case 'newAnswer':
            const question = state.questions[state.index];
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            };
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            };
        case 'finish':
            return {
                ...state,
                status: 'finish',
                highscore: state.points > state.highscore ? state.points : state.highscore
            };
        case 'restart':
            return {
                ...state,
                status: 'ready',
                index: 0,
                answer: null,
                points: 0,
            };
        default:
            return state;
    }
}


function App() {

    const [{questions, status, index, answer, points, highscore}, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((acc, cur) => acc += cur.points, 0)

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => dispatch({type: 'dataReceived', payload: data}))
            .catch(err => dispatch({type: 'dataFailed'}))
            .finally(() => {
            })
    }, []);

    return (
        <div className="app">

            <Header/>

            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error' && <Error/>}
                {status === 'ready' && <StartScreen numOfQuestions={numQuestions} dispatch={dispatch}/>}
                {status === 'active' && (
                    <>
                        <Progress index={index} numQuestions={numQuestions} points={points}
                                  maxPossiblePoints={maxPossiblePoints} answer={answer}/>
                        <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
                        <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
                    </>
                )}
                {status === 'finish' &&
                    <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore}
                                  dispatch={dispatch}/>}
            </Main>
        </div>
    );
}

export default App;