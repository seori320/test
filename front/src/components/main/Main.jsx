import * as React from 'react';
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Container, List, ListItem } from '@mui/material';
import Markdown from './Markdown';

function Main(props) {
    const { title } = props;

    return (
        <Grid
            item
            xs={12}
            md={8}
            sx={{
                '& .markdown': {
                    py: 3,
                }
            }}
        >
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>

            {/* 임의의 텍스트 */}
            <Container maxWidth="md">
                <div className="blog-post">
                    <Typography variant="h3" gutterBottom>
                        Moana
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        March 18, 2024 by <a href="/">Your Name</a>
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Moana is a captivating animated film that takes viewers on an exhilarating journey across the Pacific Ocean. Directed by Ron Clements and John Musker, this Disney masterpiece tells the story of a courageous young girl named Moana who sets sail on a daring adventure to save her people.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Set in the ancient Polynesian world, Moana embarks on a quest to find the demigod Maui and restore the heart of Te Fiti, a mystical island goddess. Along the way, she encounters breathtaking landscapes, mythical creatures, and learns the importance of self-discovery and identity.
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        Plot Summary
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Moana, the spirited daughter of Chief Tui, has always felt a deep connection to the ocean despite her father's warnings to stay away. When her island paradise is threatened by a dark force, Moana sets out to find the legendary demigod Maui and convince him to return the heart of Te Fiti, stolen years ago, and restore balance to the world.
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        Cast & Crew
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Moana features the voices of Auli'i Cravalho as Moana and Dwayne "The Rock" Johnson as Maui. The film's stunning animation and heartfelt performances bring the characters to life, making it a memorable cinematic experience for audiences of all ages.
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        Reviews
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Moana received widespread critical acclaim for its beautiful animation, catchy soundtrack, and empowering message. Critics praised its cultural authenticity and strong female protagonist, making it a standout addition to Disney's animated classics.
                    </Typography>
                    <List>
                        <ListItem>Winner of the Academy Award for Best Animated Feature</ListItem>
                        <ListItem>Nominated for Best Original Song for "How Far I'll Go"</ListItem>
                        <ListItem>Currently holds a 95% approval rating on Rotten Tomatoes</ListItem>
                    </List>
                    <Typography variant="body1" paragraph>
                        Moana continues to enchant audiences around the world with its timeless story of courage, friendship, and the power of believing in oneself. It's a must-watch for anyone seeking adventure and inspiration.
                    </Typography>
                </div>
            </Container>

            <Divider />
        </Grid>
    );
}

Main.propTypes = {
    // posts: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    testTitle: PropTypes.string.isRequired,
    testContent: PropTypes.string.isRequired,
};

export default Main;