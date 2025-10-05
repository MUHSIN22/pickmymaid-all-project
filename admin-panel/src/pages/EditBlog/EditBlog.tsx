import { Heading, VStack } from '@chakra-ui/react';
import BlogForm from '../../components/Forms/BlogForm/BlogForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getBlogById } from '../../features/manageBlogs/manageBlogAction';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function EditBlog() {
  const { blogId } = useParams();
  const dispatch = useAppDispatch();

  const { blogForEdit } = useAppSelector((state) => state?.blogs);

  useEffect(() => {
    dispatch(getBlogById({ id: blogId as string }));
  }, [blogId]);
  return (
    <VStack alignItems='flex-start'>
      <Heading variant='sectionHeading'>Add Blog</Heading>
      <BlogForm blogForEdit={blogForEdit} blogId={blogId} />
    </VStack>
  );
}
