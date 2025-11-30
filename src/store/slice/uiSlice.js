import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarOpen: true,
    themeMode: "light",
    login: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        toggleTheme: (state) => {
            state.themeMode = state.themeMode === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", state.themeMode);
        },
        setLogin: (state, action) => {
            state.login = action.payload;
        },
    },
});

export const { toggleSidebar, toggleTheme, setLogin } = uiSlice.actions;
export default uiSlice.reducer;
