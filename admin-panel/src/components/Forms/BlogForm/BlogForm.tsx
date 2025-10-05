import { useForm } from 'react-hook-form';
import {
  IBlogEditForm,
  IBlogForm,
} from '../../../types/components/Forms/blogform.types';
import { Button, VStack } from '@chakra-ui/react';
import PrimaryInput from '../../InputFields/PrimaryInput/PrimaryInput';
import PrimaryTextField from '../../InputFields/PrimaryTextField/PrimaryTextField';
import EditorField from '../../InputFields/EditorField/EditorField';
import ImageUploader from '../../InputFields/ImageUploader/ImageUploader';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import {
  editBlog,
  submitBlog,
} from '../../../features/manageBlogs/manageBlogAction';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useEffect } from 'react';
import useCustomToast from '../../../hooks/useCustomToast/useCustomToast';
import { resetState } from '../../../features/manageBlogs/manageBlogSlice';
import { IBlogDetials } from '../../../types/features/manageBlog.types';
import { imageUrl } from '../../../app/config/imageUrl';

export default function BlogForm({
  blogForEdit,
  blogId,
}: {
  blogForEdit: IBlogDetials | null;
  blogId: string | undefined;
}) {
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm<IBlogForm>({ mode: 'onChange' });

  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const { message, status } = useAppSelector((state) => state?.blogs);

  const onFormSubmission = (data: IBlogForm) => {
    if (blogId) {
      let body: IBlogEditForm = {
        content: data.content,
        description: data.description,
        title: data.title,
      };
      if (typeof data.thumbnail === 'string') {
        body.thumbnail = blogForEdit?.thumbnail;
      } else {
        body.thumbnailFile = data.thumbnail;
      }

      dispatch(editBlog({ data: body, id: blogId }));
    } else {
      dispatch(submitBlog(data));
    }
  };

  useEffect(() => {
    if ((status === 'success' || status === 'error') && message) {
      toast(status === 'error' ? 'Ugh no!' : 'Great!', message, status);
      if (!blogId) {
        reset({
          content: '',
          description: '',
          thumbnail: '',
          title: '',
        });
      }
      dispatch(resetState());
    }
  }, [message, status]);

  useEffect(() => {
    if (blogId && blogForEdit) {
      reset({
        content: blogForEdit.content,
        description: blogForEdit.description,
        thumbnail: `${imageUrl}${blogForEdit.thumbnail}`,
        title: blogForEdit.title,
      });
    }
  }, [blogId, blogForEdit]);

  return (
    <VStack w='100%'>
      <ImageUploader
        control={control}
        label='Thumbnail'
        rules={{ required: 'Thumbnail is required' }}
        maxW='15rem'
        ratio='1.414/1'
        name='thumbnail'
        required
      />
      <PrimaryInput
        label='Title'
        register={register('title', { required: 'Title is a required field' })}
        errorMessage={errors?.title?.message}
        required
      />
      <PrimaryTextField
        label='Description'
        register={register('description', {
          required: 'Description is a required field',
        })}
        errorMessage={errors?.description?.message}
        required
      />
      <EditorField
        control={control}
        label='Blog Content'
        name='content'
        rules={{ required: 'This field is required' }}
      />
      <Button
        colorScheme='green'
        minW='15rem'
        isLoading={status === 'loading'}
        onClick={handleSubmit(onFormSubmission)}
      >
        Submit
      </Button>
    </VStack>
  );
}
