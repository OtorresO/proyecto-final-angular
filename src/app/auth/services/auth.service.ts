import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
      console.log('pasa por aqui')
      localStorage.removeItem(key)
    }
  }



}
