import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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

   handleError(error : HttpErrorResponse, message: string){
      if(error.status==500 || error.status==0){
          message="impossible de communiquer avec le serveur."
      } 
   }
  
}
