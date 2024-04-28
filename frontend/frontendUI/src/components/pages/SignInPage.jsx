import { useLocation } from "react-router-dom";

function SignInPage () {
    const status = location.state;

    return(
        <div>
            <h1>SIGN IN PAGE</h1>
            <p>{status}</p>
        </div>
    );
}   

export default SignInPage