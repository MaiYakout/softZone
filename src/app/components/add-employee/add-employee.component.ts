import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Employees } from 'src/app/models/Employees.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  employee!: Employees;
  success: boolean = false;
  error: boolean = false;
  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^01[012][0-9].{7}$'),
      ]),
    });
  }
  get f() {
    return this.addEmployeeForm.controls;
  }
  onSubmit() {
    this.employee = {
      empName: this.addEmployeeForm.value.name,
      empAddress: this.addEmployeeForm.value.address,
      empEmail: this.addEmployeeForm.value.email,
      empPhone: this.addEmployeeForm.value.phone,
    };
    this.addEmployeeForm.disable();

    this.httpService.addEmployee(this.employee).subscribe((data) => {
      this.addEmployeeForm.enable();
      window.location.reload();
    });
  }
}
