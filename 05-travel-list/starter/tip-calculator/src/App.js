import './App.css';
import {useState} from "react";

function Select({children, onChange, value}) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {children}
        </select>
    )
}

function Question({bill, onSetBill, children}) {
    return (
        <div>
            <div>{children}</div>
            <span>
                <input type="text" value={bill} onChange={e => onSetBill(+e.target.value)}/>
            </span>
        </div>
    );
}

function SelectQuestion({children, percentage, onSelect}) {
    return (
        <div>
            <div>{children}</div>
            <span>
                <Select value={percentage} onChange={(e) => onSelect(+e)}>
                    <option value="0">Dissatisfied (0%)</option>
                    <option value="5">It was okay (5%)</option>
                    <option value="10">It was good (10%)</option>
                    <option value="20">It was amazing (20%)</option>
                </Select>
            </span>
        </div>
    )
}

function Reset({onReset}) {
    return <button onClick={() => onReset()}>Reset</button>;
}

function Calculator() {
    const [bill, setBill] = useState(0);

    const [percentage1, setPercentage1] = useState(0);
    const [percentage2, setPercentage2] = useState(0);

    const tip = bill * ((percentage1 + percentage2) / 2) / 100;

    function handlePercentage1Change(value) {
        setPercentage1(value);
    }

    function handlePercentage2Change(value) {
        setPercentage2(value);
    }

    function handleReset() {
        setBill(0);
        setPercentage1(0);
        setPercentage2(0);
    }

    return (
        <>
            <Question bill={bill} onSetBill={setBill}>
                How much was the bill?
            </Question>
            <SelectQuestion percentage={percentage1} onSelect={handlePercentage1Change}>
                How did you like the service?
            </SelectQuestion>
            <SelectQuestion percentage={percentage2} onSelect={handlePercentage2Change}>
                How did your friend like the service?
            </SelectQuestion>

            {
                bill > 0 ?
                    <>
                        <Output bill={bill} tip={tip}/>
                        <Reset onReset={handleReset}/>
                    </>
                    :
                    null
            }
        </>
    );
}

function Output({bill, tip}) {
    return (
        <h3>You pay ${bill + tip} (${bill} + ${tip})</h3>
    );
}

function App() {
    return (
        <div className="App">
            <Calculator/>
        </div>
    );
}

export default App;
