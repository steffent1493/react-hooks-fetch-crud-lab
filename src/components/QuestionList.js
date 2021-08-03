import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((questions) => {
      setQuestions(questions)
    })
  }, [])

  function deleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id)
      setQuestions(updatedQuestions)
    })
  }

  function answerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((response) => response.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if (q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      })
      setQuestions(updatedQuestions)
    })
  }

    const questionItems = questions.map((q) => (
      <QuestionItem key={q.id} question={q} onDeleteClick={deleteClick} onAnswerChange={answerChange} />
    ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
