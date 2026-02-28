/**
 * Sanitize user input to prevent XSS attacks.
 * Strips HTML tags and dangerous characters from form inputs.
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return '';

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

/**
 * Validate email format.
 */
export function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format (international).
 */
export function isValidPhone(phone) {
    const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;
    return phoneRegex.test(phone);
}

/**
 * Rate limiter for form submissions (prevents spam).
 */
export function createRateLimiter(maxAttempts = 3, windowMs = 60000) {
    const attempts = [];

    return function canSubmit() {
        const now = Date.now();
        const recentAttempts = attempts.filter(time => now - time < windowMs);

        if (recentAttempts.length >= maxAttempts) {
            return false;
        }

        attempts.push(now);
        return true;
    };
}
