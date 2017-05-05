import { FormControl } from '@angular/forms';

export function validateEmail(c: FormControl) {
  let EMAIL_REGEXP = /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/

  return EMAIL_REGEXP.test(c.value) ? null : {
    validateEmail: {
      valid: false
    }
  }
}
