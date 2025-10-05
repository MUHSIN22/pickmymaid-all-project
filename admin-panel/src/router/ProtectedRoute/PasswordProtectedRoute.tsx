import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logout } from '../../features/manageAuth/manageAuthSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { validateJWTExpiration } from '../../utils/validateJWTExpiration/validateJWTExpiration';

export default function PasswordProtectedRoute() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isValid, setValidity] = useState<boolean>(false);
  const token = useAppSelector((state) => state?.auth?.token);

  useEffect(() => {
    if (token) {
      let valid = validateJWTExpiration(token);
      console.log({ valid });

      if (valid) {
        setValidity(true);
      } else {
        dispatch(logout());
        setValidity(false);
        navigate('/login');
      }
    } else {
      dispatch(logout());
      setValidity(false);
      navigate('/login');
    }
  }, [token]);
  return <>{isValid && <Outlet />}</>;
}
