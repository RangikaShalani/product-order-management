import React from "react";
import {
    Box,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Switch,
    FormControlLabel,
} from "@mui/material";

const ProductCard = ({ product, stock, setStock, status, setStatus, open, onClose, onSave }) => {
    if (!product) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Product Details</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: 120, height: 120, borderRadius: 8 }}
                    />
                    <Box>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body1">Category: {product.category}</Typography>
                        <Typography variant="body1">Price: LKR {product.price}</Typography>
                        <Typography variant="body1">Description: {product.description}</Typography>
                    </Box>
                </Box>

                <TextField
                    label="Stock Quantity"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <FormControlLabel
                    control={<Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />}
                    label="Active"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={onSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductCard;
