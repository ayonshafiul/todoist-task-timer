import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Login from "./components/Login";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [token, setToken] = useLocalStorage("todoist-token", null);
  return (
    <Router>
      <Switch>
        <Route exact path="/auth">
          <Auth token={token} setToken={setToken} />
        </Route>
        <Route exact path="/home">
          <Home token={token} />
        </Route>
        <Route exact path="*">
          <Login token={token} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
