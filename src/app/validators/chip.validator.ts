import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';

export class CustomValidators {

  static validateKeywords(c: FormControl) {
    const ALPHA_ONLY_REGEXP = /^[A-Za-z0-9\-]+$/;
    let inValid = null;
    c.value.forEach((item) => {
      if (!ALPHA_ONLY_REGEXP.test(item)) {
        inValid = {word: true};
      }
    });
    return inValid;
  }

}

export const validateKeywordRequired: ValidatorFn = (f: FormGroup) => {
  if (f.get('keywords').value.length === 0 && f.get('scrapeType').value === 'keywords') {
    return { keyword: true };
  } else {
    return null;
  }
};
