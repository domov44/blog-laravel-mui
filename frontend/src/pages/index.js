import React from 'react';
import { Grid, Paper, Typography, Chip } from '@mui/material';
import Container from '@mui/material/Container';
import CustomButton from '@/components/CustomButton';

export default function Dashboard({ articles }) {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={3}>
        {articles.map(article => (
          <Grid item xs={12} key={article.id}>
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

export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:8000');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { props: { articles: data } };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { props: { articles: [] } };
  }
}
