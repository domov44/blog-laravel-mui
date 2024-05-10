import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { notifySuccess, notifyError } from '../components/ui/Toastify';
import Router from 'next/router';

function AddForm() {
  const [values, setValues] = useState({
    title: '',
    content: '',
    category_id: '',
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      notifyError('Failed to fetch categories');
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(values);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((error) => error !== '');

    if (!hasErrors) {
      try {
        const response = await axios.post('http://localhost:8000/articles', values);
        console.log('Article created:', response.data);
        notifySuccess('Article created successfully');
        Router.push('/mes-articles');
      } catch (error) {
        console.error('Error creating article:', error);
        notifyError('Failed to create article');
      }
    }
  };

  const validateForm = (formValues) => {
    const errors = {};
    if (!formValues.title.trim()) {
      errors.title = 'Ce champ est requis';
    }
    if (!formValues.content.trim()) {
      errors.content = 'Ce champ est requis';
    }
    if (!formValues.category_id) {
      errors.category_id = 'Ce champ est requis';
    }
    return errors;
  };

  return (
    <Container component="main" maxWidth="md">
      <Grid container justifyContent="center" alignItems="center" style={{ height: 'calc(100vh - 69px)' }}>
        <Paper elevation={3} sx={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Publier un article
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="title"
              name="title"
              label="Titre"
              value={values.title}
              onChange={handleInput}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="content"
              name="content"
              label="Contenu"
              multiline
              rows={4}
              value={values.content}
              onChange={handleInput}
              error={Boolean(errors.content)}
              helperText={errors.content}
            />
            <FormControl fullWidth margin="normal" variant="outlined" error={Boolean(errors.category_id)}>
              <InputLabel id="category-label">Catégorie</InputLabel>
              <Select
                labelId="category-label"
                id="category_id"
                name="category_id"
                value={values.category_id}
                onChange={handleInput}
                label="Catégorie"
              >
                <MenuItem value="">Sélectionner une catégorie</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" size="large" style={{ marginTop: '20px' }}>
              Publier l&apos;article
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default AddForm;
