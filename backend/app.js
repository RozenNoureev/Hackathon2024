import express from 'express';
import cors from 'cors';
import { Server, Socket } from "socket.io";
import http from "http"
import { UserSocket } from './socket/userSocket.js'
import { register, validatePassword } from './business/user.js';
import { addLog, getAllLogs } from './business/logs.js';
import { insertLog } from './database/insert.js';



const app = express();

const router = express.Router();

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*"
  }
});



const port = 3000;





router.post('/signin', async (req, res) => {

  try {

    const body = req.body;
    const email = body.email;
    const password = body.password;

    // password is validated and returns a user token
    const { userID, token } = await validatePassword(email, password);
    if (token) {
      res.status(200).json({ email:email ,token: token, success: true });
    } else {
      res.status(400).json({ token: null, success: false });
    }
  } catch (error) {

    res.status(400).json({ token: null, success: false })
  }

});



router.post('/signup', async (req, res) => {
try{
  const body = req.body;
  const userEmail = body.email;
  const password = body.password;

  // Creates a user
  const {email,token} = await register(userEmail, password);
  if (token) {
    res.status(200).json({email:userEmail, token: token, success: true });
  } else {
    res.status(400).json({ token: null, success: false });
  }
}catch(error){
  console.log(error)
  res.status(400).json({ token: null, success: false });
}

});

router.post('/createLog', async (req, res) => {
  try{
    const body = req.body;
    const userEmail = body.email;
    const socketId = body.socketId;
    const start_time = body.start_time;
    const ip = body.ip;
    const longitude = body.longitude;
    const latitude = body.latitude;
  
    // Get logs
    //const {} = 
    const success = await addLog(userEmail, socketId, start_time, ip, longitude, latitude)
    if (success) {
      res.status(200).json({Insert: true});
    } else {
       res.status(400).json({Insert: false});
    }
  }catch(error){
    console.log(error)
    res.status(400).json({ success: false });
  }
  
  });

router.get("/logs", async (req, res) => {
  try {
    const logs = await getAllLogs()
    res.status(200).json(logs)
  } catch (error){
    console.log(error)
    res.status(400).json({ success: false });
  }
})

app.get('/', (req, res) => {
  res.send('Hello, World!12');
});

const userSocket = new UserSocket(io);
app.use(cors());
app.use(express.json());
app.use("/api", router);


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});