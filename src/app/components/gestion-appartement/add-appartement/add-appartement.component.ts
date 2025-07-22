import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HaitiGeoData } from 'src/app/models/haiti-geo-data';

@Component({
  selector: 'app-add-appartement',
  templateUrl: './add-appartement.component.html',
  styleUrls: ['./add-appartement.component.scss']
})
export class AddAppartementComponent {
    departements = HaitiGeoData.DEPARTEMENTS;
    selectedDepartement: string = '';
    selectedCommune: string = '';
    filteredCommunes: string[] = [];

    appForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire avec des contrôles
    this.appForm = this.fb.group({
       description: ['', Validators.required],
       prix: ['', Validators.required],
       devise: ['', Validators.required],
       username:['', Validators.required],
       numero: ['', Validators.required],
       rue: ['', Validators.required],
       commune: ['', Validators.required],
       departement: ['', Validators.required],
       pays: ['', Validators.required] ,
    });
  }

  addAppartement() {
    this.appForm.value.username=sessionStorage.getItem("username")
    this.appForm.value.pays="Haiti";
    console.log(this.appForm.value);
  }

  onDepartementChange() {
    const selectedDep = this.departements.find(dep => dep.name === this.selectedDepartement);
    this.filteredCommunes = selectedDep ? selectedDep.communes.sort() : [];
    this.selectedCommune = ''; // Reset commune
  }
}
