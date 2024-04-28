import { addLog } from "../business/logs.js";

export class UserSocket{
    constructor(socket){
        const userNameSpace = socket.of("user");
        userNameSpace.on("connection",(socket)=>{
            console.log("user connected");

            //signin event
            socket.on("signin",(message)=>{
                console.log(message);
                async ()=>await this.saveStart(socket.id,message.email);
            })

            // signout event
            socket.on("signout",(message)=>{
                console.log(message);
            })
            
            // user closes tab
            socket.on("disconnect",()=>{
                console.log(`${socket.id} log off`);
            })


        })

        
    }

    async saveStart(sid,email){
        await addLog(email ,sid ,"2024-02-24 16:10:23+00","IP",0 ,0)

    }
}