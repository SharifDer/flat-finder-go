
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserType = 'renter' | 'landlord' | null;

type UserPreferenceContextType = {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (value: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

const UserPreferenceContext = createContext<UserPreferenceContextType | undefined>(undefined);

export const UserPreferenceProvider = ({ children }: { children: React.ReactNode }) => {
  // Check local storage for user preferences
  const [userType, setUserType] = useState<UserType>(() => {
    const saved = localStorage.getItem('userType');
    return saved ? (saved as UserType) : null;
  });
  
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(() => {
    return localStorage.getItem('hasVisited') !== 'true';
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Save preferences to local storage when they change
  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    }
  }, [userType]);

  useEffect(() => {
    if (!isFirstVisit) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, [isFirstVisit]);
  
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  const value = {
    userType,
    setUserType,
    isFirstVisit,
    setIsFirstVisit,
    isLoggedIn,
    setIsLoggedIn
  };

  return (
    <UserPreferenceContext.Provider value={value}>
      {children}
    </UserPreferenceContext.Provider>
  );
};

export const useUserPreference = () => {
  const context = useContext(UserPreferenceContext);
  if (context === undefined) {
    throw new Error('useUserPreference must be used within a UserPreferenceProvider');
  }
  return context;
};
