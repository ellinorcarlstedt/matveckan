import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController(); // we use AbortController to cancel any ongoing requests if the user would switch away from the component that triggered the request. 
        activeHttpRequests.current.push(httpAbortCtrl); // We save all abortControllers in an array with a ref. 

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal // binds the abort-controller to this request
            });
            const data = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter( // When the request is finished, remove it from the array of abortControllers.
                reqCtrl => reqCtrl !== httpAbortCtrl
            )

            if(!response.ok) { // If the response code is not 200-ish
                throw new Error(data.message);
            }

            setIsLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
        
    }, []);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort()); // we clear all ongoing requests when the component unmounts.
        }
    }, [])

    return { isLoading, error, sendRequest, clearError }

};