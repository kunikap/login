import { useState, useEffect,useCallback } from "react";
import PopUp from "./components/pop-up";
import "./App.css";
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsersList] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  let data1 = { email: "eve.holt@reqres.in", password: "cityslicka" };
  const callApi = async (url, params, isJSON = true) => {
    try {
      const data = await fetch(url, { ...params });
      const response = await data.json();
      return response.data;
    } catch (err) {
      console.error(err, "Error happened");
    }
  };

  useEffect(()=> {
    getToken();
  }, [])

  const getToken = () => {
    

    // fetch(url, params).then((data) => {
    //     return data.text();
    //   }).then((update) => {
    //     setToken(update.data);
    //   }).catch(err => console.error(err));
    //const response = await  data.json();
    //setToken(response.data);
    // return callApi(url, params, false)
    //   .then((data) => {
    //     setToken(data);
    //   })
    //   .catch((err) => {
    //     console.error(err, "--");
    //   });
    const url = "https://reqres.in/api/login";

    axios.post(url, {
      ...data1
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify(update),
    };
    // fetch("https://jsonplaceholder.typicode.com/posts", options)
    //   .then((data) => {
    //     if (!data.ok) {
    //       throw Error(data.status);
    //     }
    //     return data.json();
    //   })
    //   .then((update) => {
    //     console.log(update);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  const cb = useCallback(getToken,[])

  const getUserList = () => {
    let url = "https://reqres.in/api/unknown";
    let headers = { Authorization: token, "Content-type": "application/json" };
    const params = { headers };

    callApi(url, params).then((resp) => {
      setUsersList(resp.data);
      console.log(users, "user");
    });
  };

  const login = () => {
    getToken().then(() => setIsLoggedIn(true) && getUserList());
  };

  return (
    <div className="App">
      <h3>Hello there, Sign in to continue</h3>
      <div>
        <form>
          <div>
            <label>Username/Email</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <div></div>
          </div>
          <div>
            <label>Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div></div>
          </div>
          <button onClick={cb}>Login</button>
        </form>
        <PopUp isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default App;
