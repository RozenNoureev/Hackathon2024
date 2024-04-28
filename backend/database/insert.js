import { supabase } from './client.js';


export async function insertUser(email, password){
    console.log("email: "+email+", password: "+ password)
    const { data, error } = await supabase
        .from('Users')
        .insert({email: email, password: password})
        .select()
    if(error){
        console.log(error)
        throw error('Something went wrong with database')
    }
}

//Should we include endtime here, since it should be null initially
// also should logId be uuid? which would be generated in the db?
export async function insertLog(userId, socketId,startTime, ip, longitude, latitude){ 
    console.log("inserting")
    const { error } = await supabase
        .from('Logs')
        .insert({UID: userId, SID: socketId, start_time: startTime,ip: ip, longitude: longitude, latitude: latitude})
    if(error){
        throw error('Something went wrong with database')
    }
}