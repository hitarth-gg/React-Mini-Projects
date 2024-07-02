function StartScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to the React Quix</h2>
      <h3>{numQuestions} Questions to test your react mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
