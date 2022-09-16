import { useEffect, useState } from "react";

const useFetch = (url: URL | string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        const fetchData = async () =>{ //async function to fetch data
        setLoading(true); // set state to loading while data is being fetched
        try{ //catchinng fetching error
            const res = await fetch(url); //fetch from url
            const json = await res.json(); // turn to json

            setData(json); //setting the state of data to json we got from server
            setLoading(false); //set loading to false after successfully fetched data
        }
        catch(e: any){
            setError(e);
            setLoading(false);
        }
    }

    fetchData();
    }, [url])
    return{loading, error, data}
}

export default useFetch;