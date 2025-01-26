import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fetchData } from '../../store/Dashboard/dashboard.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

const pages = [
  {
    url: "/dashboard",
    name: "Dashboard"
  },
  {
    url: "/overview",
    name: "Overview"
  },
  {
    url: "/history",
    name: "History"
  },
];



function getStyles(name, coin, theme) {
  return {
    fontWeight: coin.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function Header() {
  const { data, loading, cryptoOption } = useSelector((state) => state.dashboard);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [coin, setCoin] = useState([]);

  const [selectedDropdownData, setSelectedDropdownData] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChange = (e) => {
    if (!e?.target) {
      return;
    }
    const { value } = e.target;
    setSelectedDropdownData(value);
    dispatch(fetchData(value));
  }

  useEffect(() => {
    if (!selectedDropdownData) {
      setSelectedDropdownData(cryptoOption)
    }
  }, [cryptoOption])

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: "pointer"
            }}
            onClick={() => navigate('/dashboard')}
          >
            Crypto-dashboard
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <Link to={page?.url} key={page?.name}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }} color='#000'>{page?.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Crypto-dashboard
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page?.url} key={page?.name}>
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }} color='#fff'>{page?.name}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>

            <FormControl sx={{ m: 1, width: 150 }}>
              <InputLabel
                id="demo-multiple-name-label"
                sx={{
                  backgroundColor:"transparent",
                  color: '#fff',
                  '&.Mui-focused': {
                    color: '#fff', 
                  },
                  '&.MuiInputLabel-shrink': {
                    color: '#fff', 
                  },
                }}
              >
                Select Coin
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={selectedDropdownData}
                onChange={handleChange}
                input={<OutlinedInput label="Select Crypto" />}
                size="small"
                name="coin"
                disabled={loading}
                sx={{
                  border: '1px solid white',
                  color: '#fff', 
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white', 
                      borderWidth: 1,
                    },
                    '&:hover fieldset': {
                      borderColor: 'white', 
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white', 
                      borderWidth: 1, 
                    },
                  },
                  '& .MuiMenuItem-root': {
                    color: 'black', 
                  },
                }}
              >
                {data?.length ? (
                  data.map((res) => (
                    <MenuItem
                      key={res?.name}
                      value={res?.name || ""}
                      style={getStyles(res?.name, coin, theme)}
                    >
                      {res?.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Data Found</MenuItem>
                )}
              </Select>
            </FormControl>


          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
