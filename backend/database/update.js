import { supabase } from './client';

export async function updatePass(userId, newPass) {
    const { error } = await supabase
        .from('Users')
        .update({password: newPass})
        .eq('id', userId)
    if(error){
        throw error('Something went wrong with database')
    }
}

export async function updateEnd(logId, newEndTime) {
    const { error } = await supabase
        .from('Logs')
        .update({endTime: newEndTime})
        .eq('LID', logId)
    if(error){
        throw error('Something went wrong with database')
    }
}

export async function updateLocation(logId, newIP, newLong, newLat) {
    const { error } = await supabase
        .from('Logs')
        .update({id: newIP, longitude: newLong, latitute: newLat})
        .eq('LID', logId)
    if(error){
        throw error('Something went wrong with database')
    }
}