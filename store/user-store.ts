import { create } from "zustand";

export interface UserStoreState {
  name: string | null;
  email: string;
  role: string;
  permissions: string[];
  setUser: (
    name: string,
    email: string,
    role: string,
    permissions: string[]
  ) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  name: null,
  email: "",
  role: "",
  permissions: [],

  /**
   * Sets the user state with the given values.
   * @param {string} name - The user's name.
   * @param {string} email - The user's email.
   * @param {string} role - The user's role.
   * @param {string[]} permissions - The user's permissions.
   */
  setUser: (name, email, role, permissions) =>
    set(() => ({
      name,
      email,
      role,
      permissions,
    })),

  /**
   * Clears the user state.
   */
  clearUser: () =>
    set(() => ({
      name: null,
      email: "",
      role: "",
      permissions: [],
    })),
}));

export default useUserStore;
