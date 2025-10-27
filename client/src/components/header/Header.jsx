import { AppBar, Toolbar, styled, Fade } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataProvider';

const Component = styled(AppBar)`
    background: linear-gradient(90deg, #e0f7fa 0%, #ffffff 100%);
  color: #00575b;
  box-shadow: none;
  `;

const Container = styled(Toolbar)`
  justify-content: center;
  gap: 55px;
  & > a {
    padding: 12px 22px;
    color: #333;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.08rem;
    border-radius: 24px;
    transition: background 0.19s;
    cursor: pointer;
  }
  & > a:hover {
    background: #e5e9f7ff;
    color: #1976d2;
  }
  & > span {
    padding: 12px 22px;
    font-weight: 500;
    font-size: 1.08rem;
    border-radius: 24px;
    background: #f2a7a7ff;
    color: #fff;
    cursor: pointer;
    transition: background 0.19s;
  }
  & > span:hover {
    background: #df6868ff;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Fade-in on mount
  }, []);

  const logout = () => {
    sessionStorage.clear();
    setAccount({ username: '', name: '' });
    try {
      window.dispatchEvent(new Event('authChanged'));
    } catch (err) {
      console.warn('Could not dispatch authChanged event', err);
    }
    navigate('/login');
  };

  return (
    <Fade in={show} timeout={650}>
      <Component position="static">
        <Container>
          <Link to='/'>HOME</Link>
          <Link to='/about'>ABOUT</Link>
          <Link to='/contact'>CONTACT</Link>
          <span onClick={logout}>LOGOUT</span>
        </Container>
      </Component>
    </Fade>
  );
}

export default Header;
