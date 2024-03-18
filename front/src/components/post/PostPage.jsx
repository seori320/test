import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from 'C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/main/Header.jsx';
import Footer from 'C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/main/Footer.jsx';
import PostList from 'C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/post/PostList.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const sections = [
    { title: 'Movie', url: '#' },
    { title: 'Actor', url: '#' },
    { title: 'Post', url: '/postlist' },
    { title: 'Main', url: '/' },
    { title: 'Recipes', url: '#' },
    { title: 'Search', url: '#' },
    { title: 'MyPage', url: '/checkpwd' },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function PostPage() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MovieRecipes" sections={sections} />
                <main>
                    <PostList />
                </main>
            </Container>
            <Footer
                title="MovieRecipes"
                description="Created By SeoyoonLee with MUI, React-Bootstrap"
            />
        </ThemeProvider>
    );
}

export default PostPage;