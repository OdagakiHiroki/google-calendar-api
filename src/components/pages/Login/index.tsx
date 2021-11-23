import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from "utils/api/auth/auth";
import { Container } from './style';

const Login: React.VFC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    (async () => {
      const isSuccesSignIn = await signIn();
      if (isSuccesSignIn) {
        navigate('/');
      }
    })();
  };

  return (
    <>
      <Container>
        <button onClick={() => handleLoginClick()}>ログイン</button>
      </Container>
    </>
  );
};

export { Login };
