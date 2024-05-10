import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  getItem(key: string) {
    const dataStorage = localStorage.getItem(key);
    if (dataStorage) {
      return JSON.parse(dataStorage)
    } else {
      return null;
    }
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
