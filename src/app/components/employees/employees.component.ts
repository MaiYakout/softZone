import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Employees } from 'src/app/models/Employees.model';
import { HttpService } from 'src/app/services/http.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  productDialog: boolean = false;

  employees!: Employees[];

  employee!: Employees;

  selectedEmployees: Employees[] = [];

  submitted: boolean = false;
  emplyeeLength: number = 0;
  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.httpService.getAllEmployees().subscribe((data) => {
      this.employees = data;
      this.emplyeeLength = this.employees.length;
    });
  }
  ref!: DynamicDialogRef;
  /*Add Employee */
  addEmployee() {
    this.ref = this.dialogService.open(AddEmployeeComponent, {
      header: 'Add New Employee',
      contentStyle: { 'max-height': '600px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {},
    });

    this.ref.onClose.subscribe((employee: Employees) => {
      if (employee) {
        this.messageService.add({
          severity: 'info',
          summary: 'Product Selected',
          detail: employee.empName,
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  /*Delete Employee */
  deleteEmployee(empId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this employee?',
      accept: () => {
        this.httpService.deleteEmployee(empId).subscribe((data) => {
          window.location.reload();
        });
      },
    });
  }
  /*Edit Employee */
  editEmployee(employee: Employees) {
    const ref = this.dialog.open(EditEmployeeComponent, {
      width: '500px',
      data: {
        empName: employee.empName,
        empAddress: employee.empAddress,
        empId: employee.empId,
        empPhone: employee.empPhone,
        empEmail: employee.empEmail,
      },
    });
  }
}
