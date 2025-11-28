
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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    TableSortLabel,
    TextField,
} from "@mui/material";

export default function OrderList() {
    const { data: orders = [], error, isLoading } = useGetAllOrdersQuery();

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

    if (isLoading) return <Typography>Loading orders...</Typography>;
    if (error) return <Typography color="error">Failed to load orders</Typography>;

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Order List
            </Typography>

            <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                <FormControl>
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
                />
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {[
                                { label: "Order ID", key: "OrderId" },
                                { label: "Product Name", key: "productName" },
                                { label: "Customer", key: "orderBy" },
                                { label: "Price", key: "OrderPrice" },
                                { label: "Delivery Option", key: "delivereOption" },
                                { label: "Address", key: "deliverAddress" },
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

                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.OrderId}>
                                <TableCell>{order.OrderId}</TableCell>
                                <TableCell>{order.productName}</TableCell>
                                <TableCell>{order.orderBy}</TableCell>
                                <TableCell>{order.OrderPrice.toLocaleString()}</TableCell>
                                <TableCell>{order.delivereOption}</TableCell>
                                <TableCell>{order.deliverAddress}</TableCell>
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
            </TableContainer>
        </div>
    );
}
