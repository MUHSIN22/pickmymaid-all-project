import { Button, Center, Checkbox, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IRegisterForm } from '../../../types/components/Forms/registerForm.types';
import PrimaryInput from '../../InputFields/PrimaryInput/PrimaryInput';
import regularExpressions from '../../../app/regularExpressions';
import { IRegisterBody } from '../../../types/features/auth.types';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { addTeamMember } from '../../../features/manageTeam/manageTeamSlice';
import useCustomToast from '../../../hooks/useCustomToast/useCustomToast';
import { adminRegister } from '../../../features/manageAuth/manageAuthAction';

export default function RegisterForm({ onClose }: { onClose: any }) {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IRegisterForm>({ mode: 'onChange' });

  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const [superAdmin, setSuperAdmin] = useState<boolean>(false);

  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const message = useAppSelector((state) => state.auth.message);

  const onFormSubmission = async (data: IRegisterForm) => {
    let body: IRegisterBody = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
      is_super_admin: superAdmin,
    };
    let response: any = await dispatch(adminRegister({ body }));
    if (response && response?.payload) {
      dispatch(addTeamMember(response.payload?.userData));
      onClose();
      toast('Success', response?.payload?.message);
    }
  };

  useMemo(() => {
    if (message) {
      if (error) {
        toast('Error', message || '', 'error');
      } else {
        toast('Success', message || '');
      }
    }
  }, [error]);

  return (
    <VStack alignItems='flex-start' pb={{ base: 6 }}>
      <PrimaryInput
        label='Name'
        register={register('name', { required: 'This field is required' })}
        required
        errorMessage={errors?.name?.message}
      />
      <PrimaryInput
        label='Email'
        register={register('email', {
          required: 'This field is required',
          pattern: {
            value: regularExpressions.isEmail,
            message: 'Enter a valid email address',
          },
        })}
        required
        type='email'
        errorMessage={errors?.email?.message}
      />
      <PrimaryInput
        label='Password'
        register={register('password', { required: 'This field is required' })}
        required
        type='password'
        errorMessage={errors?.password?.message}
      />
      <PrimaryInput
        label='Confirm Password'
        register={register('confirmPassword', {
          required: 'This field is required',
          validate: (value) => {
            if (value !== watch('password'))
              return 'Password and confirm password should be equal';
          },
        })}
        required
        type='password'
        errorMessage={errors?.confirmPassword?.message}
      />
      <Checkbox
        marginRight='auto'
        {...register('isSuperAdmin')}
        onChange={() => setSuperAdmin(!superAdmin)}
      >
        Create as a super admin
      </Checkbox>
      <Center w='100%'>
        <Button
          variant='primary'
          isLoading={loading}
          onClick={handleSubmit(onFormSubmission)}
        >
          Submit
        </Button>
      </Center>
    </VStack>
  );
}
