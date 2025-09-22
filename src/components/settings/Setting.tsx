import { useState, useEffect } from "react";
import { SettingsView } from "./components";
import { useUser } from "@/provider/userProvider";

type SettingsProps = {
  user: any;
  shadow: any;
};

export function Settings({ user, shadow }: SettingsProps) {
  return <SettingsView user={user} />;
}
