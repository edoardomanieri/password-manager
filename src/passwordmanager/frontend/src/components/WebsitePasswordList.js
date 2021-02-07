import React, { useState, useEffect } from 'react';
import WebsitePasswordCard from "./WebsitePasswordCard";
import Axios from 'axios';

export default function WebsitePasswordList() {

    const [websitePasswords, setWebsitePasswords] = useState([ {
        id: 1,
        user: "",
        notes: "",
        password: "",
        username: "",
        website_name: "",
        website_url: "",
    }
    ]);

    const fetchData = () => {
        Axios.get('/websitepasswords/list',
        {
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}
        }
        )
        .then(resp => {
            console.log(resp.data);
            setWebsitePasswords(e => [...resp.data]);
            
         })
    }

    //to avoid being called many times
    useEffect(() => {
        fetchData();
      }, []);

    return <WebsitePasswordCard websitePassword={websitePasswords[0]} />;

}
