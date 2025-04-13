import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "../queries/get-auth";
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const [isFetched, setIsFetched] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user as User);
      setIsFetched(true);
    };
    fetchUser();
  }, [pathname]);

  return { isFetched, user } as const;
};
