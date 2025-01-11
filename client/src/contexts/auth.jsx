import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null,
    });
    const func = async () => {

        const data = await localStorage.getItem("auth");

        if (data) {
            let user = null;

            const parseData = JSON.parse(data);
            if (parseData.token !== null) {
console.log(parseData)
                const response = await fetch(
                  "http://localhost:8000/api/auth/session",
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${parseData.token}`,
                    },
                  }
                );


                const res = await response.json();
                user = res.user;
            }

            setAuth({
                ...auth,
                user: user,
                token: parseData.token,
            });
        }
    };
    useEffect(() => {
        func();
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
