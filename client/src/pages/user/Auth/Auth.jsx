import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { userAPI } from '../../../services/user/api';
import { FORM_RULES, VALIDATION_PATTERNS, VALIDATION_MESSAGES } from '../../../constants/validationRules';
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
  BottomText,
  PasswordStrength,
  StrengthBar,
  StrengthSegment,
  StrengthLabel,
  TermsCheckbox,
  SuccessScreen,
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  ModalActions,
  SecondaryAction,
  OtpPreview
} from './AuthStyles';

const initialForgotState = {
  email: '',
  otp: '',
  newPassword: '',
  confirmPassword: ''
};

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const [forgotStep, setForgotStep] = useState(null);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [forgotConfirmVisible, setForgotConfirmVisible] = useState(false);
  const [forgotData, setForgotData] = useState(initialForgotState);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const password = watch('password', '');
  const typedEmail = watch('email', '');

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
  const forgotPasswordStrength = getPasswordStrength(forgotData.newPassword);

  const resetForgotFlow = () => {
    setForgotStep(null);
    setForgotLoading(false);
    setForgotPasswordVisible(false);
    setForgotConfirmVisible(false);
    setForgotData(initialForgotState);
  };

  const openForgotFlow = () => {
    setForgotData({
      ...initialForgotState,
      email: typedEmail?.trim() || ''
    });
    setForgotStep('request');
  };

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

  const switchToLogin = (email = '') => {
    setShowSuccess(false);
    setIsLogin(true);
    reset(email ? { email } : {});
    resetForgotFlow();
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowSuccess(false);
    reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
    resetForgotFlow();
  };

  const handleForgotChange = (field) => (event) => {
    setForgotData((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleRequestOtp = async (event) => {
    event.preventDefault();

    const email = forgotData.email.trim();
    if (!email) {
      showToast.error('Please enter your email address');
      return;
    }

    if (!VALIDATION_PATTERNS.email.test(email)) {
      showToast.error(VALIDATION_MESSAGES.email);
      return;
    }

    setForgotLoading(true);
    try {
      const response = await userAPI.requestPasswordResetOtp({ email });
      if (!response.success) {
        showToast.error(response.message || 'Unable to send OTP');
        return;
      }

      showToast.success(response.message || 'OTP sent successfully');
      setForgotStep('verify');
      setForgotData((current) => ({ ...current, email }));
    } catch (error) {
      showToast.error('Unable to send OTP right now');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    const otp = forgotData.otp.trim();
    if (!/^\d{6}$/.test(otp)) {
      showToast.error('Please enter the 6-digit OTP');
      return;
    }

    setForgotLoading(true);
    try {
      const response = await userAPI.verifyPasswordResetOtp({
        email: forgotData.email.trim(),
        otp
      });

      if (!response.success) {
        showToast.error(response.message || 'OTP verification failed');
        return;
      }

      showToast.success(response.message || 'OTP verified');
      setForgotStep('reset');
      setForgotData((current) => ({ ...current, otp }));
    } catch (error) {
      showToast.error('Unable to verify OTP right now');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!VALIDATION_PATTERNS.password.test(forgotData.newPassword)) {
      showToast.error(VALIDATION_MESSAGES.password);
      return;
    }

    if (forgotData.newPassword !== forgotData.confirmPassword) {
      showToast.error('Passwords do not match');
      return;
    }

    setForgotLoading(true);
    try {
      const response = await userAPI.resetPasswordWithOtp({
        email: forgotData.email.trim(),
        otp: forgotData.otp.trim(),
        newPassword: forgotData.newPassword
      });

      if (!response.success) {
        showToast.error(response.message || 'Unable to reset password');
        return;
      }

      showToast.success(response.message || 'Password reset successful');
      switchToLogin(forgotData.email.trim());
    } catch (error) {
      showToast.error('Unable to reset password right now');
    } finally {
      setForgotLoading(false);
    }
  };

  const renderForgotModal = () => {
    if (!forgotStep) return null;

    return (
      <ModalOverlay onClick={resetForgotFlow}>
        <ModalCard onClick={(event) => event.stopPropagation()}>
          <ModalHeader>
            <div>
              <ModalTitle>
                {forgotStep === 'request' && 'Forgot Password'}
                {forgotStep === 'verify' && 'Verify OTP'}
                {forgotStep === 'reset' && 'Reset Password'}
              </ModalTitle>
              <ModalSubtitle>
                {forgotStep === 'request' && 'Enter your registered email address and we will send a 6-digit OTP.'}
                {forgotStep === 'verify' && `Enter the OTP sent to ${forgotData.email}.`}
                {forgotStep === 'reset' && 'Create a new password after your OTP is verified.'}
              </ModalSubtitle>
            </div>
            <button type="button" onClick={resetForgotFlow} aria-label="Close forgot password modal">
              <i className="fa-solid fa-xmark" />
            </button>
          </ModalHeader>

          {forgotStep === 'request' && (
            <Form onSubmit={handleRequestOtp}>
              <InputGroup>
                <Label>Email Address</Label>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-envelope" />
                  <Input
                    type="email"
                    placeholder="Enter your registered email"
                    value={forgotData.email}
                    onChange={handleForgotChange('email')}
                  />
                </InputWrapper>
              </InputGroup>

              <ModalActions>
                <SecondaryAction type="button" onClick={resetForgotFlow}>
                  Cancel
                </SecondaryAction>
                <Button type="submit" disabled={forgotLoading}>
                  {forgotLoading ? (
                    <>
                      <LoadingSpinner size="20px" color="#fff" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      SEND OTP
                      <i className="fa-solid fa-paper-plane" />
                    </>
                  )}
                </Button>
              </ModalActions>
            </Form>
          )}

          {forgotStep === 'verify' && (
            <Form onSubmit={handleVerifyOtp}>
              <InputGroup>
                <Label>6-Digit OTP</Label>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-shield-halved" />
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter OTP"
                    value={forgotData.otp}
                    onChange={handleForgotChange('otp')}
                  />
                </InputWrapper>
              </InputGroup>

              <OtpPreview>
                {forgotData.otp.padEnd(6).split('').slice(0, 6).map((char, index) => (
                  <span key={`${char}-${index}`}>{char.trim() || '-'}</span>
                ))}
              </OtpPreview>

              <ModalActions>
                <SecondaryAction
                  type="button"
                  disabled={forgotLoading}
                  onClick={handleRequestOtp}
                >
                  Resend OTP
                </SecondaryAction>
                <Button type="submit" disabled={forgotLoading}>
                  {forgotLoading ? (
                    <>
                      <LoadingSpinner size="20px" color="#fff" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      VERIFY OTP
                      <i className="fa-solid fa-check" />
                    </>
                  )}
                </Button>
              </ModalActions>
            </Form>
          )}

          {forgotStep === 'reset' && (
            <Form onSubmit={handleResetPassword}>
              <InputGroup>
                <Label>New Password</Label>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-lock" />
                  <Input
                    type={forgotPasswordVisible ? 'text' : 'password'}
                    placeholder="Create new password"
                    value={forgotData.newPassword}
                    onChange={handleForgotChange('newPassword')}
                  />
                  <PasswordToggle type="button" onClick={() => setForgotPasswordVisible((current) => !current)}>
                    <i className={`fas ${forgotPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </PasswordToggle>
                </InputWrapper>
                {forgotData.newPassword && (
                  <PasswordStrength>
                    <StrengthBar>
                      {[1, 2, 3, 4].map((level) => (
                        <StrengthSegment
                          key={level}
                          $filled={level <= forgotPasswordStrength.level}
                          $color={forgotPasswordStrength.color}
                        />
                      ))}
                    </StrengthBar>
                    <StrengthLabel $color={forgotPasswordStrength.color}>
                      {forgotPasswordStrength.label}
                    </StrengthLabel>
                  </PasswordStrength>
                )}
              </InputGroup>

              <InputGroup>
                <Label>Confirm Password</Label>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-lock-open" />
                  <Input
                    type={forgotConfirmVisible ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={forgotData.confirmPassword}
                    onChange={handleForgotChange('confirmPassword')}
                  />
                  <PasswordToggle type="button" onClick={() => setForgotConfirmVisible((current) => !current)}>
                    <i className={`fas ${forgotConfirmVisible ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </PasswordToggle>
                </InputWrapper>
              </InputGroup>

              <ModalActions>
                <SecondaryAction type="button" onClick={() => setForgotStep('verify')}>
                  Back
                </SecondaryAction>
                <Button type="submit" disabled={forgotLoading}>
                  {forgotLoading ? (
                    <>
                      <LoadingSpinner size="20px" color="#fff" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      RESET PASSWORD
                      <i className="fa-solid fa-key" />
                    </>
                  )}
                </Button>
              </ModalActions>
            </Form>
          )}
        </ModalCard>
      </ModalOverlay>
    );
  };

  return (
    <>
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
              <>New here? <button type="button" onClick={toggleMode}>Create Account →</button></>
            ) : (
              <>Already a member? <button type="button" onClick={toggleMode}>Sign In →</button></>
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
                <Button type="button" onClick={() => switchToLogin()}>
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

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <RememberMe>
                          <input type="checkbox" />
                          Remember me
                        </RememberMe>
                        <ForgotPassword type="button" onClick={openForgotFlow}>Forgot password?</ForgotPassword>
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

      {renderForgotModal()}
    </>
  );
};

export default UserAuth;
