"use client";

declare const chrome: any;
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  useQuery,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  picture?: string;
  role?: string;
  buddyUrl?: string;
  buddyName?: string;
  status?: string;
  todo?: string;
}

type UserContextType = {
  user: IUser | null;
  isLoading: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IUser | null, Error>>;
  handleLogout: () => void;
  updateUser: (updatedData: Partial<IUser>) => Promise<boolean>;
  createTask: (title: string, datetime: string) => Promise<boolean>; // ⬅️ нэмнэ
  loginWithGoogleIdToken: (idToken: string) => Promise<boolean>;
};

const UserContext = createContext<UserContextType>({} as any);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [cachedUser, setCachedUser] = useState<IUser | null>(null);

  // 🔹 token + user-г local storage-с уншина
  useEffect(() => {
    chrome.storage.local.get(["authToken", "user"]).then((data: any) => {
      if (data.authToken) {
        setToken(data.authToken);
      }
      if (data.user) {
        try {
          setCachedUser(
            typeof data.user === "string" ? JSON.parse(data.user) : data.user
          );
        } catch (e) {
          console.error("Failed to parse cached user", e);
        }
      }
    });
  }, []);

  // 🔹 Axios interceptor → бүх хүсэлтэд Authorization header автоматаар оруулна
  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [token]);

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery<IUser | null>({
    queryKey: ["me", token],
    queryFn: async () => {
      const res = await api.get("/users/me");
      const freshUser = res.data as IUser;

      await chrome.storage.local.set({ user: freshUser });
      setCachedUser(freshUser);
      return freshUser;
    },
    enabled: !!token,
    initialData: cachedUser,
  });

  // 🔹 Google login
  const loginWithGoogleIdToken = async (idToken: string) => {
    try {
      const res = await api.post("/auth/google", { id_token: idToken });
      const { token: newToken, user: newUser } = res.data;

      await chrome.storage.local.set({
        authToken: newToken,
        user: newUser,
        isLoggedIn: true,
      });

      setToken(newToken);
      setCachedUser(newUser);

      await refetch();
      return true;
    } catch (e) {
      console.error("google login failed", e);
      return false;
    }
  };

  const updateUser = async (updatedData: Partial<IUser>) => {
    try {
      const { user } = await chrome.storage.local.get(["user"]);
      const userId = user?._id || user?.id; // ⬅️ аль нь байгааг ашиглана
      if (!userId) throw new Error("User not found in storage");

      const res = await api.put(`/users/update/${userId}`, updatedData);

      if (res.status === 200) {
        const updatedUser = res.data.user as IUser;
        await chrome.storage.local.set({ user: updatedUser });
        setCachedUser(updatedUser);
        return true;
      }
      return false;
    } catch (e) {
      console.error("update /users/update/:id failed", e);
      return false;
    }
  };

  const createTask = async (title: string, datetime: string) => {
    try {
      const { user } = await chrome.storage.local.get(["user"]);
      const userId = user?._id || user?.id;
      if (!userId) throw new Error("User not found in storage");

      const newTask = {
        _id: Date.now().toString(), // түр ID өгнө
        title,
        datetime: new Date(datetime),
        status: "PENDING" as const,
      };

      // API руу явуулна
      const res = await api.put(`/users/update/${userId}`, {
        $push: { tasks: newTask },
      });

      if (res.status === 200) {
        const updatedUser = res.data.user as IUser;

        // cache + context update
        await chrome.storage.local.set({ user: updatedUser });
        setCachedUser(updatedUser);

        return true;
      } else {
        // API амжилтгүй бол local update хийхгүй
        return false;
      }
    } catch (e) {
      console.error("create task via /users/update/:id failed", e);
      return false;
    }
  };

  const handleLogout = async () => {
    await chrome.storage.local.remove(["authToken", "user", "isLoggedIn"]);
    setToken(null);
    setCachedUser(null);
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        user: user ?? cachedUser ?? null,
        isLoading,
        refetch,
        handleLogout,
        updateUser,
        createTask,
        loginWithGoogleIdToken,
      }}
    >
      {isLoading ? <div>...loading</div> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};
