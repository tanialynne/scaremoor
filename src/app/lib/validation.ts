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

// Calculate entropy of a string (helps detect random bot strings)
function calculateEntropy(str: string): number {
  const len = str.length;
  if (len === 0) return 0;

  const freq: Record<string, number> = {};
  for (const char of str.toLowerCase()) {
    freq[char] = (freq[char] || 0) + 1;
  }

  let entropy = 0;
  for (const char in freq) {
    const p = freq[char] / len;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

// Detect bot-like names (random strings, missing vowels, etc.)
export function detectBotName(name: string): { isBot: boolean; reason?: string } {
  const trimmed = name.trim();

  // Too long for a real name (bots often use long random strings)
  if (trimmed.length > 30) {
    return { isBot: true, reason: 'Name suspiciously long' };
  }

  // Check for random alphanumeric strings (high entropy + mixed case + no spaces)
  const hasNoSpaces = !trimmed.includes(' ');
  const hasMixedCase = /[a-z]/.test(trimmed) && /[A-Z]/.test(trimmed);
  const hasDigits = /\d/.test(trimmed);
  const entropy = calculateEntropy(trimmed);

  // High entropy random strings (like "ntYuRwnLixRxZOUfQDfYJqN")
  if (trimmed.length > 10 && entropy > 3.5 && hasNoSpaces) {
    return { isBot: true, reason: 'Name appears to be random characters' };
  }

  // Mixed case with digits and no spaces (like "xK7mNpQ2")
  if (hasMixedCase && hasDigits && hasNoSpaces && trimmed.length > 6) {
    return { isBot: true, reason: 'Name contains suspicious pattern' };
  }

  // No vowels at all (very unusual for real names)
  const vowelCount = (trimmed.match(/[aeiouAEIOU]/g) || []).length;
  if (trimmed.length > 5 && vowelCount === 0) {
    return { isBot: true, reason: 'Name missing vowels' };
  }

  // Very low vowel ratio for length (real names typically have ~30-40% vowels)
  const vowelRatio = vowelCount / trimmed.length;
  if (trimmed.length > 8 && vowelRatio < 0.1) {
    return { isBot: true, reason: 'Name has unusual character distribution' };
  }

  // Check for keyboard smash patterns (consecutive keys)
  const keyboardPatterns = /(?:qwert|asdf|zxcv|uiop|hjkl|bnm)/i;
  if (keyboardPatterns.test(trimmed)) {
    return { isBot: true, reason: 'Name appears to be keyboard smash' };
  }

  // Check for repeated character patterns (like "aaaa" or "abcabc")
  if (/(.)\1{3,}/.test(trimmed)) {
    return { isBot: true, reason: 'Name has repeated characters' };
  }

  return { isBot: false };
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

  // Bot detection
  const botCheck = detectBotName(trimmedName);
  if (botCheck.isBot) {
    errors.push(botCheck.reason || 'Invalid name');
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

// Honeypot validation - returns true if honeypot was filled (bot detected)
export function isHoneypotFilled(honeypotValue: string | undefined | null): boolean {
  return !!honeypotValue && honeypotValue.trim().length > 0;
}

// Timestamp validation - returns true if form was submitted too fast (bot detected)
// Minimum time in milliseconds that a human would need to fill the form
export function isSubmittedTooFast(formLoadTimestamp: number | undefined | null, minTimeMs: number = 2000): boolean {
  if (!formLoadTimestamp || typeof formLoadTimestamp !== 'number') {
    // If no timestamp, be cautious but don't block
    return false;
  }

  const now = Date.now();
  const timeTaken = now - formLoadTimestamp;

  // If form was filled in less than minTimeMs, it's likely a bot
  return timeTaken < minTimeMs;
}

// Lead magnet form validation (for /api/join endpoint)
export interface LeadMagnetFormData {
  first_name: string;
  email_address: string;
  honeypot?: string;
  formLoadedAt?: number;
  referrer?: string;
}

export function validateLeadMagnetForm(data: LeadMagnetFormData): ValidationResult {
  const errors: string[] = [];

  // Check honeypot first (silent rejection for bots)
  if (isHoneypotFilled(data.honeypot)) {
    // Return generic error to not reveal honeypot detection
    return { isValid: false, errors: ['Unable to process request'] };
  }

  // Check if form was submitted too fast
  if (isSubmittedTooFast(data.formLoadedAt, 2000)) {
    return { isValid: false, errors: ['Please wait a moment before submitting'] };
  }

  // Validate email
  const emailValidation = validateEmail(data.email_address);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }

  // Validate name
  const nameValidation = validateName(data.first_name);
  if (!nameValidation.isValid) {
    errors.push(...nameValidation.errors);
  }

  return { isValid: errors.length === 0, errors };
}