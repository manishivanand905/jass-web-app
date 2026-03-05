import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { userAPI } from '../../../services/user/api';
import { FORM_RULES } from '../../../constants/validationRules';
import { showToast } from '../../../components/common/Toast/toastConfig';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../../../components/common/FormError/FormErrorStyles';
import {
  Container,
  VisualPanel,
  Logo,
  QuoteSection,
  Quote,
  Divider,
  TrustBadges,
  Badge,
  BottomLink,
  FormPanel,
  FormContainer,
  Eyebrow,
  Title,
  Subtitle,
  Form,
  FormGrid,
  InputGroup,
  Label,
  InputWrapper,
  InputIcon,
  Input,
  PasswordToggle,
  ForgotPassword,
  RememberMe,
  Button,
  Divider2,
  SocialButtons,
  SocialButton,
  BottomText,
  PasswordStrength,
  StrengthBar,
  StrengthSegment,
  StrengthLabel,
  TermsCheckbox,
  SuccessScreen
} from './AuthStyles';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  
  const password = watch('password', '');

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: '' };
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[@$!%*?&]/.test(pwd)) strength++;

    const levels = [
      { level: 1, label: 'Weak', color: '#cc0000' },
      { level: 2, label: 'Fair', color: '#e67e22' },
      { level: 3, label: 'Good', color: '#f1c40f' },
      { level: 4, label: 'Strong', color: '#27ae60' }
    ];

    return levels[strength - 1] || { level: 0, label: '', color: '' };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = isLogin 
        ? await userAPI.login(data)
        : await userAPI.register(data);

      if (response.success) {
        if (isLogin) {
          loginUser(response.user, response.token);
          showToast.success('Login successful!');
          navigate('/');
        } else {
          setUserName(data.firstName);
          setShowSuccess(true);
        }
      } else {
        showToast.error(response.message || 'Authentication failed');
      }
    } catch (error) {
      showToast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setShowSuccess(false);
    setIsLogin(true);
    reset();
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowSuccess(false);
    reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <Container>
      <VisualPanel>
        <Logo>
          <span>JASS</span>
          <span>AUTOMOTIVES</span>
        </Logo>

        <QuoteSection>
          <Quote>"Protection isn't just a service. It's a promise."</Quote>
          <Divider />
          <TrustBadges>
            <Badge>
              <i className="fa-solid fa-shield-halved" />
              <span>10 Year Warranty</span>
            </Badge>
            <Badge>
              <i className="fa-solid fa-star" />
              <span>4.8★ Rated</span>
            </Badge>
            <Badge>
              <i className="fa-solid fa-users" />
              <span>500+ Customers</span>
            </Badge>
          </TrustBadges>
        </QuoteSection>

        <BottomLink>
          {isLogin ? (
            <>New here? <button onClick={toggleMode}>Create Account →</button></>
          ) : (
            <>Already a member? <button onClick={toggleMode}>Sign In →</button></>
          )}
        </BottomLink>
      </VisualPanel>

      <FormPanel>
        <FormContainer>
          {showSuccess ? (
            <SuccessScreen>
              <i className="fa-solid fa-circle-check" />
              <h2>Account Created!</h2>
              <p>Welcome to Jass Automotives, {userName}!</p>
              <Button onClick={switchToLogin}>
                SIGN IN NOW →
              </Button>
            </SuccessScreen>
          ) : (
            <>
              <Eyebrow>{isLogin ? 'WELCOME BACK' : 'JOIN US'}</Eyebrow>
              <Title>
                {isLogin ? 'Sign In' : 'Create'} <span $accent={!isLogin}>{isLogin ? 'to your account' : 'your account'}</span>
              </Title>
              <Subtitle>
                {isLogin 
                  ? 'Access your bookings, orders and profile'
                  : 'Get access to exclusive bookings and order tracking'}
              </Subtitle>

              <Form onSubmit={handleSubmit(onSubmit)}>
                {isLogin ? (
                  <>
                    <InputGroup>
                      <Label>Phone or Email</Label>
                      <InputWrapper>
                        <InputIcon className="fa-solid fa-user" />
                        <Input
                          type="text"
                          placeholder="Enter your phone or email"
                          $hasError={!!errors.email}
                          {...register('email', FORM_RULES.email)}
                        />
                      </InputWrapper>
                      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </InputGroup>

                    <InputGroup>
                      <Label>Password</Label>
                      <InputWrapper>
                        <InputIcon className="fa-solid fa-lock" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          $hasError={!!errors.password}
                          {...register('password', FORM_RULES.password)}
                        />
                        <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                        </PasswordToggle>
                      </InputWrapper>
                      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </InputGroup>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <RememberMe>
                        <input type="checkbox" />
                        Remember me
                      </RememberMe>
                      <ForgotPassword type="button">Forgot password?</ForgotPassword>
                    </div>

                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <LoadingSpinner size="20px" color="#fff" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          SIGN IN
                          <i className="fa-solid fa-right-to-bracket" />
                        </>
                      )}
                    </Button>

                    <Divider2><span>Or continue with</span></Divider2>

                    <SocialButtons>
                      <SocialButton type="button">
                        <i className="fa-brands fa-google" />
                        Google
                      </SocialButton>
                      <SocialButton type="button">
                        <i className="fa-brands fa-facebook" />
                        Facebook
                      </SocialButton>
                    </SocialButtons>
                  </>
                ) : (
                  <>
                    <FormGrid>
                      <InputGroup>
                        <Label>First Name</Label>
                        <InputWrapper>
                          <InputIcon className="fa-solid fa-user" />
                          <Input
                            type="text"
                            placeholder="First name"
                            $hasError={!!errors.firstName}
                            {...register('firstName', FORM_RULES.name)}
                          />
                        </InputWrapper>
                        {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
                      </InputGroup>

                      <InputGroup>
                        <Label>Last Name</Label>
                        <InputWrapper>
                          <InputIcon className="fa-solid fa-user" />
                          <Input
                            type="text"
                            placeholder="Last name"
                            $hasError={!!errors.lastName}
                            {...register('lastName', FORM_RULES.name)}
                          />
                        </InputWrapper>
                        {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
                      </InputGroup>
                    </FormGrid>

                    <FormGrid>
                      <InputGroup>
                        <Label>Phone Number</Label>
                        <InputWrapper>
                          <InputIcon className="fa-solid fa-phone" />
                          <Input
                            type="tel"
                            placeholder="Phone number"
                            $hasError={!!errors.phone}
                            {...register('phone', FORM_RULES.phone)}
                          />
                        </InputWrapper>
                        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                      </InputGroup>

                      <InputGroup>
                        <Label>Email Address</Label>
                        <InputWrapper>
                          <InputIcon className="fa-solid fa-envelope" />
                          <Input
                            type="email"
                            placeholder="Email address"
                            $hasError={!!errors.email}
                            {...register('email', FORM_RULES.email)}
                          />
                        </InputWrapper>
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                      </InputGroup>
                    </FormGrid>

                    <FormGrid>
                      <InputGroup>
                        <Label>City</Label>
                        <InputWrapper>
                          <InputIcon className="fa-solid fa-location-dot" />
                          <Input
                            type="text"
                            placeholder="Your city"
                            $hasError={!!errors.city}
                            {...register('city', { required: 'City is required' })}
                          />
                        </InputWrapper>
                        {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
                      </InputGroup>

                      <InputGroup>
                        <Label>Vehicle Model (Optional)</Label>
                        <InputWrapper>
                          <InputIcon className="fa-solid fa-car" />
                          <Input
                            type="text"
                            placeholder="e.g., BMW X5"
                            {...register('vehicleModel')}
                          />
                        </InputWrapper>
                      </InputGroup>
                    </FormGrid>

                    <InputGroup>
                      <Label>Password</Label>
                      <InputWrapper>
                        <InputIcon className="fa-solid fa-lock" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create password"
                          $hasError={!!errors.password}
                          {...register('password', FORM_RULES.password)}
                        />
                        <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                        </PasswordToggle>
                      </InputWrapper>
                      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                      {password && (
                        <PasswordStrength>
                          <StrengthBar>
                            {[1, 2, 3, 4].map(i => (
                              <StrengthSegment
                                key={i}
                                $filled={i <= passwordStrength.level}
                                $color={passwordStrength.color}
                              />
                            ))}
                          </StrengthBar>
                          <StrengthLabel $color={passwordStrength.color}>
                            {passwordStrength.label}
                          </StrengthLabel>
                        </PasswordStrength>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <Label>Confirm Password</Label>
                      <InputWrapper>
                        <InputIcon className="fa-solid fa-lock-open" />
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          $hasError={!!errors.confirmPassword}
                          {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: value => value === password || 'Passwords do not match'
                          })}
                        />
                        <PasswordToggle type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                        </PasswordToggle>
                      </InputWrapper>
                      {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                    </InputGroup>

                    <TermsCheckbox>
                      <input
                        type="checkbox"
                        {...register('terms', { required: 'You must accept the terms' })}
                      />
                      <span>
                        I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                      </span>
                    </TermsCheckbox>
                    {errors.terms && <ErrorMessage>{errors.terms.message}</ErrorMessage>}

                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <LoadingSpinner size="20px" color="#fff" />
                          Creating your account...
                        </>
                      ) : (
                        <>
                          CREATE ACCOUNT
                          <i className="fa-solid fa-user-plus" />
                        </>
                      )}
                    </Button>
                  </>
                )}

                <BottomText>
                  {isLogin ? (
                    <>Don't have an account? <button type="button" onClick={toggleMode}>Create one →</button></>
                  ) : (
                    <>Already have an account? <button type="button" onClick={toggleMode}>Login →</button></>
                  )}
                </BottomText>
              </Form>
            </>
          )}
        </FormContainer>
      </FormPanel>
    </Container>
  );
};

export default UserAuth;
