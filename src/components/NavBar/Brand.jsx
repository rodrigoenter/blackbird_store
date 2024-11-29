import logo from '../../assets/images/blackbird_logo.svg';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const LogoContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.6s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const Brand = () => {
    return (
        <LogoContainer component="a" href="/" sx={{ p: 2 }}>
            <img src={logo} alt="Logo_Blackbird" style={{ width: '150px', height: 'auto' }} />
        </LogoContainer>
    );
};

export default Brand;