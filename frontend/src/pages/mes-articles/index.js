import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, IconButton, Checkbox, Button } from '@mui/material';
import Container from '@mui/material/Container';
import CustomButton from '@/components/CustomButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { confirm } from '@/utils/ConfirmGlobal';
import {
    showToast,
    ToastContainer,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
    notifyDefault,
} from '../../components/ui/Toastify';

export default function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);

    useEffect(() => {
        try {
            fetch('http://localhost:8000')
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

    useEffect(() => {
        setDeleteButtonDisabled(selected.length === 0);
    }, [selected]);

    const handleSelectAll = (event) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        const selectedIds = checked ? articles.map(article => article.id) : [];
        setSelected(selectedIds);
    };

    const handleSelectOne = (event, id) => {
        const checked = event.target.checked;
        if (checked) {
            setSelected(prevSelected => [...prevSelected, id]);
        } else {
            setSelected(prevSelected => prevSelected.filter(item => item !== id));
        }
    };

    const handleDeleteSelected = async () => {
        if (await confirm({ title: "Voulez-vous vraiment supprimer ces articles ?", content: "Ces articles seront supprimés et personne ne pourra y accéder", variant: "danger" })) {
            try {
                await fetch('http://localhost:8000/articles', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: selected }),
                });

                console.log("Articles avec les ID sélectionnés supprimés :", selected);
                notifySuccess("Articles sélectionnés supprimés");
                setSelected([]);
                setSelectAll(false);
            } catch (error) {
                console.error('Erreur lors de la suppression des articles', error);
                notifyError('Il y\'a eu un problème');
            }
        }
    };

    const handleDelete = async (id) => {
        if (await confirm({ title: "Voulez-vous vraiment supprimer cet article ?", content: "Cet article sera supprimé et personne ne pourra y accéder", variant: "danger" })) {
            try {
                await fetch(`http://localhost:8000/articles/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log("Article avec l'ID supprimé :", id);
                notifySuccess("Article supprimé");
                setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'article', error);
                notifyError('Il y\'a eu un problème');
            }
        }
    };

    return (
        <Container component="main" maxWidth="lg">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', gap: '10px' }}>
                <CustomButton to="ajouter-un-article">
                    <AddIcon />
                    Ajouter
                </CustomButton>
                <Button
                    variant="text"
                    color="error"
                    disabled={deleteButtonDisabled}
                    onClick={handleDeleteSelected}
                >
                    <DeleteIcon />
                    Supprimer
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    color="primary"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map(article => (
                            <TableRow key={article.id}>
                                <TableCell>
                                    <Checkbox
                                        color="primary"
                                        checked={selected.includes(article.id)}
                                        onChange={(event) => handleSelectOne(event, article.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    {article.user.name && <Chip label={article.user.name} variant="outlined" size="small" />}
                                </TableCell>
                                <TableCell>
                                    {article.category.label && <Chip label={article.category.label} variant="outlined" size="small" />}
                                </TableCell>
                                <TableCell>{article.title}</TableCell>
                                <TableCell>
                                    <CustomButton to={`articles/${article.slug}`}>Lire</CustomButton>
                                    <IconButton color="error" onClick={() => handleDelete(article.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
