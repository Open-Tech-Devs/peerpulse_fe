import { Avatar, AvatarImage } from "../ui/avatar";
import { DefaultUserImage } from "@/constants";
import { useEffect, useState } from "react";
import { UserModel } from "../users/models";
import axios from "axios";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import routes from "@/api/routes";
import { Link } from "react-router-dom";
import { useAuthProvider } from "@/providers/authProvider";

const PeerList = () => {
  const { user } = useAuthProvider();
  const [peers, setPeers] = useState<UserModel[]>();
  const getPeers = async () => {
    const peers = await axios.get(
      API_ENDPOINT + routes.getPeersFromCollege.path,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
        },
      },
    );
    peers.data && setPeers(peers.data as UserModel[]);
  };
  useEffect(() => {
    getPeers();
  }, []);
  return (
    <div className="flex h-full flex-col gap-2 rounded-md bg-white p-5 dark:bg-black">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <p>Peers</p>
        <span className="rounded border bg-gray-200 px-2 text-xs dark:bg-gray-600">
          {peers?.length && peers.length - 1}
        </span>
      </div>
      {peers
        ?.filter((peer) => peer.id !== user?.id)
        .map((peer) => {
          return (
            <Link
              key={peer.id}
              to={`/user/${peer.id}`}
              className="flex w-full items-center gap-2 rounded-xl border bg-white p-2 text-sm hover:bg-gray-200 dark:bg-black"
            >
              <Avatar>
                <AvatarImage src={peer.profilePicture || DefaultUserImage} />
              </Avatar>
              <p>{peer.username}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default PeerList;
