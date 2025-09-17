import { useState, useEffect } from "react";
import { SettingsView } from "./components";
import { useUser } from "@/provider/userProvider";

type SettingsProps = {
  user: any;
  shadow: any;
};

const sampleAvatars = [
  "https://res.cloudinary.com/dsvivujtj/image/upload/v1757177645/avatarbg_hzqgps.png",
  "https://res.cloudinary.com/dsvivujtj/image/upload/v1757189957/avatarMale_dgw6nb.png",
  "https://res.cloudinary.com/dsvivujtj/image/upload/v1757192244/Gemini_Generated_Image_5cit925cit925cit_phsxk3.png",
  "https://res.cloudinary.com/dsvivujtj/image/upload/v1757192322/avatarMaleLvl2_tv7ba0.png",
];

export function Settings({ user, shadow }: SettingsProps) {
  const { updateUser, _id } = useUser();
  const [formData, setFormData] = useState({ ...user });
  const [originalData, setOriginalData] = useState({ ...user });
  const [avatarIndex, setAvatarIndex] = useState(
    sampleAvatars.indexOf(user.profile_img) >= 0
      ? sampleAvatars.indexOf(user.profile_img)
      : 0
  );

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  useEffect(() => {
    setFormData({ ...user });
    setOriginalData({ ...user });
  }, [user]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log(user.address);

  const handleAvatarChange = (dir: "left" | "right") => {
    setAvatarIndex((prev) => {
      const newIndex =
        dir === "left"
          ? (prev - 1 + sampleAvatars.length) % sampleAvatars.length
          : (prev + 1) % sampleAvatars.length;
      const newImg = sampleAvatars[newIndex];
      setFormData((prev: any) => ({ ...prev, profile_img: newImg }));
      return newIndex;
    });
  };

  const handleSave = async () => {
    if (!_id) return;
    const success = await updateUser(_id, formData);
    if (success) {
      setOriginalData({ ...formData });
      shadow.showToast("Амжилттай хадгаллаа!", {
        type: "success",
        duration: 3000,
      });
    } else {
      shadow.showToast("Update failed!", {
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <SettingsView
      user={user}
      formData={formData}
      avatarIndex={avatarIndex}
      sampleAvatars={sampleAvatars}
      hasChanges={hasChanges}
      onChange={handleChange}
      onAvatarChange={handleAvatarChange}
      onSave={handleSave}
    />
  );
}
