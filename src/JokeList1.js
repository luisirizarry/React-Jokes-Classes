import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList1.css";

const JokeList1 = ({ numJokesToGet = 5 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    getJokes();
  }, []);

  const getJokes = async () => {
    try {
      let newJokes = [];
      let seenJokes = new Set();

      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let joke = { ...res.data, votes: 0 };

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          newJokes.push(joke);
        } else {
          console.log("Duplicate joke found!");
        }
      }

      setJokes(newJokes); 
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const generateNewJokes = () => {
    setIsLoading(true);
    setJokes([]);
    getJokes();
  };

  const vote = (id, delta) => {
    setJokes(prevJokes =>
      prevJokes.map(joke =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      )
    );
  };

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      ) : (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={generateNewJokes}>
            Get New Jokes
          </button>

          {sortedJokes.map(({ id, joke, votes }) => (
            <Joke key={id} text={joke} id={id} votes={votes} vote={vote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JokeList1;
