import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Dados salvos com a chave "${key}" no localStorage.`);
  }

  retrieveData(key: string) {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log(`Dados recuperados da chave "${key}":`, parsedData);
      return parsedData;
    } else {
      console.log(`Nenhum dado encontrado para a chave "${key}" no localStorage.`);
      return null;
    }
  }
}
