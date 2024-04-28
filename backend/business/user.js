import { generate } from "../utils/token.js";
import { insertUser } from "../database/insert.js"
import { getUser } from "../database/fetch.js"
import bcrypt from "bcrypt";


export async function validatePassword(email , password){
    let result = null;
    if(email && password){
        //validate password
        const user = await getUser(email)
        if (!user){
            result = null
        }else{
            try{
                const correct = await bcrypt.compare(password, user[0].password)
                if (correct) {
                    //if validate is true make result equal token
                    const token = generate(email); // generate Token
                    result = {email, token};  // return token
                }
            }catch(err){
                console.log(err)
            }
            
        }
       

    }

    return result;
   
}


export async function register(email , password){
    let result = null;
    if(email && password){
       // const token = generate(email);      // generate Token
       
        // create user email and password

        try {
            const hashedPass = await bcrypt.hash(password, 10)
            await insertUser(email, hashedPass)
            const token = generate(email);      // generate Token
        
            result = {email, token};  // return token
        } catch (err){
            console.log('Error: ' + err)
        }
    

    }
    return result;
   
}

export async function getUserId(email){
    let UserID = null;
    if(email){
        try{
            try{
                const user = await getUser(email)
                if (user){
                    console.log("user: "+user[0])
                    UserID = user[0].id
                }
            }catch (err){
                console.log('Error: ' + err)
            }
        }catch (err){
            console.log('Error: ' + err)
        }
    }
    return UserID;
}