import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { FaUnlock } from '@/components/atoms/Icons/Icons';
import { setAuthModal } from '@/lib/features/auth/authSlice';
import { addRedirection } from '@/lib/features/utilSlice/utileSlice';

const PremiumButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state?.auth?.user);

  const handleUnlocking = () => {
    localStorage.setItem('isUnlock', 'clicked');
    if (!user) {
      dispatch(setAuthModal('signup'));
      dispatch(addRedirection('/pricing'));
    } else {
      router.push('/pricing');
    }
  };

  return (
    <button
      onClick={handleUnlocking}
      className='p-[24px] rounded-[8px] font-semibold text-white h-[2rem] bg-[#2899ff] hover:bg-[#e3ae00] border-none flex items-center gap-[10px]'
    >
      Unlock Contacts
      <FaUnlock width={12} height={12} />
    </button>
  );
};

export default PremiumButton;
