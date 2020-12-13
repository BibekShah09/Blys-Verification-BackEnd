class CodeService {
  private readonly numberOfDigitRequired: number;
  private readonly restrictedLastDigit: number;

  constructor() {
    this.numberOfDigitRequired = 6;
    this.restrictedLastDigit = 7;
  }

  public verify(token: number) {
    const numberOfDigits = token.toString().length;
    const lastDigit = token % 10;

    if (numberOfDigits === this.numberOfDigitRequired && lastDigit !== this.restrictedLastDigit) {
      return {
        isValid: true,
        message: 'Verification Successful!',
      };
    }

    return {
      isValid: false,
      message: 'Verification Error!',
    };
  }
}

export default CodeService;
