"use client";
import { updateMyProfile } from "@/services/user.service";
import { getWebPushToken } from "@/utils/push-notification";
import { useEffect } from "react";
import { UserProfile } from "@/interface/user.interface";

export default function PushNotificationManager({
  user,
}: {
  user: UserProfile | null;
}) {
  useEffect(() => {
    const syncPushToken = async () => {
      const token = await getWebPushToken();

      if (token && user) {
        try {
          await updateMyProfile({ webPushToken: token });
          console.log("Web Push Token Synced Successfully");
        } catch (error) {
          console.error("Failed to sync push token:", error);
        }
      }
    };

    syncPushToken();
  }, [user]);

  return null;
}
