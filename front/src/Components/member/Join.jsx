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

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";


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

export default function Join() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [checkPwd, setCheckPwd] = useState("");

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changePwd = (event) => {
        setPwd(event.target.value);
    }

    const changeCheckPwd = (event) => {
        setCheckPwd(event.target.value);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    /* 아이디 중복 체크 */
    const checkEmailDuplicate = async () => {

        await axios.get("http://localhost:8080/user/checkId", { params: { email: email } })
            .then((resp) => {
                console.log("[Join--.jsx] checkEmailDuplicate() success :D");
                console.log(resp.data);

                if (resp.status === 200) {
                    alert("This email is available.");
                }
            })
            .catch((err) => {
                console.log("[Join--.jsx] checkEmailDuplicate() error :<");
                console.log(err);

                const resp = err.response;
                if (resp.status === 400) {
                    alert(resp.data);
                }
            });

    }

    /* 회원가입 */
    const join = async () => {

        const req = {
            email: email,
            password: pwd,
            passwordCheck: checkPwd,
            username: name,
        }

        await axios.post("http://localhost:8080/user/register", req)
            .then((resp) => {
                console.log("[Join--.jsx] join() success :D");
                console.log(resp.data);

                setModalMessage(resp.data.username + " Congratulations on your membership 🎊");
                setShowModal(true);
                navigate("/login");

            }).catch((err) => {
                console.log("[Join--.jsx] join() error :<");
                console.log(err);

                const resp = err.response;
                if (resp.status === 400) {
                    setModalMessage(resp.data);
                    setShowModal(true);
                }
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    required
                                    fullWidth
                                    id="formEmail"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={changeEmail}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={checkEmailDuplicate}
                                >
                                    Check duplication
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="formName"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    value={name}
                                    onChange={changeName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="formPassword"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={pwd}
                                    onChange={changePwd}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="formCheckPassword"
                                    label="Password Check"
                                    name="checkPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    value={checkPwd}
                                    onChange={changeCheckPwd}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={join}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
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
