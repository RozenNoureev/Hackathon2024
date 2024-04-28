import { io } from "socket.io-client"
import { useEffect, useState } from "react"
// eslint-disable-next-line react/prop-types
const UserPage = ({ email }) => {


    // eslint-disable-next-line no-unused-vars
    const [clientSocket, setClientSocket] = useState(null);
    const [sent, setSent] = useState(false);

    const sendLogInfo = () => {
        try {
            clientSocket.emit("signin", { "email": email })

        } catch (error) {
            console.log("error")
        }
    }
    useEffect(
        () => {
            if (!clientSocket) {
                setClientSocket(io("http://localhost:3000/user"))
            } else if(clientSocket && !sent) {

                sendLogInfo();
                setSent(true);
            }


            return () => {
                clientSocket.off("signout", "user sign out")
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [clientSocket]

    )

    return (
        <div>
            <button className="btn btn-primary"
                onClick={
                    ()=> {
                        try{
                            clientSocket.emit("signout",{"email":email});
                        }catch(error){
                            console.log(error)

                        }
                    }
                }
            
            >
                Sign Out
            </button>

        </div>
    );
}

export default UserPage;