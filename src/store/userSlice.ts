import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "~/app/(student)/(home)/type/teacher.type";

interface UserState {
    user: UserType | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserType | null>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
