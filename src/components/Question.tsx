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
        setShowAnswer(false);
        setAnswerClassName("");
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
            <h2 className='text-2xl'>Questions</h2>
            <label className="text-xl font-bold">Convert: </label>
            <h3 className="text-xl">{questionValue} {units[questionUnitIndex]} to {units[convertToUnitIndex]}</h3>
            <label className="text-xl font-bold">Value: </label>
            <div className={answerClassName}>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder='10000' onChange={(e) => {setAnswer(e.target.value)}}/> 
            </div>
            {showAnswer && <p>Correct answer: {correctAnswer}</p>}
            <br />
            <div className='space-x-1 space-y-1'>
                <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r'
                        onClick={generateQuestion}>
                            Next
                </button>
                <button 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                    onClick={verifyAnswer}>
                        Submit
                    </button>
                <button
                    className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                    onClick={toggleShowAnswer}>
                        Show Answer
                </button>
            </div>
        </div>
    )

}

export default Question;