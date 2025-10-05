// ! OG Creator => @ny
// ! Contributor => @dash

// import react
import { useEffect, useRef, useState } from "react";

// import chakra ui
import {
  AspectRatio,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import DOMPurify from "dompurify";

// import styles
import "./BlogViewCard.css";
import { useParams } from "next/navigation";
import { IBlogDetails } from "@/types/features/blogs/blogs.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import BlogCommentCard from "../BlogCommentCards/BlogCommentCard";
import { addComment } from "@/lib/features/blogs/blogsAction";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { resetState, updateBlog } from "@/lib/features/blogs/blogsSlice";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import { addRedirection } from "@/lib/features/utilSlice/utileSlice";

// // import types
// import {
//   IBlogComment,
//   IBlogView
// } from '../../../types/features/blog/blog.types';

export default function BlogViewCard({
  commentToggler,
  data,
}: {
  commentToggler: number;
  data: IBlogDetails;
}) {
  const purify = DOMPurify();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const showToast = useCustomToast();

  const commentSectionRef = useRef<HTMLHeadingElement>();

  const [comment, setComment] = useState<string>("");

  const { message, status, blogForRead } = useAppSelector(
    (state) => state.blogs
  );
  const { user, name } = useAppSelector((state) => state.auth);

  const handleCommenting = async () => {
    if (!user) {
      showToast(
        "One step pending!",
        "Please register with us before commenting!",
        "warning"
      );
      dispatch(setAuthModal("signup"));
      dispatch(addRedirection("/pricing"));
      return;
    }
    const body = {
      comment,
      blog_id: id as string,
    };
    const response = await dispatch(addComment({ body }));

    if (response.meta.requestStatus === "fulfilled") {
      const updateData: IBlogDetails = {
        ...(blogForRead as IBlogDetails),
        comments: [
          ...(blogForRead as IBlogDetails).comments,
          {
            id: crypto.randomUUID(),
            comment,
            userID: "not defined",
            userName: name?.firstName as string,
            createdAt: new Date().toString(),
          },
        ],
      };
      dispatch(updateBlog(updateData));
    }
  };

  /* This `useEffect` hook is watching for changes in the `commentToggler` state variable. If
  `commentToggler` changes, it will scroll the window to the top of the comment section by using the
  `window.scrollTo()` method. The `commentSectionRef` is used to get the offset top position of the
  comment section. The `behavior: 'smooth'` option is used to make the scrolling smooth instead of
  instant. */
  useEffect(() => {
    if (commentToggler) {
      window.scrollTo({
        top: commentSectionRef?.current?.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [commentToggler]);

  useEffect(() => {
    if ((status === "success" || status === "error") && message) {
      showToast(status === "success" ? "Great!" : "Ugh!", message, status);
      dispatch(resetState());
      setComment("");
    }
  }, [message, status]);

  return (
    <Card>
      <AspectRatio ratio={16 / 9}>
        <Image
          // NB: need to change url
          src={`https://api.pickmymaid.com/${data.thumbnail}`}
          alt={data.title}
          h="100%"
          w="100%"
          borderRadius="8px 8px 0 0"
          objectFit="cover"
          objectPosition="center"
        />
      </AspectRatio>

      <CardBody
        display="flex"
        flexDir="column"
        gap="0.5rem"
        textAlign="justify"
        p={{ base: "0.8rem", sm: "1.5rem" }}
      >
        <Text as="i" fontSize={{ base: "xs", sm: "sm" }} fontWeight="500">
          Posted on{" "}
          {new Date(data.editedAt).toLocaleDateString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>

        <Heading as="h1" variant="secondary">
          {data.title}
        </Heading>

        <Text
          opacity="0.6"
          fontSize={{ base: "0.9rem", md: "1.05rem" }}
          fontWeight="500"
          variant="fade"
        >
          {data.description}
        </Text>

        <div
          className="blog-content"
          // ? - Need to disable this so that rich text can be shown
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: purify.sanitize(data.content) }}
        />

        <Heading
          // @ts-ignore
          ref={commentSectionRef}
          margin="1rem 0"
          mr="auto"
          variant="tertiary"
        >
          Comments({data?.comments?.length})
        </Heading>

        <VStack>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Type your comments..."
            rows={6}
            resize="none"
            fontSize={{ base: "sm", sm: "md" }}
          />

          <Button
            onClick={handleCommenting}
            isDisabled={comment.length === 0 || status === "loading"}
            size={{ base: "xs", sm: "sm" }}
            variant="solid"
            alignSelf="flex-end"
            borderRadius="4px"
          >
            Add Comment
          </Button>
        </VStack>

        <VStack spacing={4}>
          {data?.comments &&
            data?.comments.map((singleComment) => (
              <BlogCommentCard key={singleComment.id} data={singleComment} />
            ))}
        </VStack>
      </CardBody>
    </Card>
  );
}
