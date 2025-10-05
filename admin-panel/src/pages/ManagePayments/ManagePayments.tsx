import { Heading, IconButton, VStack, useDisclosure } from '@chakra-ui/react';
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable';
import { IPayment } from '../../types/features/payment.types';
import moment from 'moment';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect, useMemo, useState } from 'react';
import {
  getPayments,
  verifyPayment,
} from '../../features/payments/paymentsAction';
import { RiDownloadCloud2Fill, RiQuestionFill } from 'react-icons/ri';
import AlertDialogRemoval from '../../components/AlertDialog/AlertDialogRemoval';
import useCustomToast from '../../hooks/useCustomToast/useCustomToast';
import { resetPayment } from '../../features/payments/paymentSlice';
import { axiosInstanceV2 } from '../../app/axiosInstance';

export default function ManagePayments() {
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useCustomToast();

  const { paymentsList, status, message } = useAppSelector(
    (state) => state?.payments
  );
  const searchQuery = useAppSelector((state) => state?.utils?.searchQuery);

  const [clicked, setClicked] = useState<{
    transRef: string | null;
    user_id: string | undefined | null;
  }>({
    transRef: null,
    user_id: null,
  });
  const [downloadFile, setDownloadFile] = useState<string[]>([]);
  const [filteredPayment, setFilteredPayments] = useState<IPayment[] | null>(
    null
  );

  const downloadInvoice = async (
    transRef: string,
    userId: string,
    name: string
  ) => {
    try {
      setDownloadFile((prev) => [...prev, transRef]);

      const response = await axiosInstanceV2.post('/payment/download-invoice', {
        ref: transRef,
        user_id: userId,
      });

      const downloadLink = document.createElement('a');

      downloadLink.href = response.data.data;
      downloadLink.download = `${name} Invoice.pdf`;
      downloadLink.click();

      // in case the Blob uses a lot of memory
      setTimeout(() => {
        URL.revokeObjectURL(downloadLink.href);
        downloadLink.remove();
      }, 7000);
    } catch (err) {
      console.error('Error downloading invoice:', err);
    } finally {
      setDownloadFile((prev) => prev.filter((f) => f !== transRef));
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row: IPayment) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: IPayment) => row.email,
      sortable: true,
    },
    {
      name: 'Mobile',
      selector: (row: IPayment) => (row.mobile ? `+${row.mobile}` : 'NIL'),
      sortable: true,
    },
    {
      name: 'Status',
      cell: (cell: IPayment) => (
        <span
          style={{
            color:
              cell.status === 0
                ? 'orange'
                : cell.status === 1
                ? 'green'
                : 'red',
          }}
        >
          {cell.status === 0
            ? 'Payment initiated'
            : cell.status === 1
            ? 'Paid'
            : cell.status === 2
            ? 'Expired'
            : 'NILL'}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Type',
      selector: (row: IPayment) =>
        row.type === 0
          ? 'Basic'
          : row.type === 1
          ? 'Standard'
          : row.type === 2
          ? 'Premium'
          : 'NILL',
      sortable: true,
    },
    {
      name: 'Payment Date',
      selector: (row: IPayment) => moment(row.updatedAt).format('DD-MM-yyyy'),
      sortable: true,
    },
    {
      name: 'Plan Expiry',
      selector: (row: IPayment) =>
        row.expiryDate ? moment(row.expiryDate).format('DD-MM-yyyy') : 'NILL',
      sortable: true,
    },
    {
      name: 'Token',
      selector: (row: IPayment) => row.transactionToken || 'NILL',
      sortable: true,
    },
    {
      name: 'Trans Ref',
      selector: (row: IPayment) => row.transRef || 'NILL',
      sortable: true,
    },
    {
      name: 'Verify Payment',
      cell: (cell: IPayment) => {
        return (
          <IconButton
            colorScheme='orange'
            aria-label='password-update'
            isLoading={status === 'loading' && clicked?.user_id === cell.userId}
            icon={<RiQuestionFill />}
            onClick={() => {
              setClicked({
                transRef: cell.transRef,
                user_id: cell.userId,
              });
              onOpen();
            }}
          />
        );
      },
    },
    {
      name: 'Invoice',
      cell: (cell: IPayment) => {
        return (
          <>
            {cell.status !== 0 ? (
              <IconButton
                colorScheme='blue'
                aria-label='password-update'
                isLoading={downloadFile.includes(cell.transRef || '')}
                icon={<RiDownloadCloud2Fill />}
                onClick={() => {
                  downloadInvoice(
                    cell.transRef || '',
                    cell.userId || '',
                    cell.name
                  );
                }}
              />
            ) : null}
          </>
        );
      },
    },
  ];

  const onAlertProceed = async () => {
    await dispatch(verifyPayment(clicked));
    onClose();
  };

  useMemo(() => {
    if (status !== 'idle' && message) {
      if (status === 'success') {
        toast('Success', message);
      } else if (status === 'error') {
        toast('Error', message, 'error');
      }
      dispatch(resetPayment());
    }
  }, [status, message]);

  useMemo(() => {
    dispatch(getPayments());
  }, []);

  useEffect(() => {
    if (searchQuery?.length !== 0) {
      let filteredData = paymentsList?.filter(
        (item) =>
          item?.name?.includes(searchQuery) ||
          item?.mobile?.includes(searchQuery) ||
          item?.email?.includes(searchQuery) ||
          item?.transRef?.includes(searchQuery) ||
          item?.transactionToken?.includes(searchQuery)
      );
      setFilteredPayments(filteredData || null);
    } else {
      setFilteredPayments(paymentsList);
    }
  }, [searchQuery, paymentsList]);

  return (
    <VStack alignItems='flex-start'>
      /* The code `{/* <AlertDialogRemoval ... /> */}` is a commented out JSX
      component. It appears to be an AlertDialog component that prompts the user
      to confirm if they want to change the password of a customer. It takes in
      props such as `title`, `body`, `isOpen`, `onClose`, and `onProceed`.
      However, since it is commented out, it is not being rendered or used in
      the code. */
      <AlertDialogRemoval
        title='Are you sure?'
        body='Are you sure to verify the payment?'
        isOpen={isOpen}
        onClose={onClose}
        onProceed={onAlertProceed}
      />
      <Heading variant='sectionHeading'>Manage Payments</Heading>
      <CustomDataTable
        columns={columns}
        data={filteredPayment || []}
        selectableRows={false}
      />
    </VStack>
  );
}
