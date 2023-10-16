import React from 'react';
import './App.css';
import Question from './components/Question';
import Result from './components/Result';

function App() {
  return (
    <div className="flex h-screen bg-slate-200">
      <div className="m-auto p-10 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <Question/>
        {/* <Result/> */}
      </div>
    </div>
  )
}

export default App;
