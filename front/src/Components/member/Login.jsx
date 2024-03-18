import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/context/AuthProvider";
import { HttpHeadersContext } from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/context/HttpHeadersProvider";
import { Modal } from "react-bootstrap";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            <Link color="inherit" href="/">
                Back to Main
            </Link>
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const { auth, setAuth } = useContext(AuthContext);
    const { headers, setHeaders } = useContext(HttpHeadersContext);

    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const changeId = (event) => {
        setId(event.target.value);
    }

    const changePwd = (event) => {
        setPwd(event.target.value);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    const login = async () => {

        const req = {
            email: id,
            password: pwd
        }

        await axios.post("http://localhost:8080/user/login", req)
            .then((resp) => {
                console.log("[Login--.jsx] login() success :D");
                console.log(resp.data);

                setModalMessage(`Login Success. Welcome ${resp.data.email} ! 🔐`);
                setShowModal(true);

                // JWT 토큰 저장
                localStorage.setItem("post_access_token", resp.data.token);
                localStorage.setItem("id", resp.data.email);

                setAuth(resp.data.email); // 사용자 인증 정보(아이디 저장)
                setHeaders({"Authorization": `Bearer ${resp.data.toekn}`}); // 헤더 Authorization 필드 저장

                navigate("/");


            }).catch((err) => {
                console.log("[Login--.jsx] login() error :<");
                console.log(err);

                setModalMessage(`⚠️ Check Your Email or Password`);
                setShowModal(true);
            });
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={id}
                            onChange={changeId}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={pwd}
                            onChange={changePwd}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={login}
                        >
                            Login
                        </Button>
                        <Grid container sx={{ justifyContent: 'flex-end' }}>
                            <Grid item>
                                <Link href="/join" variant="body2">
                                    Don't you have an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </ThemeProvider>
    );
}
