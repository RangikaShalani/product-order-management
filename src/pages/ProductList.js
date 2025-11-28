import React, { useState, useMemo } from "react";
import {
    Box,
    TextField,
    MenuItem,
    Slider,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllProductsQuery, useUpdateProductMutation } from "../store/services/productService";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
    const { data: productsList = [], error, isLoading } = useGetAllProductsQuery();
    const [updateProduct] = useUpdateProductMutation();

    // ---------------------------
    // STATE FOR FILTERS
    // ---------------------------
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 10000]);

    // ---------------------------
    // STATE FOR DIALOG
    // ---------------------------
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [stock, setStock] = useState(0);
    const [status, setStatus] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Extract unique categories
    const categories = useMemo(() => {
        const setCat = new Set();
        productsList.forEach((p) => setCat.add(p.category));
        return ["All", ...Array.from(setCat)];
    }, [productsList]);

    // ---------------------------
    // FILTERED DATA
    // ---------------------------
    const filteredProducts = useMemo(() => {
        return productsList.filter((product) => {
            const matchesName = product.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesCategory = category === "All" ? true : product.category === category;
            const price = parseFloat(product.price);
            const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
            return matchesName && matchesCategory && matchesPrice;
        });
    }, [productsList, searchText, category, priceRange]);

    // ---------------------------
    // DATAGRID COLUMNS
    // ---------------------------
    const columns = [
        { field: "productId", headerName: "Product ID", width: 120 },
        { field: "name", headerName: "Name", width: 180 },
        { field: "category", headerName: "Category", width: 130 },
        {
            field: "image",
            headerName: "Image",
            width: 100,
            renderCell: (params) => (
                <img src={params.value} alt="product" style={{ width: 50, height: 50, borderRadius: 6 }} />
            ),
        },
        { field: "price", headerName: "Price (LKR)", width: 120 },
        { field: "stock", headerName: "Stock", width: 100 },
        { field: "status", headerName: "Status", width: 120 },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            renderCell: (params) => (
                <Button variant="contained" size="small" onClick={() => handleOpenDialog(params.row)}>
                    View
                </Button>
            ),
        },
    ];

    const handleOpenDialog = (product) => {
        setSelectedProduct(product);
        setStock(product.stock);
        setStatus(product.status === "active");
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleSaveChanges = async () => {
        if (!selectedProduct) return;
        try {
            await updateProduct({
                productId: selectedProduct.productId,
                body: {
                    stock,
                    status: status ? "active" : "inactive",
                },
            });
            handleCloseDialog();
        } catch (err) {
            console.error("Failed to update product", err);
        }
    };

    // Loading & Error Handling
    if (isLoading)
        return (
            <Box p={4} textAlign="center">
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Box p={4} textAlign="center" color="red">
                Failed to load product list.
            </Box>
        );

    return (
        <>
            <Box p={3}>
                <h1 style={{ color: "var(--text-title)" }}>Product List</h1>

                {/* FILTER SECTION */}
                <Box sx={{ display: "flex", gap: 3, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
                    <TextField
                        label="Search by name"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{ width: 250 }}
                    />

                    <TextField
                        select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ width: 200 }}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ width: 300 }}>
                        <Typography variant="body2">Price Range (LKR)</Typography>
                        <Slider
                            value={priceRange}
                            onChange={(e, newValue) => setPriceRange(newValue)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={10000}
                        />
                    </Box>
                </Box>

                {/* DATA GRID */}
                <Box sx={{ height: 600, width: "100%" }}>
                    <DataGrid
                        rows={filteredProducts}
                        columns={columns}
                        getRowId={(row) => row.productId}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
                        sx={{ border: "1px solid var(--border-color)", background: "var(--background)", color: "var(--text-primary)" }}
                    />
                </Box>
            </Box>

            <ProductCard
                product={selectedProduct}
                open={dialogOpen}
                onClose={handleCloseDialog}
                stock={stock}
                setStock={setStock}
                status={status}
                setStatus={setStatus}
                onSave={handleSaveChanges}
            />
        </>
    );
}
