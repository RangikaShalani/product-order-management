
// import React from "react";
// import { useGetAllOrdersQuery } from "../store/services/orderService";

// export default function OrderList() {

//     const { data: orders, error, isLoading } = useGetAllOrdersQuery();
//     console.log("Orders Data:", orders);
//     return (
//         <div style={{ padding: 20 }}>
//             <h1 style={{ color: "var(--text-title)" }}>Order List Page</h1>
//             <p>This is the About page.</p>
//         </div>
//     );
// }


// src/pages/OrderList.jsx
import React, { useState, useMemo } from "react";
import { useGetAllOrdersQuery } from "../store/services/orderService";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    TableSortLabel,
    TextField,
    Box,
    useMediaQuery,
} from "@mui/material";
import "../styles/home.css";

export default function OrderList() {
    const { data: orders = [], error, isLoading } = useGetAllOrdersQuery();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const isMobile = useMediaQuery("(max-width:768px)");

    const [statusFilter, setStatusFilter] = useState("");
    const [searchText, setSearchText] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "OrderId", direction: "asc" });

    // Filter + search
    const filteredOrders = useMemo(() => {
        let filtered = orders;

        if (statusFilter) {
            filtered = filtered.filter((order) => order.status === statusFilter);
        }

        if (searchText) {
            filtered = filtered.filter(
                (order) =>
                    order.OrderId.toLowerCase().includes(searchText.toLowerCase()) ||
                    order.orderBy.toLowerCase().includes(searchText.toLowerCase()) ||
                    order.productName.toLowerCase().includes(searchText.toLowerCase())
            );
        }


        // Sorting
        if (sortConfig.key) {
            filtered = [...filtered].sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [orders, statusFilter, searchText, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    // Calculate paginated data
    const paginatedOrders = useMemo(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return filteredOrders.slice(startIndex, endIndex);
    }, [filteredOrders, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

    // Loading & Error Handling
    if (isLoading)
        return (
            <div className="page-container" >
                <Box className="loading-container" >
                    <CircularProgress />
                </Box>
            </div>
        );

    if (error)
        return (
            <div className="page-container" >
                <Box className="error-container" >
                    Failed to load orders.
                </Box>
            </div>
        );

    return (
        <div className="page-container" >
            <Box className="product-page-container">

                <h1 className="page-header-title" >Order List</h1>


                <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                    <FormControl sx={{
                        "& .MuiNativeSelect-root": {
                            color: "var(--text-primary)",
                            borderColor: "var(--border)",
                        },
                        "& .MuiInputLabel-root": {
                            color: "var(--text-primary)",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--border)",
                        },
                        "& .MuiSvgIcon-root": {
                            color: "var(--text-primary)",
                            fontSize: isMobile ? "1rem" : "1.5rem",
                        },
                    }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            label="Status"
                            style={{ width: 150 }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Processing">Processing</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Search Orders"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        sx={{
                            "& .MuiInputBase-input-MuiOutlinedInput-input": {
                                color: "var(--text-primary)",
                                borderColor: "var(--border)",
                            },
                            "& .MuiInputLabel-root": {
                                color: "var(--text-primary)",

                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--border)",
                            },
                        }}
                    />
                </div>

                <TableContainer component={Paper} sx={{ background: "var(--background)", color: "var(--text-primary)" }}  >
                    <Table sx={{ background: "var(--background)", color: "var(--text-primary)" }} >
                        <TableHead sx={{
                            "& .MuiTableSortLabel-root": {
                                color: "var(--text-primary)"
                            },
                            "& .MuiButtonBase-root-MuiTableSortLabel-root.Mui-active": {
                                color: "var(--text-primary)"
                            }

                        }}>
                            <TableRow>
                                {[
                                    { label: "Order ID", key: "OrderId" },
                                    { label: "Product Name", key: "productName" },
                                    { label: "Customer", key: "orderBy" },
                                    { label: "Price", key: "OrderPrice" },
                                    { label: "Delivery Option", key: "delivereOption" },
                                    // { label: "Address", key: "deliverAddress" },
                                    { label: "Quantity", key: "quantity" },
                                    { label: "Status", key: "status" },
                                ].map((col) => (
                                    <TableCell key={col.key}>
                                        <TableSortLabel
                                            active={sortConfig.key === col.key}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort(col.key)}
                                        >
                                            {col.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody sx={{ background: "var(--background)", color: "var(--text-primary)" }}>
                            {paginatedOrders.map((order) => (
                                <TableRow key={order.OrderId} sx={{
                                    "& .MuiTableCell-root": {
                                        color: "var(--text-primary)"
                                    }
                                }} >
                                    <TableCell>{order.OrderId}</TableCell>
                                    <TableCell>{order.productName}</TableCell>
                                    <TableCell>{order.orderBy}</TableCell>
                                    <TableCell>{order.OrderPrice.toLocaleString()}</TableCell>
                                    <TableCell>{order.delivereOption}</TableCell>
                                    {/* <TableCell>{order.deliverAddress}</TableCell> */}
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            color={
                                                order.status === "Pending"
                                                    ? "warning"
                                                    : order.status === "Processing"
                                                        ? "info"
                                                        : order.status === "Shipped"
                                                            ? "primary"
                                                            : order.status === "Delivered"
                                                                ? "success"
                                                                : "error"
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>


                    </Table>
                    <Box display="flex" justifyContent="center" alignItems="center" p={2} background="var(--background)">

                        {/* Pagination Component */}
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            color="primary"
                        // sx={{ color: "#ffffff" }}

                        />
                    </Box>
                </TableContainer>
            </Box>
        </div>
    );
}
