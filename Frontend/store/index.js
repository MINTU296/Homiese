import {create} from "zustand/react";
import {authSlice} from "./slice/auth.slice";

export const useAppStore = create()((...a) => ({
        ...authSlice(...a),
}))