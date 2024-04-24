import { useAuthProvider } from "@/providers/authProvider";
import UnverifiedEmailAlert from "./UnverifiedEmailAlert";
import { CreatePost } from "./CreatePost";
import Posts from "./Posts";
import RightSidebar from "@/components/RightSidebar";
import LeftSidebar from "@/components/LeftSidebar";

const Home = () => {
  const { user } = useAuthProvider();
  return (
    <div>
      {user && !user.isEmailVerified && <UnverifiedEmailAlert />}
      <div className="grid h-full grid-cols-2 md:grid-cols-4">
        <div className="col-span-1 hidden md:block">
          <LeftSidebar />
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <CreatePost />
          <Posts />
        </div>
        <div className="col-span-1 hidden md:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
