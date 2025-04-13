import { User as AuthUser } from "Lucia";

type Entity = {
  userId: string | null;
};

export const isOwner = async (user: AuthUser | null | undefined, entity: Entity | null | undefined) => {
  if (!user || !entity) return false;
  if (!entity.userId) return false;
  return user.id === entity.userId;
};
