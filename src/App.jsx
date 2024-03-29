import { useState, useEffect } from "react";
import PopUp from "./components/pop-up";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsersList] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPopUp, setShowPopup] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      getUserList();
    }
  }, [isLoggedIn]);

  const callApi = async (url, params) => {
    try {
      const data = await fetch(url, params);
      if (!data.ok) return Promise.reject("error");
      const response = await data.json();
      console.log(response, "");
      return response;
    } catch (err) {
      console.error(err, "Error occurred");
    }
  };

  const getToken = () => {
    const params = {
      email: name || "eve.holt@reqres.in",
      password: password || "cityslicka",
    };
    const url = "https://reqres.in/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };
    callApi(url, options)
      .then((data) => {
        if (!data.error) {
          setToken(data);
          setIsLoggedIn(true);
        }
        setShowPopup(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setShowPopup(true);
      });
  };

  const getUserList = () => {
    const url = "https://reqres.in/api/unknown";
    const headers = {
      Authorization: token,
      "Content-type": "application/json",
    };
    const params = { headers };

    callApi(url, params).then((resp) => {
      setUsersList(resp.data);
      console.log(users, "----");
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
          <button className="loginbtn">Login</button>
        </form>
        {showPopUp && (
          <PopUp isLoggedIn={isLoggedIn} closePopUp={setShowPopup} />
        )}
        <table>
          <thead>
            <tr>
              {Object.keys(users?.[0] ?? {}).map((item) => {
                return <th>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {users?.map(({ color, id, name, year, pantone_value }) => {
              return (
                <tr>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{year}</td>
                  <td>{color}</td>
                  <td>{pantone_value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
