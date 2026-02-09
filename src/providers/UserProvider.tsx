"use client";

import { getMyProfile } from "@/services/user.service";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Institution {
  id: string;
  name: string;
  type: string;
  logo: string | null;
  contactEmail: string;
  contactPhone: string;
  website: string | null;
  address: string;
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
  institutionId: string;
  currentBatchId: string;
  createdAt: string;
  profileImage?: string;
  institution?: Institution;
  currentBatch?: Batch;
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
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
      // Based on the specific response format provided: response.data
      const profileData = response.data || response;
      setUser(profileData);
    } catch (error) {
      console.error("UserProvider: Failed to fetch profile", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshProfile }}>
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
