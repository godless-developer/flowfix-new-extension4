// OfficeContent.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "@/api/office-context";
import { OfficeView } from "./OfficeView";
import { useUser } from "@/provider/userProvider";

type Chair = {
  id: string;
  x: number;
  y: number;
  type: "front" | "back" | "left" | "right" | "spec" | "spec1";
};

type User = {
  email: string;
  _id: string;
  first_name: string;
  last_name: string;
  profile_img?: string;
  coordinates?: {
    type: Chair["type"];
    point: [number, number];
  };
  status?: "active" | "inactive" | "remote" | "onvacation";
  department: string;
};

const defaultChairs: Chair[] = [
  { id: "chair-1", x: 270, y: 215, type: "front" },
  { id: "chair-2", x: 300, y: 215, type: "front" },
  { id: "chair-3", x: 330, y: 215, type: "front" },
  { id: "chair-4", x: 270, y: 250, type: "back" },
  { id: "chair-5", x: 300, y: 250, type: "back" },
  { id: "chair-6", x: 330, y: 250, type: "back" },
  { id: "chair-7", x: 270, y: 283, type: "back" },
  { id: "chair-8", x: 300, y: 283, type: "back" },
  { id: "chair-9", x: 330, y: 283, type: "back" },
  { id: "chair-10", x: 270, y: 298, type: "front" },
  { id: "chair-11", x: 300, y: 298, type: "front" },
  { id: "chair-12", x: 330, y: 298, type: "front" },
  { id: "chair-13", x: 270, y: 327, type: "back" },
  { id: "chair-14", x: 300, y: 327, type: "back" },
  { id: "chair-15", x: 330, y: 327, type: "back" },
  { id: "chair-16", x: 270, y: 340, type: "front" },
  { id: "chair-17", x: 300, y: 340, type: "front" },
  { id: "chair-18", x: 330, y: 340, type: "front" },
  { id: "chair-19", x: 270, y: 372, type: "back" },
  { id: "chair-20", x: 300, y: 372, type: "back" },
  { id: "chair-21", x: 330, y: 372, type: "back" },
  { id: "chair-22", x: 270, y: 384, type: "front" },
  { id: "chair-23", x: 300, y: 384, type: "front" },
  { id: "chair-24", x: 270, y: 415, type: "back" },
  { id: "chair-25", x: 300, y: 415, type: "back" },
  { id: "chair-26", x: 330, y: 432, type: "front" },
  { id: "chair-27", x: 360, y: 432, type: "front" },
  { id: "chair-28", x: 330, y: 467, type: "back" },
  { id: "chair-29", x: 360, y: 467, type: "back" },
  { id: "chair-30", x: 443, y: 334, type: "left" },
  { id: "chair-31", x: 443, y: 364, type: "left" },
  { id: "chair-32", x: 443, y: 394, type: "left" },
  { id: "chair-33", x: 491, y: 304, type: "left" },
  { id: "chair-34", x: 491, y: 334, type: "left" },
  { id: "chair-35", x: 491, y: 364, type: "left" },
  { id: "chair-36", x: 491, y: 394, type: "left" },
  { id: "chair-37", x: 548, y: 370, type: "spec" },
  { id: "chair-38", x: 565, y: 345, type: "spec" },
  { id: "chair-39", x: 589, y: 227, type: "spec1" },
  { id: "chair-40", x: 582, y: 253, type: "spec1" },
  { id: "chair-41", x: 575, y: 280, type: "spec1" },
];

export function OfficeContent({ user }: { user: any }) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [chairs, setChairs] = useState<Chair[]>([]);
  const [occupied, setOccupied] = useState<{
    [key: string]: { img: string; status?: string };
  }>({});
  const [selectedChair, setSelectedChair] = useState<string | null>(null);

  const currentUserId = user._id;

  const fetchUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users);

    const occ: { [key: string]: { img: string; status?: string } } = {};
    users.forEach((u: any) => {
      if (u.coordinates?.point && u.profile_img) {
        const key = `${u.coordinates.point[0]}-${u.coordinates.point[1]}`;
        occ[key] = { img: u.profile_img, status: u.status };
      }
    });
    setOccupied(occ);
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  useEffect(() => {
    const userChairs: Chair[] = allUsers
      .filter((u) => u.coordinates?.point)
      .map((u) => ({
        id: `${u.coordinates!.point[0]}-${u.coordinates!.point[1]}`,
        x: u.coordinates!.point[0],
        y: u.coordinates!.point[1],
        type: u.coordinates!.type,
      }));

    setChairs([...defaultChairs, ...userChairs]);
  }, [allUsers]);

  const handleChairClick = (chairId: string) => {
    setSelectedChair((prev) => (prev === chairId ? null : chairId));
  };

  const handleSit = async (chairId: string) => {
    const chair = chairs.find((c) => c.id === chairId);
    if (!chair) return;

    await updateUser(currentUserId, {
      coordinates: {
        type: chair.type,
        point: [chair.x, chair.y],
      },
    });

    await fetchUsers();
    setSelectedChair(null);
  };

  const getUserInfo = (id: string) => {
    const u = allUsers.find(
      (user) =>
        `${user.coordinates?.point?.[0]}-${user.coordinates?.point?.[1]}` === id
    );
    return u
      ? {
          name: `${u.first_name} ${u.last_name}`,
          email: u.email,
          department: u.department,
        }
      : undefined;
  };

  return (
    <OfficeView
      coordinates={chairs}
      occupied={occupied}
      selectedChair={selectedChair}
      onChairClick={handleChairClick}
      onSit={handleSit}
      getUserInfo={getUserInfo}
    />
  );
}
