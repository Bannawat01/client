import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export const PasswordValidator = (minLength: number, maxLength: number): ValidatorFn => { //return function to function
    return function (control: AbstractControl): ValidationErrors | null {
        const password = control.value as string
        if (!password) { //if password is empty
            return { required: true } //return required
        } else if (password.length < minLength) {
            return { invalidMinLength: true }
        } else if (password.length > maxLength) {
            return { invalidMaxLength: true }
        } else if (!/[a-z]/.test(password)) {
            return { invalidLowerCase: true }
        } else if (!/[A-Z]/.test(password)) {
            return { invalidUpperCase: true }
        } else if (!/[0-9]/.test(password)) {
            return { invalidNumberic: true }
        } else if (!/[!@#$%^*&(),.?":{}|<>]/.test(password)) {
            return { invalidSpecialChar: true }
        }
        return null
    }
}