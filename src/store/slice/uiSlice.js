import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarOpen: true,
    themeMode: "light",
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
    },
});

export const { toggleSidebar, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
