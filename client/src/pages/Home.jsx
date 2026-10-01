import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { api } from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function Home() {
  const userData = useSelector((state) => state.user.userData);

  async function handleLogin(token) {
    try {
      const response = await api.post("/auth/login", {
        token,
      });

      dispatchEvent(setUserData(response.data.user));
    } catch (error) {
      console.error("[Handle-Login-Error]", error);
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
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1 items-center justify-center">
              <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
                Welcome to AgentForge
              </h2>
              <p className="text-[13px] text-slate-500">
                Please login to continue.
              </p>
            </div>

            <button
              onClick={googleLogin}
              className="w-full flex items-center justify-center gap-3 px-[11px] py-[6px] rounded-xl text-sm font-medium text-black/60 bg-white hover:bg-gray-200 shadow-md shadow-indigo-700/30 hover:shadow-indigo-500/30 transition-all duration-150 cursor-pointer"
            >
              <FcGoogle size={15} />
              Continue with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
