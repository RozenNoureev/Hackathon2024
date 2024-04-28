//  THIS COMPONENT WILL FETCH USER IP AND SEND IT TO A SERVER 
import Axios from 'axios';
import { useEffect, useState } from 'react';

function IPTrackingComponent() {
    const [ipDetails, setIpDetails] = useState([]);

    useEffect(() => {
        Axios.get('https://ipapi.co/json/').then((res) => {
            setIpDetails(res.data);
        });
    }, [])

    console.log(ipDetails)
}

export default IPTrackingComponent