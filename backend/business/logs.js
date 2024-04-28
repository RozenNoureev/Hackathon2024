import { insertLog } from "../database/insert.js"
import {allLogs, userLogs, getActive} from "../database/fetch.js"
import { getUserId } from "./user.js"

export async function addLog(email, SID, startTime, ip, longitude, latitude){ 
    const UID = await getUserId(email)
    let success = false
    try{
        console.log(`${UID}`)
        if(UID && SID && startTime && ip && longitude && latitude){
            await insertLog(UID, SID, startTime, ip, longitude, latitude)
            success = true
        }
    }catch (err){
        console.log('Error: ' + err)
    }
    return success
}

export async function getAllLogs(){
    const logs = await allLogs()
}
