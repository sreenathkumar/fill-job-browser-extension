import { AuthCtx } from "@/context/auth.context"

function useAuth() {
    const context = useContext(AuthCtx);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default useAuth