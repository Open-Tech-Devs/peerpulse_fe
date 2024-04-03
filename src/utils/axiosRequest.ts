import routes from "@/api/routes";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import axios from "axios";

const authorization = `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`;

export const getAISummaryStream = async (postId: string) => {
  const res = await axios.post(
    API_ENDPOINT + routes.getPostExplanation.path,
    { postId },
    { headers: { Authorization: authorization } },
  );
  console.log(res.data);
};
