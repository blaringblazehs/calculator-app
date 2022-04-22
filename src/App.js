import { useState } from "react";
import "./index.css";
function App() {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");
    const ops = ["/", "*", "+", "-", "."];
    // this function runs on every number button click upadtes the value
    const updateCalc = (value) => {
        // if we include two oprators just return
        //calc.slice(-1) slices the last value in string
        if (
            (ops.includes(value) && calc === "") ||
            (ops.includes(value) && ops.includes(calc.slice(-1))) ||
            (calc === "" && value == 0)
        ) {
            return;
        }
        setCalc(calc + value);
        //if the last item is not a operator
        if (!ops.includes(value)) {
            //It will evaluate the string you pass in
            setResult(eval(calc + value).toString());
        }
    };

    // create nine button fucntion
    const createDigits = () => {
        const digits = [];
        for (let i = 1; i < 10; i++) {
            digits.push(
                <button onClick={() => updateCalc(i.toString())} key={i}>
                    {i}
                </button>
            );
        }
        return digits;
    };
    //calculate on click of the equal button
    const calculate = () => {
        if (calc === "") {
            // setResult("");
            return;
        }
        setCalc(eval(calc).toString());
    };
    //delete the last value
    const deleteLast = () => {
        if (calc === "") {
            // setResult("");
            return;
        }

        //removes the last value
        const value = calc.slice(0, -1);
        setCalc(value);
        //recalculates the result on delete button
        if (ops.includes(value.slice(-1))) {
            setResult(eval(value.toString().slice(0, -1)));
        } else {
            setResult(eval(value.toString()));
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="display">
                    {calc || "0"} <br />
                    <span>({result})</span>
                </div>
                <div className="container-op-digit">
                    <div className="digits">
                        {createDigits()}
                        <button onClick={() => updateCalc("0")}>0</button>
                        <button onClick={() => updateCalc(".")}>.</button>
                        <button onClick={calculate}>=</button>
                    </div>
                    <div className="operators">
                        <button onClick={() => updateCalc("/")}>/</button>
                        <button onClick={() => updateCalc("*")}>x</button>
                        <button onClick={() => updateCalc("+")}>+</button>
                        <button onClick={() => updateCalc("-")}>-</button>

                        <button
                            onClick={deleteLast}
                            style={{ backgroundColor: "red" }}
                        >
                            del
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
