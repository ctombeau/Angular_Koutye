import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

export interface Courtier {
  photo: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
}

const ELEMENT_DATA: Courtier[] = [
  {photo: "1", nom: 'TOMBEAU', prenom: "Chrisnor", email: 'tombeauc@gmail.com',phone:"38051274"},
  {photo: "2", nom: 'JEAN', prenom: "Edma Sherley", email: 'jeanedmasherley@gmail.com',phone:"49093578"},
  {photo: "3", nom: 'TOMBEAU', prenom: "Shedmaer Chrisley", email: 'tchrisley@gmail.com',phone:"31065231"},
  {photo: "4", nom: 'TOMBEAU', prenom: "Chrisnailove", email: 'tlove@gmail.com',phone:"42082521"}
  
];

@Component({
  selector: 'app-courtier',
  templateUrl: './courtier.component.html',
  styleUrls: ['./courtier.component.scss']
})
export class CourtierComponent implements OnInit{

   username: string | null= sessionStorage.getItem("username");

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.attachUser();
  }

  courtierForm = new FormGroup({
    email : new FormControl("",[
       Validators.required,
    ]),
    
})

attachUser()
{
    this.userService.getAttachUsers(this.username?? "").subscribe();
}
     
  displayedColumns: string[] = ['photo','nom', 'prenom', 'email','phone'];
  dataSource = ELEMENT_DATA;
}
