import { create } from "zustand"
import { persist } from "zustand/middleware"
// import { User } from "../gql/graphql"


interface User {
    id: number;
    username: string;
    email: string;
    avatarUrl: string;
}
interface UserState {
  id: number | undefined
  avatarUrl: string | null
  username: string
  email?: string
 
  updateProfileImage: (image: string) => void
  updateUsername: (name: string) => void
  setUser: (user: User) => void
}

export const useAuth = create<UserState>()(
  persist(
    (set) => ({
      id: undefined,
      username: "",
      email: "",
      avatarUrl: null,

      updateProfileImage: (image: string) => set({ avatarUrl: image }),
      updateUsername: (name: string) => set({ username: name }),
      setUser: (user) =>
        set({
          id: user.id || undefined,
          avatarUrl: user.avatarUrl,
          username: user.username,
          email: user.email,
        }),
    }),
    {
      name: "user-store",
    }
  )
)