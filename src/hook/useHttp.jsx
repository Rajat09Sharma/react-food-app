import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url,config){
    const response =await fetch(url,config);
    const resData=await response.json();
    if(!response.ok){
        throw new Error(resData.message||"Something went wrong, failed to  send request.");
    }

    return resData;
} 

export function useHttp(url,config,intialDataValue){
    const [isLoading, setIsloading] = useState(false);
    const [data, setData] = useState(intialDataValue);
    const [error, setError] = useState();

    function clearData(){
        setData(intialDataValue);
    }

    const sendRequest=useCallback(async function sendRequest(data){
        setIsloading(true);
        try {
            const resData=await sendHttpRequest(url,{...config,body:data});
            setData(resData);
        } catch (error) {
            setError(error.message||"Something went wrong!")
        }
        setIsloading(false);
    },[url,config]);

    useEffect(()=>{
        if((config && (config.method==="GET" || !config.method))||!config){
            sendRequest();
        }
    },[sendRequest])

    return{
        isLoading,
        error,
        data,
        sendRequest,
        clearData
    }
}