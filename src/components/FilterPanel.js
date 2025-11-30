import {
    Typography,
    Box,
    TextField,
    MenuItem,
    Slider,
    useMediaQuery
} from '@mui/material';
import "../styles/components.css";
import React from 'react';

export default function FilterPanel({
    setSearchText,
    searchText,
    category,
    setCategory,
    categories,
    priceRange,
    setPriceRange
}) {

    const isMobile = useMediaQuery("(max-width:768px)");

    return (
        <div className='filter-panel-container'>
            <Typography variant='body1'>Filter Panel</Typography>

            {/* Container */}
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    mb: 3,
                    flexWrap: "wrap",
                    alignItems: "center",
                    flexDirection: isMobile ? "column" : "row"
                }}
            >

                <div className='filter-text-f' >
                    {/* Search input */}
                    <TextField
                        label="Search by name"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='filter-text-field'
                        sx={{
                            width: isMobile ? "50%" : 200,
                            "& .MuiInputBase-input": {
                                fontSize: isMobile ? "0.75rem" : "1rem",
                                padding: isMobile ? "8px" : "12px",
                            }
                        }}
                    />

                    {/* Category */}
                    <TextField
                        select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="filter-text-field"
                        sx={{
                            width: isMobile ? "50%" : 150,
                            "& .MuiInputBase-input": {
                                fontSize: isMobile ? "0.75rem" : "1rem",
                                padding: isMobile ? "8px" : "12px",
                            }
                        }}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                {/* Price Range - moved to second row on mobile */}
                <Box
                    sx={{
                        width: isMobile ? "100%" : 300,
                        mt: isMobile ? 2 : 0
                    }}
                >
                    <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }}>
                        Price Range (LKR)
                    </Typography>
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
