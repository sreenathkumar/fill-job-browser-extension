import { createContext, ReactNode } from "react";

type AuthCtxType = {
    auth: any;
    setAuth: React.Dispatch<any>;
};

const AuthCtx = createContext<AuthCtxType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<any>(null);
    const hasMounted = useRef(false);
    //load the auth sent from background js
    useEffect(() => {
        if (hasMounted.current) return;
        hasMounted.current = true;

        const getAuth = async () => {
            const user = await storage.getItem('local:auth');

            if (user && Object.keys(user).length > 0) {
                setAuth(user);
            } else {
                //send message to background js for refetch
                browser.runtime.sendMessage({
                    type: 'REFETCH_AUTH'
                }, (response) => {
                    const { auth } = response;
                    if (auth) setAuth(auth);
                })
                //update the auth context if success
            }
        }

        getAuth();
    }, []);

    return <AuthCtx.Provider value={{ auth, setAuth }}>
        {children}
    </AuthCtx.Provider>
}

export {
    AuthProvider,
    AuthCtx
}