import {
    Typography
    , Box, TextField, MenuItem, Slider
} from '@mui/material';
import React from 'react';

export default function FilterPanel({ setSearchText, searchText, category, setCategory, categories, priceRange, setPriceRange }) {
    return (
        <div>
            <Typography variant='body1'>Filter Panel</Typography>

            <Box sx={{ display: "flex", gap: 3, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
                <TextField
                    label="Search by name"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ width: 200 }}
                />

                <TextField
                    select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{ width: 150 }}
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
        </div>
    );
}
