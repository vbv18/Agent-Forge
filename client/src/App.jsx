import { useEffect } from "react";
import Home from "./pages/Home";
import getCurrentUser from "./features/getCurrentUser";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";


export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      const userData = await getCurrentUser();
      dispatch(setUserData(userData));
    }

    getUser();
  }, []);

  return (
    <Home />
  )
}
