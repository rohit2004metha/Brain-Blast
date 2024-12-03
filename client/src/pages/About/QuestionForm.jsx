import React, { useState } from 'react';
import './QuestionForm.css';


function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Question:', question);
    console.log('Options:', options);
    // Here you can send the question and options to your backend
  };

  return (
    <div className="question-form-container">
      <h2>Add a New Question</h2>
      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label htmlFor="question" className="label">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            className="input"
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`option${index + 1}`} className="label">{`Option ${index + 1}:`}</label>
            <input
              type="text"
              id={`option${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e)}
              className="input"
            />
          </div>
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default QuestionForm;
