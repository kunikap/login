import { useState, useEffect } from "react";
import PopUp from "./components/pop-up";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsersList] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      getUserList();
    }
  }, [isLoggedIn])

  const callApi = async (url, params) => {
    try {
      const data = await fetch(url, params);
      const response = await data.json();
      console.log(response, "");
      return response;
    } catch (err) {
      console.error(err, "Error occurred");
    }
  };

  const getToken = () => {
    const params = { email: name || "eve.holt@reqres.in", password: password || "cityslicka" };
    const url = "https://reqres.in/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };
    callApi(url, options)
      .then(data => {
        setToken(data);
        setIsLoggedIn(true);
      })
      .catch((err) => console.error(err, "--"));
  };

  const getUserList = () => {
    const url = "https://reqres.in/api/unknown";
    const headers = { Authorization: token, "Content-type": "application/json" };
    const params = { headers };

    callApi(url, params).then((resp) => {
      setUsersList(resp.data);
    });
  };

  const login = (event) => {
    event.preventDefault();
    getToken();
  };

  return (
    <div className="App">
      <h3>Hello there, Sign in to continue</h3>
      <div>
        <form onSubmit={login}>
          <div className="field">
            <label>Username/Email</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button >Login</button>
        </form>
        <PopUp isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default App;
