import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function SignIn({changeToken}) {
    const {
        register,
        handleSubmit,
       // setError,
        formState: { isSubmitting, },
    } = useForm();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const handleSignIn = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/api/signin", { email: data.email, password: data.password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response);
            changeToken(response.data.token, response.data.email);
            setMessage("user info correct")
            navigate("/home")

        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                console.log("bad login");
                setMessage("login failed")
              //  setError("login", "login failed")
            }

        }
    }
    return (
        <div className="hero min-h-screen bg-base-200" onSubmit={handleSubmit(handleSignIn)}>
            <div className="hero-content text-center">
                <div className="max-w-lg ">
                    <h1 className="mb-5 text-3xl">Sign In</h1>

                    <form className="card-body bg-base-100">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register("email")}
                                disabled={isSubmitting}
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password")}
                                disabled={isSubmitting}
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />

                        </div>
                        <div className="form-control mt-6">
                            <button
                                className="btn btn-primary"
                                onClick={
                                    ()=>{
                                    
                                    }
                                }
                            >
                                Login
                            </button>
                        </div>
                        {message && <p className="text-red-600 font-bold">{message}</p>}

                    </form>


                </div>
            </div>
        </div>
    )
}
function SignInPage(props) {
    //const status = location.state;
    // eslint-disable-next-line react/prop-types
    const changeToken = props.changeToken;

    return (

        <div>
            <SignIn changeToken={changeToken} />
        </div>
    );
}

export default SignInPage