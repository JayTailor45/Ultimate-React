import {useState} from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

function Button({backgroundColor, color, onClick, children}) {
    return (
        <button
            style={{backgroundColor, color}}
            onClick={() => onClick()}
        >
            {children}
        </button>
    );
}

export default function App() {

    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    function handlePrev() {
        if (step <= 1) return;
        setStep(s => s - 1);
    }

    function handleNext() {
        if (step >= 3) return;
        setStep(s => s + 1);
    }

    return (
        <>
            <button className={"close"} onClick={() => setIsOpen(state => !state)}>&times;</button>
            {isOpen && (
                <div className={"steps"}>
                    <div className={"numbers"}>
                        <div className={step >= 1 ? 'active' : ""}>1</div>
                        <div className={step >= 2 ? 'active' : ""}>2</div>
                        <div className={step >= 3 ? 'active' : ""}>3</div>
                    </div>

                    <p className={"message"}>Step {step}: {messages[step - 1]}</p>

                    <div className={"buttons"}>
                        <Button
                            backgroundColor={'#7950f2'}
                            color={'#fff'}
                            onClick={handlePrev}
                        >
                            <span>👈</span> Previous
                        </Button>
                        <Button
                            backgroundColor={'#7950f2'}
                            color={'#fff'}
                            onClick={handleNext}
                        >
                            Next <span>👉</span>
                        </Button>
                    </div>
                </div>
            )
            }
        </>
    );
}