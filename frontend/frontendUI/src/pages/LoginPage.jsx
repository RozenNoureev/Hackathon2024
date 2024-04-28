import { useLocation } from "react-router-dom";

function LogInPage() {
    const status = location.state;
    console.log(status)
    return (
        <div>
            <h1>Login Page</h1>
            <p>{status}</p>
        </div>
    );
}

export default LogInPage