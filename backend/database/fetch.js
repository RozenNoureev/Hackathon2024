import { supabase } from './client.js';

export async function allUser(){
    const {data, error} = await supabase
        .from('Users')
        .select()
    if(error){
        throw error('Something went wrong with database')
    }
    return data
}

export async function allLogs(){
    let { data, error } = await supabase.rpc('all_logs')
    if (error) console.error(error)
    else console.log(data)
    return data
}

export async function getUser(email) {
    console.log("email:"+email)
    const {data, error} = await supabase
        .from('Users')
        .select()
        .eq('email', email)
    if(error){
        throw error('Something went wrong with database')
    }
    console.log(data[0])
    return data
}

export async function userLogs(userId){
    const {data, error} = await supabase
        .from('Logs')
        .select('UID, Users(*)')
        .eq('Users.id', userId)
    if(error){
        throw error('Something went wrong with database')
    }
    return data
}

export async function getActive(){
    const { data, error } = await supabase
        .from('Logs')
        .select()
        .eq('end_time', null)
    if(error){
        throw error('Something went wrong with database')
    }
    return data
}