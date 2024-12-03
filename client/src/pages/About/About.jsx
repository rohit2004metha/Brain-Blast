import React, { useState } from "react";
import "./About.css";
import quizData from "../../components/TriviaQuizData";

function QuestionForm(props) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

//

  const getOptionsValue = (data) => {
    return data.map((item) => {
      let objectKeys = Object.keys(item)[0];
      return (
        <option key={objectKeys} value={item[objectKeys]}>
          {objectKeys}
        </option>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          options,
          category,
          difficulty,
          type
        })
      });
      if (response.ok) {
        alert('Question submitted successfully!');
        // Reset form fields after successful submission
        setQuestion('');
        setOptions(['', '', '', '']);
        setCategory('');
        setDifficulty('');
        setType('');
      } else {
        alert('Failed to submit question.');

      }
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to submit question. Please try again later.');
    }
  };


  return (
    <>
    <div className="mt-2 question-form-container">
      <h2>Add a New Question</h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="form-group mb-3">
          <label htmlFor="question" className="label ">
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            className="input "
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`option${index + 1}`} className="label">{`Option ${
              index + 1
            }:`}</label>
            <input
              type="text"
              id={`option${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e)}
              className="input"
            />
          </div>
        ))}
        <div className="mb-3">
          <label htmlFor="category" className="label form-label">
            Select Category:
          </label>
          <select
            name="category"
            className="form-select"
            aria-label="Default select example"
          >
            <option value={"any"} defaultValue>
              Any Category
            </option>
            {getOptionsValue(quizData.category)}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="difficulty" className="label form-label">
            Select Difficulty:
          </label>
          <select
            name="difficulty"
            className="form-select"
            aria-label="Default select example"
          >
            <option value={"any"} defaultValue>
              Any Difficulty
            </option>
            {getOptionsValue(quizData.difficulty)}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="label form-label">
            Select Type:
          </label>
          <select
            name="type"
            className="form-select"
            aria-label="Default select example"
          >
            <option value={"any"} defaultValue>
              Any Type
            </option>
            {getOptionsValue(quizData.type)}
          </select>
        </div>
        <button type="submit" className=" btn submit-button">
          Submit
        </button>
      </form>
    </div>
    </>
  );
  
}

export default QuestionForm;
