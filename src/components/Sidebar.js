
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    List,
    ListItem,
    Typography,
    IconButton,
    ListItemIcon,
    Tooltip,
    Box,
} from "@mui/material";
import {
    ChevronLeft,
    Menu
} from "@mui/icons-material";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import '../styles/layout.css';

export default function Sidebar({ open, setOpen }) {

    const settingsList = [
        {
            id: 1,
            name: "Product List",
            link: "/productList",
            icon: <LocalMallIcon />,
        },
        {
            id: 2,
            name: "Order List",
            link: "/orderList",
            icon: <ShoppingCartCheckoutIcon />,
        },

    ];

    // const [drawerOpen, setDrawerOpen] = useState(false);
    // const toggleDrawer = () => {
    //     setDrawerOpen(!drawerOpen);
    // };

    return (
        <div
            className={`sidebar-main-panel ${open ? "open" : "closed"}`}
        >
            <IconButton onClick={() => setOpen(!open)} className="menuButton" >
                {open ? <ChevronLeft className="sideIcon" /> : <Menu className="sideIcon" />}
            </IconButton>

            <Box className="listContainer" >
                <List dense={false}>
                    {settingsList.map((item, index) => {
                        return (
                            <ListItem
                                button
                                key={item.id}
                                className={open ? "customListItem" : ""}
                            >
                                <Link to={item.link} passHref className="listItemLink">
                                    <Tooltip
                                        title={!open ? item.name : ""}
                                        placement="right"
                                    >
                                        <Box className="listItemContent">
                                            <ListItemIcon
                                                className="listItemIcon"
                                            >
                                                {item.icon}
                                            </ListItemIcon>

                                            {open && (
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
