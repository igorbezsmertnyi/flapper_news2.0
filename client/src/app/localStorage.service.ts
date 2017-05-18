import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorage {

  setData(data, key) {
    return localStorage.setItem(key, JSON.stringify({data: data})) || false
  }

  getData(key) {
    return JSON.parse(localStorage.getItem(key)) || false
  }

  removeData(key) {
    return localStorage.removeItem(key) || false
  }
}
