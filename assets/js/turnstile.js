// Validate Turnstile CAPTCHA before form submission
function validateTurnstile() {
    const turnstileResponse = document.querySelector('textarea[name="cf-turnstile-response"]');
    if (!turnstileResponse || !turnstileResponse.value) {
        alert('Please complete the CAPTCHA to proceed.');
        return false;
    }
    return true;
}
