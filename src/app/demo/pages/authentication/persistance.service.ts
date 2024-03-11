import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  constructor() { }

  set(key: string, data: string): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('Error saving to localStorage', e);
    }
  }
  get(key: string): string | null {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (e) {
      console.log('Error getting data from localStorage', e);
      return null;
    }
  }
  // getFirstName(key: string): string | null {
  //   return localStorage.getItem(key);
  // }
}
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PersistanceService {

//   constructor() { }

//   set(key: string, data: any): void {
//     try {
//       localStorage.setItem(key, JSON.stringify(data));
//     } catch (e) {
//       console.log('Error saving to localStorage', e);
//     }
//   }

//   get(key: string): any | null {
//     try {
//       const localStorageItem = localStorage.getItem(key);
//       return localStorageItem ? JSON.parse(localStorageItem) : null;
//     } catch (e) {
//       console.log('Error getting data from localStorage', e);
//       return null;
//     }
//   }
// }

