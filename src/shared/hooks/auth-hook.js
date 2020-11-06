import { useState, useEffect, useCallback } from 'react'

let logoutTimer;

const useAuth = () => {

  const [ authState, setAuthState ] = useState({ token: null, tokenExpiresAt: null, userId: null }); 

  const login = useCallback((uid, token, expirationDate) => {
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setAuthState({ 
          token: token, 
          tokenExpiresAt: tokenExpirationDate, 
          userId: uid 
        });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token,
          expiration: tokenExpirationDate.toISOString()
        })
      );
    }, []);

  const logout = useCallback(() => {
      setAuthState({ 
          token: null, 
          tokenExpiresAt: null, 
          userId: null 
        });
      localStorage.removeItem("userData");
    }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData && 
      storedData.token &&
      new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);  

  useEffect(() => {
    if (authState.token && authState.tokenExpiresAt) {
       const remainingTime = authState.tokenExpiresAt.getTime() - new Date().getTime();
       logoutTimer = setTimeout(logout, remainingTime);
    } else {
       clearTimeout(logoutTimer);
    }
  }, [authState.token, logout, authState.tokenExpiresAt])

  return { login, logout, token: authState.token, userId: authState.userId }
}

export default useAuth;
