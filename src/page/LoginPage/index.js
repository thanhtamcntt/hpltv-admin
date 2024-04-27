import {
  DivContainer,
  DivContent,
  DivLogo,
  DivTitle,
  DivForm,
  ContentLogin,
  DivLink,
  Text,
  DivImageLogin,
  ImageLogin,
  ErrorMessage,
} from './styles';
import ItemFormLogin from '../../components/Common/ItemFormLogin';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setError();
    console.log('Success:', values);
    const response = await fetch(process.env.REACT_APP_API_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.success) {
      await localStorage.setItem('tokenManager', responseJson.token);

      if (localStorage.getItem('tokenManager')) {
        navigate('/');
      }
    } else {
      setError(responseJson.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleFocus = () => {
    setError();
  };

  return (
    <DivContainer>
      <DivContent>
        <ContentLogin>
          <DivLogo>
            <h2>SHOWHUB</h2>
          </DivLogo>
          <DivTitle>
            <h2>Welcome Back!!</h2>
          </DivTitle>
          <DivForm>
            <Form
              name="loginForm"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <ItemFormLogin
                label="Email"
                name="email"
                message="Please input your email!"
                input={
                  <Input onFocus={handleFocus} className="form-add-modal" />
                }
              />

              <ItemFormLogin
                label="Password"
                name="password"
                message="Please input your password!"
                input={
                  <Input.Password
                    onFocus={handleFocus}
                    className="form-add-modal"
                  />
                }
              />

              <Form.Item
                className="button-form"
                wrapperCol={{
                  span: 24,
                }}>
                <Button htmlType="submit">Sign in</Button>
                {error && <ErrorMessage>{error}!!</ErrorMessage>}
              </Form.Item>
            </Form>
          </DivForm>
        </ContentLogin>
        <DivImageLogin>
          <ImageLogin src="https://res.cloudinary.com/dzxupp48t/image/upload/v1710852307/image-webFilm/bmnvx1mjcgw2jjvmhjet.jpg" />
        </DivImageLogin>
      </DivContent>
    </DivContainer>
  );
}

export default LoginPage;
