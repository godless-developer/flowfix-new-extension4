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
  { id: "chair-1", x: -55, y: -42, type: "front" },
  { id: "chair-2", x: 10, y: -42, type: "front" },
  { id: "chair-3", x: 75, y: -42, type: "front" },
  { id: "chair-4", x: -55, y: 38, type: "front" },
  { id: "chair-5", x: 10, y: 38, type: "front" },
  { id: "chair-6", x: 75, y: 38, type: "front" },
  { id: "chair-7", x: 235, y: -42, type: "front" },
  { id: "chair-8", x: 300, y: -42, type: "front" },
  { id: "chair-9", x: 365, y: -42, type: "front" },
  { id: "chair-10", x: 235, y: 38, type: "front" },
  { id: "chair-11", x: 300, y: 38, type: "front" },
  { id: "chair-12", x: 365, y: 38, type: "front" },
  { id: "chair-01", x: -55, y: 78, type: "front" },
  { id: "chair-02", x: 10, y: 78, type: "front" },
  { id: "chair-03", x: 75, y: 78, type: "front" },
  { id: "chair-04", x: -55, y: 158, type: "front" },
  { id: "chair-05", x: 10, y: 158, type: "front" },
  { id: "chair-06", x: 75, y: 158, type: "front" },
  { id: "chair-07", x: 235, y: 78, type: "front" },
  { id: "chair-08", x: 300, y: 78, type: "front" },
  { id: "chair-09", x: 365, y: 78, type: "front" },
  { id: "chair-010", x: 235, y: 158, type: "front" },
  { id: "chair-011", x: 300, y: 158, type: "front" },
  { id: "chair-012", x: 365, y: 158, type: "front" },
];

export function OfficeContent() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [chairs, setChairs] = useState<Chair[]>([]);
  const [occupied, setOccupied] = useState<{
    [key: string]: { img: string; status?: string };
  }>({});
  const [selectedChair, setSelectedChair] = useState<string | null>(null);

  const currentUserId = "wsefsfse";

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
  }, ["sfksfjs"]);

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
