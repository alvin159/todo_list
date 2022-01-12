import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Todo, Settings, Info } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Todo />} />
          <Route path="/settings" exact component={() => <Settings />} />
          <Route path="/info" exact component={() => <Info />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

/*this code was referenced from https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/*/