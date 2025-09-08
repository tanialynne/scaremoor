export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface NewsletterSignupData {
  email: string;
  source?: string;
  timestamp?: string;
}

// Email validation with more comprehensive checks
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
    return { isValid: false, errors };
  }
  
  const trimmedEmail = email.trim();
  
  if (trimmedEmail.length === 0) {
    errors.push('Email cannot be empty');
  }
  
  if (trimmedEmail.length > 254) {
    errors.push('Email is too long');
  }
  
  // Basic email regex - more comprehensive than before
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    errors.push('Please enter a valid email address');
  }
  
  // Check for common malicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(trimmedEmail)) {
      errors.push('Invalid email format');
      break;
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

// Name validation
export function validateName(name: string): ValidationResult {
  const errors: string[] = [];
  
  if (!name || typeof name !== 'string') {
    errors.push('Name is required');
    return { isValid: false, errors };
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length === 0) {
    errors.push('Name cannot be empty');
  }
  
  if (trimmedName.length > 100) {
    errors.push('Name is too long (maximum 100 characters)');
  }
  
  // Check for malicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<.*>/,
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(trimmedName)) {
      errors.push('Invalid characters in name');
      break;
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

// Message validation
export function validateMessage(message: string): ValidationResult {
  const errors: string[] = [];
  
  if (!message || typeof message !== 'string') {
    errors.push('Message is required');
    return { isValid: false, errors };
  }
  
  const trimmedMessage = message.trim();
  
  if (trimmedMessage.length === 0) {
    errors.push('Message cannot be empty');
  }
  
  if (trimmedMessage.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  if (trimmedMessage.length > 5000) {
    errors.push('Message is too long (maximum 5000 characters)');
  }
  
  // Check for spam patterns
  const spamPatterns = [
    /\b(buy now|click here|limited time|act now)\b/gi,
    /\b(viagra|casino|lottery|winner)\b/gi,
    /(https?:\/\/[^\s]+){3,}/gi, // Multiple URLs might be spam
  ];
  
  let spamScore = 0;
  for (const pattern of spamPatterns) {
    if (pattern.test(trimmedMessage)) {
      spamScore++;
    }
  }
  
  if (spamScore > 1) {
    errors.push('Message appears to be spam');
  }
  
  // Check for malicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(trimmedMessage)) {
      errors.push('Invalid content in message');
      break;
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

// Contact form validation
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: string[] = [];
  
  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) {
    errors.push(...nameValidation.errors);
  }
  
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }
  
  const messageValidation = validateMessage(data.message);
  if (!messageValidation.isValid) {
    errors.push(...messageValidation.errors);
  }
  
  return { isValid: errors.length === 0, errors };
}

// Newsletter signup validation
export function validateNewsletterSignup(data: NewsletterSignupData): ValidationResult {
  const errors: string[] = [];
  
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }
  
  // Validate source if provided
  if (data.source && typeof data.source === 'string' && data.source.length > 100) {
    errors.push('Invalid source parameter');
  }
  
  return { isValid: errors.length === 0, errors };
}