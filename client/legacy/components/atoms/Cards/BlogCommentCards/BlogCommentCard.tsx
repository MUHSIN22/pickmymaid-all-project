// import chakra ui
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { IComment } from "@/types/features/blogs/blogs.types";

/* This code exports a React functional component called `BlogCommentCard` that takes in a single prop
called `data` of type `IBlogComment`. The component returns a `Card` component from the Chakra UI
library that displays the user's name, profile picture, and comment content. The `data` prop is used
to populate these fields with the appropriate information. */
export default function BlogCommentCard({ data }: { data: IComment }) {
  return (
    <Card shadow="1px 1px 10px rgba(0,0,0,0.1)" w="100%">
      <CardHeader p={{ base: "0.8rem", sm: "1.25rem" }} pb="0 !important">
        <Flex align="center" gap="0.5rem">
          <Avatar size={{ base: "sm", sm: "md" }} name={data.userName} />
          <Box textAlign="left">
            <Heading size={{ base: "xs", sm: "sm" }} w="max-content">
              {data?.userName}
            </Heading>
            <Text variant="fade" fontSize="0.8rem" fontWeight="500">
              {new Date(data.createdAt).toLocaleDateString()}
            </Text>
          </Box>
        </Flex>
      </CardHeader>

      <CardBody p={{ base: "0.8rem", sm: "1.25rem" }} fontWeight="500" pt={0}>
        <Text fontSize={{ base: "sm", sm: "md" }} variant="description">
          {data.comment}
        </Text>
      </CardBody>
    </Card>
  );
}
