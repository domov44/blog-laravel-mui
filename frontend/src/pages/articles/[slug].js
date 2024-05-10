import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const styles = {
    chipContainer: {
        marginTop: '10px',
    },
    chip: {
        marginRight: '5px',
        marginBottom: '5px',
    },
};

export default function ArticlePage({ article, error }) {
    if (error) {
        return <div>Une erreur s&apos;est produite : {error}</div>;
    }

    if (!article) {
        return <div>Chargement en cours...</div>;
    }

    return (
        <Container component="main" maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h1">{article.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">{article.content}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div style={styles.chipContainer}>
                        <Chip label={`Auteur: ${article.user.name}`} variant="outlined" style={styles.chip} />
                        <Chip label={`Catégorie: ${article.category.label}`} variant="outlined" style={styles.chip} />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    try {
        const response = await fetch(`http://127.0.0.1:8000/articles/${slug}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des articles');
        }

        const data = await response.json();

        return {
            props: {
                article: data,
                error: null
            }
        };
    } catch (error) {
        return {
            props: {
                article: null,
                error: error.message
            }
        };
    }
}
