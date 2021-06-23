import { Redirect } from "react-router-dom";
const Login = (props) => {
  const { token } = props;
  console.log(token);
  if (token) {
    return <Redirect to="/home"></Redirect>;
  }
  return (
    <div>
      <a href="https://todoist.com/oauth/authorize?client_id=595920ebda9e4f94bf996b1cb966164c&scope=data:read_write,data:delete,task:add,data:delete,project:delete&state=secretstring">
        Login with todoist...
      </a>
    </div>
  );
};

export default Login;
