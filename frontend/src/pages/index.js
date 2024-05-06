import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Chip } from '@mui/material';
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

  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={3}>
        {articles.map(article => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Paper elevation={3} style={{ padding: 16 }}>
              <div style={{ marginTop: 8 }}>
                {article.user.name && <Chip label={article.user.name} variant="outlined" size="small" style={{ marginRight: 4 }} />}
                {article.category.label && <Chip label={article.category.label} variant="outlined" size="small" style={{ marginRight: 4 }} />}
              </div>
              <Typography variant="h5" gutterBottom>{article.title}</Typography>
              <Typography variant="body1" gutterBottom>{article.content}</Typography>
              <CustomButton to={`articles/${article.slug}`}>Lire</CustomButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

