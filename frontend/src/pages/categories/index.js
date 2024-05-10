import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Chip } from '@mui/material';
import Container from '@mui/material/Container';
import CustomButton from '@/components/CustomButton';

export default function Dashboard() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        try {
            fetch('http://127.0.0.1:8000/categories')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setCategories(data);
                });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    return (
        <Container component="main" maxWidth="lg">
            <Grid container spacing={3}>
                {categories.map(category => (
                    <Grid item xs={12} sm={6} md={4} key={category.id}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="h5" gutterBottom>{category.label}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

