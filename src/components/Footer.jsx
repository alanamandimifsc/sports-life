import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from '../assets/img/logo.png';

const Footer = () => {
    return (
        <Box mt={4} py={2} bgcolor="primary.main" color="white" textAlign="center">
            <img src={Logo} alt="Sport Life Logo" style={{ width: '50px', marginBottom: '5px' }} />
            {/* <Typography variant="h6">Sport Life</Typography> */}
            <Typography variant="body1">&copy; 2024 Sport Life. Todos os direitos reservados.</Typography>
        </Box>
    );
};

export default Footer;
