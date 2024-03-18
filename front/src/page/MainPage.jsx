import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from 'C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/main/Header.jsx';
import MainFeaturedPost from 'C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/main/MainFeaturedPost.jsx';
import FeaturedPost from 'C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/main/FeaturedPost.jsx';
import Main from 'C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/main/Main.jsx';
import Footer from 'C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/main/Footer.jsx';

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

const mainFeaturedPost = {
    title: 'Explore and Delight in Every Frame!',
    description:
        "Discover a vibrant film hub! Engage in lively discussions, find hidden gems, and stay updated with the latest releases. Join our passionate community today!",
    image: 'https://source.unsplash.com/random?wallpapers',
    imageText: 'main image description',
    linkText: 'Go to Check Now',
};

const featuredPosts = [
    {
        title: 'Popular Movies',
        description:
            'Discover and Share the Latest Blockbusters: Explore the Most Popular Movies of the Moment!',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
    {
        title: 'Popular Posts',
        description:
            'Discover the Latest Trending Posts and Join the Conversation by Sharing Your Thoughts!',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function MainPage() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MovieRecipes" sections={sections} />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                    <Grid container spacing={12} sx={{ mt: 3 }}>
                        <Main
                            title="Experience the Heat: Dive into the Hottest Films Now!"/>

                    </Grid>
                </main>
            </Container>
            <Footer
                title="MovieRecipes"
                description="Created By SeoyoonLee with MUI, React-Bootstrap"
            />
        </ThemeProvider>
    );
}

export default MainPage;