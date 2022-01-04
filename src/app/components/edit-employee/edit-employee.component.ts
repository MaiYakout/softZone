import { Component, Inject, OnInit } from '@angular/core';
import { EmployeesComponent } from '../employees/employees.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Employees } from 'src/app/models/Employees.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  reveivedData: Employees;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    public dialogRef: MatDialogRef<EmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reveivedData = data;
    // console.log(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  editEmployeeForm!: FormGroup;

  ngOnInit(): void {
    this.editEmployeeForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^01[012][0-9].{7}$'),
      ]),
    });
    console.log(this.reveivedData);
    this.editEmployeeForm.patchValue({
      name: this.reveivedData.empName,
      id: this.reveivedData.empId,
      email: this.reveivedData.empEmail,
      address: this.reveivedData.empAddress,
      phone: this.reveivedData.empPhone,
    });
  }
  get f() {
    return this.editEmployeeForm.controls;
  }
  onSubmit() {
    const employee: Employees = {
      empId: this.reveivedData.empId,
      empName: this.editEmployeeForm.value.name,
      empAddress: this.editEmployeeForm.value.address,
      empEmail: this.editEmployeeForm.value.email,
      empPhone: this.editEmployeeForm.value.phone,
    };
    this.editEmployeeForm.disable();

    this.httpService.editEmployee(employee).subscribe((data) => {
      this.editEmployeeForm.enable();
      window.location.reload();
    });
  }
}
