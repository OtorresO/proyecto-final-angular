import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  get(key: string) {
    const dataStorage = localStorage.getItem(key);
    if (dataStorage) {
      return JSON.parse(dataStorage)
    } else {
      return null;
    }
  }

  set(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  destroySession(key:string){
    if(this.get(key)){
      localStorage.removeItem(key)
    }
  }
  



}
