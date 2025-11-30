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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllProductsQuery, useUpdateProductMutation } from "../store/services/productService";
import ProductCard from "../components/ProductCard";
import Swal from "sweetalert2";
import FilterPanel from "../components/FilterPanel";

import "../styles/home.css";

export default function ProductList() {
    const { data: productsList = [], error, isLoading } = useGetAllProductsQuery();
    const [updateProduct] = useUpdateProductMutation();


    // STATE FOR FILTERS
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 10000]);


    // STATE FOR DIALOG
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


    // FILTERED DATA
    const filteredProducts = useMemo(() => {
        return productsList.filter((product) => {
            const matchesName = product.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesCategory = category === "All" ? true : product.category === category;
            const price = parseFloat(product.price);
            const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
            return matchesName && matchesCategory && matchesPrice;
        });
    }, [productsList, searchText, category, priceRange]);


    // DATAGRID COLUMNS
    const columns = [
        { field: "productId", headerName: "Product ID", minWidth: 120, flex: 1 },
        { field: "name", headerName: "Name", width: 180 },
        { field: "category", headerName: "Category", minWidth: 120, flex: 1 },
        { field: "price", headerName: "Price (LKR)", align: "right", minWidth: 120, flex: 1 },
        { field: "status", headerName: "Status", minWidth: 50, flex: 1 },
        {
            field: "actions",
            headerName: "",
            width: 120,
            renderCell: (params) => (
                <Button className="view-btn" size="small" onClick={() => handleOpenDialog(params.row)}>
                    View <VisibilityIcon fontSize="small" sx={{ ml: 1 }} />
                </Button>
            ),
        },
    ];

    const handleOpenDialog = (product) => {
        setSelectedProduct(product);
        setStock(product.stock);
        setStatus(product.status.toLowerCase() === "active");
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleSaveChanges = async () => {
        if (!selectedProduct) return;
        try {
            const result = await updateProduct({
                body: {
                    productId: selectedProduct.productId,
                    stock: stock ?? selectedProduct.stock,
                    status: status ? "Active" : "Inactive",
                },
            });

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Product updated successfully.',
                showConfirmButton: false,
                timer: 3000,
            });

            handleCloseDialog();
        } catch (err) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to update product.',
                showConfirmButton: false,
                timer: 3000,
            });
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
                            sx={{
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--background)",
                                color: "var(--text-primary)",

                                /* HEADER (background + text) */
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "var(--header-bg)",
                                    color: "var(--header-text)",
                                },

                                "& .MuiDataGrid-columnHeaderTitle": {
                                    color: "var(--header-text)",
                                },

                                /* SORT ICON COLOR */
                                "& .MuiDataGrid-sortIcon": {
                                    color: "var(--header-text)",
                                },

                                /* ROW TEXT COLOR */
                                "& .MuiDataGrid-cell": {
                                    color: "var(--text-primary)",
                                },

                                /* HOVER ROW (dark-mode safe) */
                                "& .MuiDataGrid-row:hover": {
                                    backgroundColor: "var(--hover-bg)",
                                    color: "var(--text-primary)",
                                },

                                /* SELECTED ROW */
                                "& .MuiDataGrid-row.Mui-selected": {
                                    backgroundColor: "var(--hover-bg) !important",
                                    color: "var(--text-primary)",
                                },

                                "& .MuiDataGrid-row.Mui-selected:hover": {
                                    backgroundColor: "var(--hover-bg) !important",
                                },

                                /* FOOTER STYLING */
                                "& .MuiDataGrid-footerContainer": {
                                    backgroundColor: "var(--header-bg)",
                                    color: "var(--text-primary)",
                                },

                                "& .MuiTablePagination-root": {
                                    color: "var(--text-primary)",
                                },
                            }}

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
