import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useBookingModal } from '../../../hooks/useNewBookingModal';
import { userAPI } from '../../../services/user/api';
import { serviceTypes, serviceTiers, timeSlots, vehicleYears } from '../../../data/newBookingData';
import { FORM_RULES } from '../../../constants/validationRules';
import { showToast } from '../../../components/common/Toast/toastConfig';
import { ErrorMessage } from '../../../components/common/FormError/FormErrorStyles';
import {
  ModalOverlay,
  ModalCard,
  ModalHeader,
  CloseButton,
  ProgressStepper,
  StepConnector,
  StepConnectorFill,
  StepItem,
  StepCircle,
  StepLabel,
  StepContent,
  StepEyebrow,
  StepTitle,
  StepSubtitle,
  ServiceTypeGrid,
  ServiceTypeCard,
  ServiceTierList,
  ServiceTierRow,
  RadioCircle,
  TierInfo,
  TierPrice,
  PopularBadge,
  FormGrid,
  FormField,
  FieldLabel,
  InputWrapper,
  InputIcon,
  InputField,
  ModalFooter,
  FooterButton
} from './NewBookingModalStyles';

const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: '#1a1a1a',
    borderColor: state.isFocused ? '#cc0000' : '#333',
    borderRadius: '8px',
    padding: '4px',
    boxShadow: 'none',
    '&:hover': { borderColor: '#cc0000' }
  }),
  menu: (base) => ({ ...base, background: '#1a1a1a', border: '1px solid #333' }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? '#cc0000' : '#1a1a1a',
    color: '#fff',
    cursor: 'pointer'
  }),
  singleValue: (base) => ({ ...base, color: '#fff' }),
  input: (base) => ({ ...base, color: '#fff' }),
  placeholder: (base) => ({ ...base, color: '#666' })
};

