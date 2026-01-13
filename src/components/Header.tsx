'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser, fetchUserData } from '@/store/slices/userSlice';
import Image from 'next/image';

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  
  // Fetch user data when component mounts
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  // Get the first letter of the user's name or email for the avatar
  const getInitials = () => {
    if (!user) return 'U';
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <div className="flex items-center space-x-4">
          {user?.image ? (
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={user.image}
                alt={user.name || 'User'}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              {getInitials()}
            </div>
          )}
          <span className="text-gray-700">{user?.name || 'User'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;