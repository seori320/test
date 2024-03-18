import * as React from 'react';
import PropTypes from "prop-types";
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useContext} from "react";
import { AuthContext } from "../context/AuthProvider";

function Header(props) {
    const { sections, title } = props;
    const { auth, setAuth } = useContext(AuthContext);

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div style={{ width : '300px' }}>
                    <Button size="small" href={auth ? "/checkpwd" : "/join"}>{auth ? `Welcome ${auth} !` : "Sign-up"}</Button>
                </div>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <div style={{ width : '300px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" size="small" href={auth ? "/logout" : "/login"} >
                        {auth ? "Logout" : "Login"}
                    </Button>
                </div>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ),
    title: PropTypes.string.isRequired,
};

export default Header;