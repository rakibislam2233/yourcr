"use client";

import { getMyProfile } from "@/services/user.service";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Institution {
  id: string;
  name: string;
  shortName?: string;
  type: string;
  logo: string | null;
  email?: string;
  phoneNumber?: string;
  contactEmail: string;
  contactPhone: string;
  website: string | null;
  address: string;
  establishedYear?: string | number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Batch {
  id: string;
  institutionId: string;
  name: string;
  batchType: string;
  department: string;
  academicYear: string;
  semester?: string;
  session?: string;
  isActive: boolean;
  isArchived: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  status: string;
  role: string;
  isCr: boolean;
  studentRoll?: string;
  institutionId: string;
  currentBatchId: string;
  createdAt: string;
  profileImage?: string;
  institution?: Institution;
  currentBatch?: Batch;
}

import { logoutUser as logoutService } from "@/services/auth.service";

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    try {
      setLoading(true);
      const response = await getMyProfile();
      const profileData = response.data || response;
      setUser(profileData);
    } catch (error) {
      console.error("UserProvider: Failed to fetch profile", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
