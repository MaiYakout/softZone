import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from '../models/Employees.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://task.soft-zone.net';

  getAllEmployees() {
    return this.http.get<Employees[]>(
      `${this.baseUrl}/api/Employees/GetAllEmployees`
    );
  }
  getEmployeeById(emp_id: number) {
    return this.http.get<Employees>(
      `${this.baseUrl}/api/Employees/getEmpByID/${emp_id}`
    );
  }
  addEmployee(employee: Employees) {
    return this.http.post(
      `${this.baseUrl}/api/Employees/addEmployee`,
      employee
    );
  }
  editEmployee(employee: Employees) {
    return this.http.post(
      `${this.baseUrl}/api/Employees/editEmployee`,
      employee
    );
  }
  deleteEmployee(emp_id: number) {
    return this.http.get(
      `${this.baseUrl}/api/Employees/deleteEmpByID/${emp_id}`
    );
  }
}
