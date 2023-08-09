import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  public env = environment;

  private fb: FormBuilder = inject(FormBuilder);
  public contactForm = this.fb.group({
    name: ['', [Validators.minLength(3), this.noNumbersValidator, Validators.required]],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  sendForm() {

  }

  private noNumbersValidator(control: AbstractControl) {
    const value = control.value;
    if (/\d/.test(value)) {
      return { noNumbers: true }
    }
    return null
  }
}
