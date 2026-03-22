// Validation regex patterns
export const VALIDATION_PATTERNS = {
  email: /^[A-Z0-9._%+-]+@gmail\.com$/i,
  loginIdentifier: /^(?:[A-Z0-9._%+-]+@gmail\.com|[0-9]{10})$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^[0-9]{10}$/,
  name: /^[a-zA-Z\s]{2,50}$/,
};

// Validation messages
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid Gmail address',
  loginIdentifier: 'Please enter your Gmail address or 10-digit mobile number',
  password: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character',
  phone: 'Please enter a valid 10-digit phone number',
  name: 'Please enter a valid name (2-50 characters)',
  minLength: (min) => `Minimum ${min} characters required`,
  maxLength: (max) => `Maximum ${max} characters allowed`,
};

// React Hook Form validation rules
export const FORM_RULES = {
  email: {
    required: VALIDATION_MESSAGES.required,
    pattern: {
      value: VALIDATION_PATTERNS.email,
      message: VALIDATION_MESSAGES.email,
    },
  },
  loginIdentifier: {
    required: VALIDATION_MESSAGES.required,
    pattern: {
      value: VALIDATION_PATTERNS.loginIdentifier,
      message: VALIDATION_MESSAGES.loginIdentifier,
    },
  },
  password: {
    required: VALIDATION_MESSAGES.required,
    pattern: {
      value: VALIDATION_PATTERNS.password,
      message: VALIDATION_MESSAGES.password,
    },
  },
  phone: {
    required: VALIDATION_MESSAGES.required,
    pattern: {
      value: VALIDATION_PATTERNS.phone,
      message: VALIDATION_MESSAGES.phone,
    },
  },
  name: {
    required: VALIDATION_MESSAGES.required,
    pattern: {
      value: VALIDATION_PATTERNS.name,
      message: VALIDATION_MESSAGES.name,
    },
  },
  required: {
    required: VALIDATION_MESSAGES.required,
  },
};
