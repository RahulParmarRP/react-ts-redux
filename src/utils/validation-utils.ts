export default class ValidationUtils {
  
  isValidEmail(email: string) {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
  }

  isValidPassword(password: string) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,24})/;
    return pattern.test(password);
  }
}
