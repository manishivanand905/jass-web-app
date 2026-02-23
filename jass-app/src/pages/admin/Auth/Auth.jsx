import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { adminAPI } from '../../../services/admin/api';
import { FORM_RULES } from '../../../constants/validationRules';
import { showToast } from '../../../components/common/Toast/toastConfig';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../../../components/common/FormError/FormErrorStyles';
import {
  Container,
  Glow2,
  Card,
  ShieldIcon,
  Title,
  Subtitle,
  WarningStrip,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  InputIcon,
  Input,
  PasswordToggle,
  HelpText,
  Button,
  ErrorBanner,
  SecurityBadges,
  SecurityBadge,
  Footer
} from './AuthStyles';

const AdminAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await adminAPI.login(data);

      if (response.success) {
        loginAdmin(response.admin, response.token);
        showToast.success('Admin access granted');
        navigate('/admin/dashboard');
      } else {
        setError(response.message || 'Invalid credentials. Access denied.');
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setError(''), 4000);
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Glow2 />
      <Card>
        <ShieldIcon>
          <i className="fa-solid fa-shield-halved" />
        </ShieldIcon>

        <Title>ADMIN</Title>
        <Subtitle>ACCESS PORTAL</Subtitle>

        <WarningStrip>
          <i className="fa-solid fa-triangle-exclamation" />
          <span>Restricted area. Authorised personnel only.</span>
        </WarningStrip>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Admin Username</Label>
            <InputWrapper>
              <InputIcon className="fa-solid fa-user-shield" />
              <Input
                type="email"
                placeholder="Enter admin email"
                $hasError={!!errors.email}
                {...register('email', FORM_RULES.email)}
              />
            </InputWrapper>
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Admin Password</Label>
            <InputWrapper>
              <InputIcon className="fa-solid fa-lock" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password"
                $hasError={!!errors.password}
                {...register('password', FORM_RULES.password)}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </PasswordToggle>
            </InputWrapper>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            <HelpText>Contact your system administrator to reset credentials</HelpText>
          </InputGroup>

          <Button type="submit" disabled={loading} className={shake ? 'shake' : ''}>
            {loading ? (
              <>
                <LoadingSpinner size="20px" color="#fff" />
                Verifying...
              </>
            ) : (
              <>
                <i className="fa-solid fa-shield-halved" />
                ACCESS DASHBOARD
              </>
            )}
          </Button>

          {error && (
            <ErrorBanner>
              <i className="fa-solid fa-circle-xmark" />
              <span>{error}</span>
            </ErrorBanner>
          )}
        </Form>

        <SecurityBadges>
          <SecurityBadge>
            <i className="fa-solid fa-lock" />
            <span>Encrypted</span>
          </SecurityBadge>
          <SecurityBadge>
            <i className="fa-solid fa-eye-slash" />
            <span>Private Session</span>
          </SecurityBadge>
          <SecurityBadge>
            <i className="fa-solid fa-clock" />
            <span>Auto Logout</span>
          </SecurityBadge>
        </SecurityBadges>

        <Footer>
          <p>
            © 2026 Jass Automotives
            <span>Admin v1.0</span>
          </p>
        </Footer>
      </Card>
    </Container>
  );
};

export default AdminAuth;
