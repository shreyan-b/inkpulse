import { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography, Slide } from '@mui/material';
import name from '../../name.png';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

// Centering container
const CenteredContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
`;

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px rgb(0 0 0 / 0.6);
  border-radius: 10px;
  background-color: white;
  height: auto;
  padding-bottom: 20px;
`;

const Image = styled('img')({
  width: 175,
  margin: 'auto',
  display: 'flex',
  padding: '50px 0 0',
});

const Wrapper = styled(Box)`
  padding: 30px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 25px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  padding: 15px 25px;
  background: green;
  color: #fff;
  height: 45px;
  border-radius: 50px;
  margin-top: 20px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  font-size: 18px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #124db9ff;
  height: 40px;
  border-radius: 25px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  font-size: 18px;
  margin-top: 20px;
`;

const Error = styled(Typography)`
  font-size: 13px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 500;
`;

const signupInitialValues = {
  name: "",
  username: "",
  password: ""
};

const loginInitialValues = {
  username: "",
  password: ""
};

// showLogin controls the transition: true = slide in, false = slide out
const Login = ({ isUserAuthenticated, showLogin = true }) => {
  const [account, toggleAccount] = useState('login');
  const [login, setLogin] = useState({ ...loginInitialValues });
  const [signup, setSignup] = useState({ ...signupInitialValues });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const loginUser = async () => {
    setError('');
    if (!login.username || !login.password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      let response = await API.authenticateLogin(login);
      if (response.accessToken) {
        setAccount({ username: response.username, name: response.name });
        isUserAuthenticated(true);
        navigate('/');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };

  const signupUser = async () => {
    setError('');
    if (!signup.name || !signup.username || !signup.password) {
      setError('All fields are required for signup.');
      return;
    }
    try {
      let response = await API.userSignup(signup);
      const ok = response && (response.isSuccess || response.success || response.msg === 'signup successful' || response.status === 'success');
      if (ok) {
        setLogin({ username: signup.username, password: '' });
        toggleAccount('login');
        setSignup({ ...signupInitialValues });
      } else {
        setError('Signup failed! Please try again.');
      }
    } catch (error) {
      setError('Signup failed! Please try again.');
    }
  };

  // Slide's direct child is CenteredContainer (no extra wrapper)
  return (
    <Slide direction="left" in={showLogin} mountOnEnter unmountOnExit timeout={500}>
      <CenteredContainer>
        <Component>
          <Image src={name} alt="InkPulse" />
          {account === 'login' ? (
            <Wrapper>
              <TextField
                variant="standard" fullWidth
                value={login.username}
                onChange={(e) => setLogin({ ...login, username: e.target.value })}
                name='login-username'
                label='Username'
                autoComplete='username'
              />
              <TextField
                variant="standard" fullWidth
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                name='login-password'
                label='Password'
                type='password'
                autoComplete='current-password'
              />
              {error && <Error>{error}</Error>}
              <LoginButton variant="contained" fullWidth onClick={loginUser}>Login</LoginButton>
              <Typography align='center'>OR</Typography>
              <SignupButton fullWidth onClick={() => { setError(''); toggleAccount('signup'); }}>Create an account</SignupButton>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard" fullWidth
                value={signup.name}
                onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                name='name'
                label='Name'
              />
              <TextField
                variant="standard" fullWidth
                value={signup.username}
                onChange={(e) => setSignup({ ...signup, username: e.target.value })}
                name='signup-username'
                label='Username'
                autoComplete='username'
              />
              <TextField
                variant="standard" fullWidth
                value={signup.password}
                onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                name='signup-password'
                label='Password'
                type='password'
                autoComplete='new-password'
              />
              {error && <Error>{error}</Error>}
              <SignupButton fullWidth onClick={signupUser}>Signup</SignupButton>
              <Typography align='center'>OR</Typography>
              <LoginButton fullWidth variant="contained" onClick={() => { setError(''); toggleAccount('login'); }}>Already have an account</LoginButton>
            </Wrapper>
          )}
        </Component>
      </CenteredContainer>
    </Slide>
  );
};

export default Login;
