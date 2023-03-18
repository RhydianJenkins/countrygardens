import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import NextLink from 'next/link';
import BasketIcon from './basketIcon';
import { useRouter } from 'next/router';

const pages = ['Shop', 'Contact Us'];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const router = useRouter();
    const hasScrolled = scrollPosition > 0;
    const onHomePage = router.asPath === '/';
    const textColor = (!hasScrolled && onHomePage) ? "primary.main" : 'common.black';

    console.log('textColor', textColor);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const getElementId = (name: string): string => {
        switch(name) {
        case 'Shop': { return 'shop'; }
        case 'Contact Us': { return 'contact-us'; }
        default: { return ''; }
        }
    };

    const scrollToElement = async (name: string) => {
        if (window.location.pathname !== '/') {
            await router.push('/');
        }

        const elementId = getElementId(name);
        const element = document.getElementById(elementId);

        if (element) {
            const isOnMobile = window.innerWidth <= 600;
            isOnMobile
                ? element.scrollIntoView()
                : element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (pageNameClicked: string|null = null) => {
        setAnchorElNav(null);
        pageNameClicked && scrollToElement(pageNameClicked);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AppBar
            elevation={hasScrolled ? 1 : 0}
            position="fixed"
            sx={{
                backgroundColor: hasScrolled ? 'primary.main' : 'transparent',
                transition: 'background-color 0.2s ease-in-out',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NextLink href='/'>
                        <Typography
                            variant="h6"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                                color: textColor,
                            }}
                        >
                            Country Gardens
                        </Typography>
                    </NextLink>

                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'flex', md: 'none' },
                    }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color={(!hasScrolled && onHomePage) ? "primary" : "default"}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu()}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            disableScrollLock
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => handleCloseNavMenu(page)}
                                >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                            textAlign: 'center',
                            color: textColor,
                        }}
                    >
                        <NextLink href='/'>Country Gardens</NextLink>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleCloseNavMenu(page)}
                                sx={{ my: 2, display: 'block' }}
                            >
                                <Typography color={textColor}>{page}</Typography>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{
                        flexGrow: 0,
                        color: textColor,
                    }}>
                        <BasketIcon />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
