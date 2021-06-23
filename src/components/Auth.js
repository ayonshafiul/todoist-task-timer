import { useLocation, Redirect } from "react-router-dom";
import { useEffect } from "react";
import queryString from "query-string";
import axios from "axios";

const Auth = (props) => {
  const { token, setToken } = props;

  const { search } = useLocation();
  const queryParams = queryString.parse(search);
  const { code } = queryParams;
  useEffect(() => {
    (async function getAccessToken() {
      const data = await axios.post("https://todoist.com/oauth/access_token", {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        code,
      });
      setToken(data.data.access_token);
    })();
  }, [code, setToken]);

  if (token) {
    return <Redirect to="/home"></Redirect>;
  }
  return <div>{search}</div>;
};

export default Auth;
