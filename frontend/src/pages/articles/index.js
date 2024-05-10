import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, Button } from '@mui/material';
import Container from '@mui/material/Container';
import CustomButton from '@/components/CustomButton';

export default function Dashboard() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        try {
            fetch('http://127.0.0.1:8000')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setArticles(data);
                });
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }, []);

    const handleDelete = (id) => {
        // Mettez ici votre logique pour supprimer l'article avec l'ID spécifié
        console.log("Supprimer l'article avec l'ID :", id);
    };

    return (
        <Container component="main" maxWidth="lg">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map(article => (
                            <TableRow key={article.id}>
                                <TableCell>
                                    {article.user.name && <Chip label={article.user.name} variant="outlined" size="small" />}
                                </TableCell>
                                <TableCell>
                                    {article.category.label && <Chip label={article.category.label} variant="outlined" size="small" />}
                                </TableCell>
                                <TableCell>{article.title}</TableCell>
                                <TableCell>{article.content}</TableCell>
                                <TableCell>
                                    <CustomButton to={`articles/${article.slug}`}>Lire</CustomButton>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(article.id)}>Supprimer</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
