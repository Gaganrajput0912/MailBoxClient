import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState()
    useEffect(() => {
        async function fetchData() {

            const res = axios.get(url);
            console.log(res)
        setData(res.data);

        }
    }, [url])
  return data
}

export default useFetch