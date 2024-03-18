import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

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

export default function MemberUpdate(props) {
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [checkPwd, setCheckPwd] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const email = props.email;

    const navigate = useNavigate();

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changePwd = (event) => {
        setPwd(event.target.value);
    }

    const changeCheckPwd = (event) => {
        setCheckPwd(event.target.value);
    }

    useEffect(() => {
        setHeaders({
            "Authorization": `Bearer ${localStorage.getItem("post_access_token")}`
        });
        setName(props.name);
        console.log(props.name);
    }, [props.name]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    /* 회원 정보 수정 */
    const update = async () => {

        const req = {
            password: pwd,
            passwordCheck: checkPwd,
            username: name,
        }

        await axios.post("http://localhost:8080/user/update", req, {headers: headers})
            .then((resp) => {
                console.log("[MemberUpdate.jsx] update() success :D");
                console.log(resp.data);

                setModalMessage(`${resp.data.username}님의 회원 정보를 수정했습니다`);
                setShowModal(true);
                navigate("/");

            }).catch((err) => {
                console.log("[MemberUpdate.jsx] update() error :<");
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
                        Update Profile
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="formEmail"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    inputProps={{ readOnly: true }}
                                />
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
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={update}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Profile
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />

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
            </Container>
        </ThemeProvider>
    );
}