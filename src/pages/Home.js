import React from "react";
import "../styles/home.css";
import { Typography } from "@mui/material";

export default function Home() {
    return (
        <div className="page-container" >
            <div className="home-page-container" >
                <Typography variant="h3" gutterBottom>
                    Home Page
                </Typography>
                <Typography variant="body1">
                    Welcome to your React + Router + Global CSS app.
                </Typography>


            </div>
        </div>
    );
}
