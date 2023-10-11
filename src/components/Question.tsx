import React, { useState } from 'react';

function Question(){
    // Units
    let units: string[] = ['Byte', 'KB', 'MB','GB','TB','PB']
    

    // Question Variables
    const [questionValue, setQuestionValue] = useState<string>("");
    const [questionUnit, setQuestionUnit] = useState<string>("");
    const [convertToUnit, setConvertToUnit] = useState<string>("");

    // Answer Variables
    const [value, setValue] = useState<string>("");
    const [unit, setUnit] = useState<string>("");

    const generateQuestion = () => {
        // Set random question value
        let min: number = 1;
        let max: number = 9000000;
        let value: string  = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
        setQuestionValue(value)
        // Set randm question unit
        min = 0;
        max = units.length - 1;
        let randomQuestionUnitIndex: number = (Math.floor(Math.random() * (max - min + 1)) + min);
        setQuestionUnit(units[randomQuestionUnitIndex]);
        // Set random conversion unit
        let randomConversionUnitIndex: number = (Math.floor(Math.random() * (max - min + 1)) + min);
        while (randomConversionUnitIndex === randomQuestionUnitIndex){
            randomConversionUnitIndex = (Math.floor(Math.random() * (max - min + 1)) + min);
        }
        setConvertToUnit(units[randomConversionUnitIndex]);


    }

    const verifyAnswer = () => void {
        // if answer is valid set input field to green
        // else set input field to red

    }

    return (
        <div>
            <h2>Questions</h2>
            <h3>Convert: {questionValue} {questionUnit} to {convertToUnit}</h3>
            <input type="text" />
            <br />
            <button onClick={generateQuestion}>Next</button>
            <button onClick={verifyAnswer}>Submit</button>
        </div>
    )

}

export default Question;