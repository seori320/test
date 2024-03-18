import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import MemberUpdate from "./MemberUpdate";

import { Modal } from "react-bootstrap";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

function CheckPwd() {
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [showMemberUpdate, setShowMemberUpdate] = useState(false);

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

    useEffect(() => {
        // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
        setHeaders({
            "Authorization": `Bearer ${localStorage.getItem("post_access_token")}`
        });
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const passwordCheck = async () => {
        const req = {
            password: pwd
        }

        try {
            const resp = await axios.post("http://localhost:8080/user/checkPwd", req, { headers: headers });
            console.log("[MemberUpdate-.jsx] checkPwd() success :D");
            console.log(resp.data);
            setEmail(resp.data.email);
            setName(resp.data.username);

            setShowMemberUpdate(true);
        } catch (err) {
            console.log("[MemberUpdate-.jsx] checkPwd() error :<");
            console.log(err);

            const resp = err.response;
            if (resp.status === 400) {
                setModalMessage(resp.data);
                setShowModal(true);
            }
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ height: '100vh', display:'flex', flexDirection:'column', justifyContent: 'center' }}>
                <CssBaseline />
                    <Box noValidate sx={{ mt: 1, justifyContent: 'center',}}>
                        {showMemberUpdate ? (
                            <MemberUpdate email={email} name={name} />
                        ) : (
                            <>
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
                                    Check Password
                                </Typography>
                            </Box>
                                <Grid container>
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
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={passwordCheck}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Check Password
                                </Button>

                                <Copyright sx={{ mt: 8, mb: 4 }} />

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
                            </>
                        )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CheckPwd;
