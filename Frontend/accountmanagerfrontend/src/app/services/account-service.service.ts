import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Account } from '../interface/account';
import { AccountListComponent } from '../components/account/account-list/account-list.component';
import { Deposit } from '../interface/deposit';

@Injectable({
  providedIn: 'root'
})


export class AccountService {

  private urlBase: string= environment.endPoint;
  private apiUrl: string = '/accounts/';
  constructor(private http: HttpClient) {


  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.urlBase}${this.apiUrl}`);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.urlBase}${this.apiUrl}${id}`);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}${this.apiUrl}${id}`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.urlBase}${this.apiUrl}`, account);
  }

  updateAccount(id: number, account: Account): Observable<void> {
    return this.http.put<void>(`${this.urlBase}${this.apiUrl}${id}`, account);
  }

  depositMoney(id: number, balance:number): Observable<Deposit> {
    const url = `${this.urlBase}${this.apiUrl}deposit/${id}?balance=${balance}`;
    return this.http.put<Deposit>(url, {balance} );
  }

  withdrawMoney(id: number, money: number): Observable<Deposit> {
    const url = `${this.urlBase}${this.apiUrl}withdraw/${id}?balance=${money}`;
    return this.http.put<Deposit>(url, { money });
  }












}
