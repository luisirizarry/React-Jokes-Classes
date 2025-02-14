import React from "react";
import "./Joke.css"

const Joke1 = ({ id, vote, votes, text }) => {


    return (
        <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={() => vote(id, +1)}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={() => vote(id, -1)}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    )
}

export default Joke1;