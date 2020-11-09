import React, { useState, useCallback, useEffect } from "react";

const useCustomRef = () => {
    const [ customRef, setCustomRef ] = useState();

    const createNewRef = useCallback(() => {
            const newRef = React.createRef();
            setCustomRef(newRef);
        },
    []);

    useEffect(() => {
        createNewRef();
    }, [createNewRef])

    return customRef;
}

export default useCustomRef;