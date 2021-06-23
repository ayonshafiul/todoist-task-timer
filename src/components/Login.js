import { Redirect } from "react-router-dom";
const Login = (props) => {
  const { token } = props;
  console.log(token);
  if (token) {
    return <Redirect to="/home"></Redirect>;
  }
  return (
    <div>
      <a href={`https://todoist.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=data:read_write,data:delete,task:add,data:delete,project:delete&state=secretstring`}>
        Login with todoist...
      </a>
    </div>
  );
};

export default Login;
