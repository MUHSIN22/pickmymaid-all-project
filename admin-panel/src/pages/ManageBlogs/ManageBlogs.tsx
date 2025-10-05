import {
  AspectRatio,
  Flex,
  Heading,
  IconButton,
  Image,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import AddButton from '../../components/Buttons/AddButton/AddButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import {
  deleteBlog,
  getAllBlogs,
} from '../../features/manageBlogs/manageBlogAction';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IBlogRow } from '../../types/features/manageBlog.types';
import { RiDeleteBin2Line, RiEdit2Fill } from 'react-icons/ri';
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable';
import AlertDialogRemoval from '../../components/AlertDialog/AlertDialogRemoval';
import {
  resetState,
  updateBlogs,
} from '../../features/manageBlogs/manageBlogSlice';
import useCustomToast from '../../hooks/useCustomToast/useCustomToast';

export default function ManageBlogs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showToast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { blogs, status, message } = useAppSelector((state) => state?.blogs);
  const { searchQuery } = useAppSelector((state) => state?.utils);

  const [deleteBlogID, setDeleteBlogID] = useState<string | null>(null);
  const [filteredBlogs, setFilteredBlogs] = useState<IBlogRow[]>([]);

  const columns = [
    {
      name: 'Thumbnail',
      cell: (cell: IBlogRow) => {
        return (
          <AspectRatio ratio={16 / 9} w='4rem'>
            <Image src={cell.thumbnail} w='100%' h='100%' />
          </AspectRatio>
        );
      },
    },
    {
      name: 'Title',
      selector: (row: IBlogRow) => row.title,
      sortable: true,
    },
    {
      name: 'Edited Date',
      selector: (row: IBlogRow) => new Date(row.editedAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Edit',
      cell: (cell: IBlogRow) => {
        return (
          <IconButton
            colorScheme='blue'
            aria-label='Delete Blog'
            onClick={() => navigate(`/edit-blog/${cell.id}`)}
            icon={<RiEdit2Fill />}
          />
        );
      },
    },
    {
      name: 'Delete',
      cell: (cell: IBlogRow) => {
        return (
          <IconButton
            colorScheme='red'
            aria-label='Delete Blog'
            onClick={() => {
              onOpen();
              setDeleteBlogID(cell.id);
            }}
            isLoading={status === 'loading' && deleteBlogID === cell.id}
            icon={<RiDeleteBin2Line />}
          />
        );
      },
    },
  ];

  const handleBlogDeletion = async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(deleteBlog({ id: deleteBlogID as string }));

    onClose();

    if (requestStatus === 'fulfilled') {
      let newBlogs = blogs.filter((blog) => blog.id !== deleteBlogID);
      dispatch(updateBlogs(newBlogs));
      setDeleteBlogID(null);
    }
  };

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const filteredData = blogs?.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filteredData);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [blogs, searchQuery]);

  useEffect(() => {
    if ((status === 'error' || status === 'success') && message) {
      showToast(status === 'error' ? 'Ugh no!' : 'Great!', message, status);
      dispatch(resetState());
    }
  }, [status, message]);

  return (
    <VStack alignItems='flex-start'>
      <AlertDialogRemoval
        title='Are you sure?'
        body='Are you sure you want tot delete the selected blog?'
        isOpen={isOpen}
        onClose={onClose}
        onProceed={handleBlogDeletion}
      />

      <Heading variant='sectionHeading'>Manage Blogs</Heading>
      <VStack w='100%'>
        <Flex justifyContent='flex-end' w='100%'>
          <AddButton onClick={() => navigate('/add-blog')}>New Blog</AddButton>
        </Flex>
      </VStack>

      <CustomDataTable
        columns={columns}
        data={filteredBlogs}
        selectableRows={false}
      />
    </VStack>
  );
}
