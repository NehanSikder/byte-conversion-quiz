import React, { useState, useEffect } from 'react';

function Question(){
    // Units
    let units: string[] = ['Byte', 'KB', 'MB','GB','TB','PB']
    

    // Question Variables
    const [questionValue, setQuestionValue] = useState<number>(0);
    const [questionUnitIndex, setQuestionUnitIndex] = useState<number>(0);
    const [convertToUnitIndex, setConvertToUnitIndex] = useState<number>(1);
    const [answerClassName, setAnswerClassName] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);


    // Answer Variables
    const [answer, setAnswer] = useState<string>("");

    const generateQuestion = () => {
        setAnswer("");
        // Set random question value
        let min: number = 1;
        let max: number = 9000000;
        let value: number  = (Math.floor(Math.random() * (max - min + 1)) + min);
        setQuestionValue(value)
        // Set randm question unit
        min = 0;
        max = units.length - 1;
        let randomQuestionUnitIndex: number = (Math.floor(Math.random() * (max - min + 1)) + min);
        setQuestionUnitIndex(randomQuestionUnitIndex);
        // Set random conversion unit
        let randomConversionUnitIndex: number = (Math.floor(Math.random() * (max - min + 1)) + min);
        while (randomConversionUnitIndex === randomQuestionUnitIndex){
            randomConversionUnitIndex = (Math.floor(Math.random() * (max - min + 1)) + min);
        }
        setConvertToUnitIndex(randomConversionUnitIndex);


    }

    const calculateExpectedAnswer = () => {
        let x: number =  1000 ** Math.abs(convertToUnitIndex - questionUnitIndex)
        let expectedAnswer: number = 0;
        if (questionUnitIndex < convertToUnitIndex){
            expectedAnswer = questionValue / x;
        } else {
            expectedAnswer = questionValue * x;
        }
        return expectedAnswer;
    }

    const verifyAnswer = () => {
        // calculate correct answer
        let expectedAnswer: number = calculateExpectedAnswer();
        setCorrectAnswer(expectedAnswer);
        if (expectedAnswer === +answer){
            // if answer is valid set input field to green
            setAnswerClassName("correct");
        } else {
            // else set input field to red
            setAnswerClassName("wrong");
        }

    }

    const toggleShowAnswer = () => {
        let expectedAnswer: number = calculateExpectedAnswer();
        setCorrectAnswer(expectedAnswer);
        setShowAnswer(!showAnswer)
    }

    // Generate a new question after the component renders
    useEffect(() => {
        generateQuestion();
    }, [])

    return (
        <div>
            <h2>Questions</h2>
            <h3>Convert: {questionValue} {units[questionUnitIndex]} to {units[convertToUnitIndex]}</h3>
            <label>Value: </label><input className={answerClassName} type="text" placeholder='10000' onChange={(e) => {setAnswer(e.target.value)}}/> 
            {showAnswer && <p>Correct answer: {correctAnswer}</p>}
            <br />
            <button onClick={generateQuestion}>Next</button>
            <button onClick={verifyAnswer}>Submit</button>
            <button onClick={toggleShowAnswer}>Show Answer</button>
        </div>
    )

}

export default Question;