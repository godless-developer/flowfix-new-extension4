"use client";

declare const chrome: any;
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext } from "react";

export interface IUser {
  id: any;
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: number;
  dob?: Date;
  address?: string;
  profile_img?: string;
  gender?: string;
  password?: string;
  coordinate?: string;
  longitude?: number;
  latitude?: number;
  user_role_id: string;
  status?: string;
}

type UserContextType = {
  _id: any;
  user: IUser | null;
  handleLogout: () => void;
  updateUser: (id: string, updatedData: Partial<IUser>) => Promise<boolean>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IUser | null, Error>>;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery<IUser | null>({
    queryKey: ["users"],
    queryFn: async () => {
      const email = await chrome.storage.local.get(["email"]);
      const isLoggedin = await chrome.storage.local.get(["isLoggedin"]);
      if (!isLoggedin || !email) {
        return null;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/users/byEmail/${email.email}`
        );
        console.log(response.data, "fetched user");
        return response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
  });

  const updateUser = async (id: string, updatedData: Partial<IUser>) => {
    try {
      const payload = {
        ...updatedData,
        email: updatedData.email || user?.email,
      };

      const res = await axios.put(
        `http://localhost:4000/users/update/${id}`,
        payload
      );

      if (res.status === 200) {
        await refetch();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  };

  const handleLogout = () => {
    chrome.storage.local.remove(["access_token", "isLoggedin"]);
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        _id: user?._id ?? null,
        user: user ?? null,
        handleLogout,
        updateUser,
        refetch,
        isLoading,
      }}
    >
      {isLoading ? <div>...loading</div> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};
