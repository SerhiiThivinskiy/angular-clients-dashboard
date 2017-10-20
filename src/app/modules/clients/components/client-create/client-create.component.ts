import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../../services/clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../../models/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {
  form: FormGroup;
  isFailedCreate = false;
  client: Client = {
    name: '',
    email: '',
    address: '',
    phone: '',
    gender: 'male',
    birthYear: undefined,
    birthMonth: undefined,
    birthDay: undefined
  };

  constructor(private clientsService: ClientsService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  createClient() {
    this.isFailedCreate = false;
    console.log(this.client);
    this.validateForm();
    if (this.form.valid) {
      this.clientsService.createClient(this.client).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/clients']);
        },
        (error) => {
          console.log(error);
          this.isFailedCreate = true;
        }
      );
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.client.name, Validators.required],
      email: [this.client.email, Validators.required],
      address: [this.client.address, Validators.required],
      phone: [this.client.phone, Validators.required],
      gender: [this.client.gender],
      birthYear: [this.client.birthYear, Validators.required],
      birthMonth: [this.client.birthMonth, Validators.required],
      birthDay: [this.client.birthDay, Validators.required],
    });
    this.form.valueChanges
      .subscribe(data => this.checkForErrors());
  }

  checkForErrors() {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        this.formErrors[field] = messages[Object.keys(control.errors)[0]];
      }
    }
  }

  validateForm() {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.form.get(field);
      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        this.formErrors[field] = messages[Object.keys(control.errors)[0]];
      }
    }
  }

  formErrors = {
    name: '',
    email: '',
    address: '',
    phone: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  };

  validationMessages = {
    name: {
      required: 'Name can not be empty'
    },
    email: {
      required: 'Email can not be empty'
    },
    address: {
      required: 'Address can not be empty'
    },
    phone: {
      required: 'Phone can not be empty'
    },
    birthYear: {
      required: 'Year can not be empty'
    },
    birthMonth: {
      required: 'Month can not be empty'
    },
    birthDay: {
      required: 'Day can not be empty'
    }
  };

}