const NewBookingModal = () => {
  const { isOpen, closeModal, initialData } = useBookingModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  
  const { control, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
    defaultValues: {
      serviceType: initialData?.type || '',
      tier: initialData?.tier || '',
      fullName: '',
      phone: '',
      email: '',
      vehicleModel: '',
      vehicleYear: null,
      city: '',
      date: '',
      time: null,
      termsAccepted: false
    }
  });

  const watchedValues = watch();
  const steps = [
    { number: 1, label: 'SERVICE' },
    { number: 2, label: 'DETAILS' },
    { number: 3, label: 'SCHEDULE' },
    { number: 4, label: 'CONFIRM' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialData?.type) {
        setValue('serviceType', initialData.type);
        if (initialData.tier) setValue('tier', initialData.tier);
      }
    } else {
      document.body.style.overflow = 'unset';
      setCurrentStep(1);
      setShowSuccess(false);
      reset();
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialData, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await userAPI.createBooking({
        ...data,
        vehicleYear: data.vehicleYear?.value,
        time: data.time?.value
      });

      if (response.success) {
        setBookingRef(response.bookingRef);
        setShowSuccess(true);
        showToast.success('Booking confirmed successfully!');
      } else {
        showToast.error(response.message || 'Booking failed');
      }
    } catch (error) {
      showToast.error('An error occurred. Please try again.');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return watchedValues.serviceType && watchedValues.tier;
      case 2: return watchedValues.fullName && watchedValues.phone && watchedValues.email;
      case 3: return watchedValues.date && watchedValues.time;
      case 4: return watchedValues.termsAccepted;
      default: return false;
    }
  };

  const renderStepContent = () => {
    if (showSuccess) {
      return (
        <StepContent>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <i className="fa-solid fa-circle-check" style={{ fontSize: '4rem', color: '#cc0000', marginBottom: '24px' }} />
            <h2 style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '2rem', fontWeight: 900, color: 'white', margin: '0 0 12px 0' }}>
              Booking Confirmed!
            </h2>
            <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', margin: '0 0 20px 0' }}>
              Confirmation sent to <span style={{ color: '#cc0000' }}>{watchedValues.email}</span>
            </p>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '1px solid #cc0000', borderRadius: '6px', padding: '8px 16px', fontFamily: '"Courier New", monospace', fontSize: '0.8rem', color: '#cc0000', marginBottom: '20px' }}>
              REF: {bookingRef}
            </div>
          </div>
        </StepContent>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <StepContent>
            <StepEyebrow>STEP 01</StepEyebrow>
            <StepTitle>
              <span className="white">What service </span>
              <span className="red">do you need?</span>
            </StepTitle>
            <StepSubtitle>Choose the protection service that best fits your vehicle's needs</StepSubtitle>
            
            <ServiceTypeGrid>
              {serviceTypes.map((service) => (
                <ServiceTypeCard
                  key={service.id}
                  selected={watchedValues.serviceType === service.id}
                  onClick={() => {
                    setValue('serviceType', service.id);
                    setValue('tier', '');
                  }}
                >
                  <i className={service.icon}></i>
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                </ServiceTypeCard>
              ))}
            </ServiceTypeGrid>

            {watchedValues.serviceType && (
              <ServiceTierList>
                {serviceTiers[watchedValues.serviceType]?.map((tier) => (
                  <ServiceTierRow
                    key={tier.id}
                    selected={watchedValues.tier === tier.id}
                    onClick={() => setValue('tier', tier.id)}
                  >
                    <RadioCircle selected={watchedValues.tier === tier.id} />
                    <TierInfo>
                      <div className="name">{tier.name}</div>
                      <div className="coverage">{tier.coverage}</div>
                    </TierInfo>
                    <TierPrice className="price">{tier.price}</TierPrice>
                    {tier.popular && <PopularBadge>MOST POPULAR</PopularBadge>}
                  </ServiceTierRow>
                ))}
              </ServiceTierList>
            )}
          </StepContent>
        );

      case 2:
        return (
          <StepContent>
            <StepEyebrow>STEP 02</StepEyebrow>
            <StepTitle>
              <span className="white">Tell us </span>
              <span className="red">about you</span>
            </StepTitle>
            <StepSubtitle>We need some basic information to process your booking</StepSubtitle>
            
            <FormGrid>
              <FormField>
                <FieldLabel>FULL NAME</FieldLabel>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-user" />
                  <Controller
                    name="fullName"
                    control={control}
                    rules={FORM_RULES.name}
                    render={({ field }) => (
                      <InputField {...field} type="text" placeholder="Enter your full name" />
                    )}
                  />
                </InputWrapper>
                {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
              </FormField>
              
              <FormField>
                <FieldLabel>PHONE NUMBER</FieldLabel>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-phone" />
                  <Controller
                    name="phone"
                    control={control}
                    rules={FORM_RULES.phone}
                    render={({ field }) => (
                      <InputField {...field} type="tel" placeholder="Enter phone number" />
                    )}
                  />
                </InputWrapper>
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
              </FormField>
              
              <FormField>
                <FieldLabel>EMAIL ADDRESS</FieldLabel>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-envelope" />
                  <Controller
                    name="email"
                    control={control}
                    rules={FORM_RULES.email}
                    render={({ field }) => (
                      <InputField {...field} type="email" placeholder="Enter email address" />
                    )}
                  />
                </InputWrapper>
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </FormField>
              
              <FormField>
                <FieldLabel>VEHICLE MODEL</FieldLabel>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-car" />
                  <Controller
                    name="vehicleModel"
                    control={control}
                    rules={{ required: 'Vehicle model is required' }}
                    render={({ field }) => (
                      <InputField {...field} type="text" placeholder="e.g., BMW X5" />
                    )}
                  />
                </InputWrapper>
                {errors.vehicleModel && <ErrorMessage>{errors.vehicleModel.message}</ErrorMessage>}
              </FormField>
              
              <FormField>
                <FieldLabel>VEHICLE YEAR</FieldLabel>
                <Controller
                  name="vehicleYear"
                  control={control}
                  rules={{ required: 'Vehicle year is required' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={vehicleYears.map(year => ({ value: year, label: year }))}
                      styles={selectStyles}
                      placeholder="Select year"
                    />
                  )}
                />
                {errors.vehicleYear && <ErrorMessage>{errors.vehicleYear.message}</ErrorMessage>}
              </FormField>
              
              <FormField>
                <FieldLabel>CITY</FieldLabel>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-location-dot" />
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: 'City is required' }}
                    render={({ field }) => (
                      <InputField {...field} type="text" placeholder="Enter your city" />
                    )}
                  />
                </InputWrapper>
                {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
              </FormField>
            </FormGrid>
          </StepContent>
        );

      case 3:
        return (
          <StepContent>
            <StepEyebrow>STEP 03</StepEyebrow>
            <StepTitle>
              <span className="white">When should </span>
              <span className="red">we meet?</span>
            </StepTitle>
            <StepSubtitle>Choose a convenient date and time for your service appointment</StepSubtitle>
            
            <FormGrid>
              <FormField>
                <FieldLabel>PREFERRED DATE</FieldLabel>
                <InputWrapper>
                  <InputIcon className="fa-solid fa-calendar-days" />
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: 'Date is required' }}
                    render={({ field }) => (
                      <InputField {...field} type="date" min={new Date().toISOString().split('T')[0]} />
                    )}
                  />
                </InputWrapper>
                {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
              </FormField>
              
              <FormField>
                <FieldLabel>PREFERRED TIME</FieldLabel>
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: 'Time is required' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={timeSlots.map(time => ({ value: time, label: time }))}
                      styles={selectStyles}
                      placeholder="Select time"
                    />
                  )}
                />
                {errors.time && <ErrorMessage>{errors.time.message}</ErrorMessage>}
              </FormField>
            </FormGrid>
          </StepContent>
        );

      case 4:
        const selectedTierData = serviceTiers[watchedValues.serviceType]?.find(t => t.id === watchedValues.tier);
        
        return (
          <StepContent>
            <StepEyebrow>STEP 04</StepEyebrow>
            <StepTitle>
              <span className="white">Review & </span>
              <span className="red">Confirm</span>
            </StepTitle>
            <StepSubtitle>Please review all details before confirming your appointment</StepSubtitle>
            
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: '3px solid #cc0000', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#cc0000', marginBottom: '8px' }}>SERVICE</div>
                <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.9rem', color: 'white', lineHeight: 1.4 }}>
                  {selectedTierData?.name} — {selectedTierData?.coverage}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#cc0000' }}>{selectedTierData?.price}</div>
              </div>
              
              <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}>
                <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#cc0000', marginBottom: '8px' }}>SCHEDULE</div>
                <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.9rem', color: 'white', lineHeight: 1.4 }}>
                  {watchedValues.date && new Date(watchedValues.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  <br />
                  {watchedValues.time?.label} — Studio visit
                </div>
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#cc0000', marginBottom: '8px' }}>CUSTOMER</div>
                <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.9rem', color: 'white', lineHeight: 1.4 }}>
                  {watchedValues.fullName} • {watchedValues.phone}
                  <br />
                  {watchedValues.vehicleModel} ({watchedValues.vehicleYear?.label}) • {watchedValues.city}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
              <Controller
                name="termsAccepted"
                control={control}
                rules={{ required: 'You must accept the terms' }}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    style={{ accentColor: '#cc0000', width: '16px', height: '16px', marginTop: '2px' }}
                  />
                )}
              />
              <label style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                I agree to the terms and cancellation policy
              </label>
            </div>
            {errors.termsAccepted && <ErrorMessage>{errors.termsAccepted.message}</ErrorMessage>}
          </StepContent>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseButton onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </CloseButton>
        </ModalHeader>

        {!showSuccess && (
          <div style={{ padding: '0 28px' }}>
            <ProgressStepper>
              <StepConnector>
                <StepConnectorFill progress={((currentStep - 1) / (steps.length - 1)) * 100} />
              </StepConnector>
              
              {steps.map((step) => (
                <StepItem key={step.number}>
                  <StepCircle active={step.number === currentStep} completed={step.number < currentStep}>
                    {step.number < currentStep ? <i className="fa-solid fa-check"></i> : step.number}
                  </StepCircle>
                  <StepLabel active={step.number === currentStep}>{step.label}</StepLabel>
                </StepItem>
              ))}
            </ProgressStepper>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStepContent()}

          {!showSuccess && (
            <ModalFooter>
              <FooterButton
                type="button"
                className="secondary"
                onClick={() => setCurrentStep(prev => prev - 1)}
                style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
              >
                ← PREVIOUS
              </FooterButton>
              
              {currentStep === steps.length ? (
                <FooterButton type="submit" className="primary" disabled={!canProceed()}>
                  <i className="fa-solid fa-calendar-check" style={{ marginRight: '8px' }}></i>
                  CONFIRM BOOKING
                </FooterButton>
              ) : (
                <FooterButton
                  type="button"
                  className="primary"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!canProceed()}
                >
                  NEXT →
                </FooterButton>
              )}
            </ModalFooter>
          )}

          {showSuccess && (
            <ModalFooter>
              <FooterButton type="button" className="primary" onClick={closeModal}>
                CLOSE
              </FooterButton>
            </ModalFooter>
          )}
        </form>
      </ModalCard>
    </ModalOverlay>
  );
};

export default NewBookingModal;
