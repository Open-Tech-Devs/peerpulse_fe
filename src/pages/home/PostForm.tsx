import routes from "@/api/routes";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import { uploadImage } from "@/utils/axiosRequest";
import { postFormSchema } from "@/validation/post.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dispatch, SetStateAction } from "react";

interface PostFormProps {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

const PostForm = ({ closeForm }: PostFormProps) => {
  const postForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      media: undefined,
      isPublic: false,
    },
  });

  const createPost = async (data: z.infer<typeof postFormSchema>) => {
    if (!data.media) return;
    const media = await uploadImage(data.media);

    await axios.post(
      API_ENDPOINT + routes.createPost.path,
      {
        ...data,
        media,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
        },
      },
    );
    closeForm(false);
    window.location.reload();
  };
  return (
    <div>
      <Form {...postForm}>
        <form
          onSubmit={postForm.handleSubmit((data) => createPost(data))}
          className="flex w-full flex-col gap-5"
        >
          <FormField
            control={postForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Something Awesome happened" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={postForm.control}
            name="media"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={(e) => {
                      onChange(e.target.files?.[0]);
                    }}
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={postForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe your awesome moment"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={postForm.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="ml-2">Is the post public?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default">
            Create Post
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
