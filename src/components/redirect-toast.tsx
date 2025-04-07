"use client";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { useEffect } from "react";
import { toast } from "sonner";

const RedirectToast = () => {
  useEffect(() => {
    const showToast = async () => {
      const message = await getCookieByKey("toast");
      if (message) toast(message);
      await deleteCookieByKey("toast");
    };

    showToast();
  }, []);
  return null;
};
export default RedirectToast;
