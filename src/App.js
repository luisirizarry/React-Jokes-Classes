import React, { Component } from "react";
import JokeList1 from "./JokeList1";

/** App component. Renders list of jokes. */

class App extends Component {
  render() {
    return (
      <div className="App">
        <JokeList1 />
      </div>
    );
  }
}

export default App;
