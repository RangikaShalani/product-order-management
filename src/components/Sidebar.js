
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    List,
    ListItem,
    Typography,
    Drawer,
    IconButton,
    ListItemIcon,
    Collapse,
    Paper,
    Tooltip,
    Box,
} from "@mui/material";
import {
    ChevronLeft,
    Search,
    ExpandLess,
    ExpandMore,
    KeyOutlined,
    LinkOutlined,
    ManageAccountsOutlined,
    SettingsOutlined,
    ShieldOutlined,
    Menu,
} from "@mui/icons-material";

import '../styles/layout.css';

export default function Sidebar() {

    const settingsList = [
        {
            id: 1,
            name: "Product List",
            link: "/productList",
            icon: <ManageAccountsOutlined />,
        },
        {
            id: 2,
            name: "Order List",
            link: "/orderList",
            icon: <ShieldOutlined />,
        },

    ];

    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div
            className={`sidebar-main-panel ${drawerOpen ? "open" : "closed"}`}

        >
            {/* <button onClick={toggleDrawer}>☰</button> */}

            <IconButton onClick={toggleDrawer} className="menuButton" >
                {drawerOpen ? <ChevronLeft className="sideIcon" /> : <Menu className="sideIcon" />}
            </IconButton>

            <Box className="listContainer" >
                <List dense={false}>
                    {settingsList.map((item, index) => {
                        return (
                            <ListItem
                                button
                                key={item.id}
                            >
                                <Link to={item.link} passHref>
                                    <Tooltip
                                        title={!drawerOpen ? item.name : ""}
                                        placement="right"
                                    >
                                        <Box className="listItemContent">
                                            <ListItemIcon
                                                className="listItemIcon"
                                            >
                                                {item.icon}
                                            </ListItemIcon>

                                            {drawerOpen && (
                                                <Typography
                                                    // variant="h6"
                                                    className="listItemText"
                                                >
                                                    {item.name}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Tooltip>
                                </Link>
                            </ListItem>
                        );
                    })}


                </List>
            </Box>


        </div>
    );
}
