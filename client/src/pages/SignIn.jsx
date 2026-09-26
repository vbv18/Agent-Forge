import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { api } from "../../utils/axios";

export default function SignInPage() {

    async function handleLogin(token) {
        try {
            const { data } = await api.post("/auth/login", {
                token
            });

        } catch (error) {
            console.error(error);
        }
    }

    async function googleLogin() {
        try {
            const loginData = await signInWithPopup(auth, googleProvider);
            const token = await loginData.user.getIdToken();

            await handleLogin(token);

        } catch (error) {
            alert("Login Failed! Try again later.");
        }
    }



    return (
        <button onClick={googleLogin} className="rounded-md bg-yellow-700">
            Continue
        </button>
    )

} 