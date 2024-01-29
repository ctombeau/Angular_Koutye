import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  showSpinner: boolean = false;
  constructor() { }

   loadData()
   {
      this.showSpinner = true;
   }
}
