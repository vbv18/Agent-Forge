import SideBar from "../components/SideBar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import Articraft from "../components/Articraft.jsx";

export default function Home() {
  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden w-full">
      <SideBar />
      <ChatArea />
      <Articraft />
    </div>
  );
}
