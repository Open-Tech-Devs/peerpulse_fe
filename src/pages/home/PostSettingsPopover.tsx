import routes from "@/api/routes";
import {
  PollAssignedModel,
  PostAssignedModel,
} from "@/components/posts/models";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import { useAuthProvider } from "@/providers/authProvider";
import axios from "axios";

const PostSettingsPopover = (post: PostAssignedModel | PollAssignedModel) => {
  const { user } = useAuthProvider();
  const getAISummaryStrea = async () => {
    const res = await axios.post(
      API_ENDPOINT + routes.getPostExplanation.path,
      {
        postId: post.id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
        },
      },
    );
    console.log(res.data);
  };
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-ellipsis-vertical"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 bg-white p-0 dark:bg-black">
        <div className="flex flex-col">
          {user?.id === post.authorId && (
            <Button variant="outline" className="rounded-none">
              Edit
            </Button>
          )}
          {user?.id === post.authorId && (
            <Button variant="outline" className="rounded-none">
              Delete
            </Button>
          )}
          <Button
            variant="outline"
            className="rounded-none"
            onClick={getAISummaryStrea}
          >
            Get AI Summary
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PostSettingsPopover;
