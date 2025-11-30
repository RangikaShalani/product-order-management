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
import "../styles/home.css";
import FilterPanel from "../components/FilterPanel";

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
        // {
        //     field: "image",
        //     headerName: "Image",
        //     width: 100,
        //     renderCell: (params) => (
        //         <img src={params.value} alt="product" style={{ width: 50, height: 50, borderRadius: 6 }} />
        //     ),
        // },
        { field: "price", headerName: "Price (LKR)", width: 120 },
        // { field: "stock", headerName: "Stock", width: 100 },
        // { field: "status", headerName: "Status", width: 120 },
        {
            field: "actions",
            headerName: "",
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
                    Failed to load product list.
                </Box>
            </div>
        );

    return (
        <>
            <div className="page-container" >
                <Box className="product-page-container" >
                    <h1 className="page-header-title" >Product List</h1>

                    {/* FILTER SECTION */}

                    <FilterPanel
                        setSearchText={setSearchText}
                        searchText={searchText}
                        category={category}
                        setCategory={setCategory}
                        categories={categories}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />

                    {/* DATA GRID */}
                    <Box sx={{ height: "auto", width: "100%" }}>
                        <DataGrid
                            rows={filteredProducts}
                            columns={columns}
                            getRowId={(row) => row.productId}
                            pageSizeOptions={[5, 10, 20]}
                            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                            className="product-data-grid"
                        // sx={{ border: "1px solid var(--border-color)", background: "var(--background)", color: "var(--text-primary)" }}
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
            </div>
        </>
    );
}
