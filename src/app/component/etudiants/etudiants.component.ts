import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { Etudiant } from '../../../models/etudiant';
import { EtudiantServiceService } from '../../services/etudiant-service.service';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-etudiants',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent implements OnInit{

  constructor(private etudiantServices: EtudiantServiceService){}
  
  etudiants: Etudiant[] = [];

  successMessage : string | null = null;
  erreurMessage : string | null = null;

  newEtudiant : Etudiant = {
    id : 0, 
    code : '', 
    nom : '', 
    prenom:'', 
    age: 0, 
    telephone : 0,
  };

  showEtudiant : Etudiant | null = {
    id : 0, 
    code : '', 
    nom : '', 
    prenom:'', 
    age: 0, 
    telephone : 0,
  };

  ngOnInit(): void {
    this.listEtudiants();
  }

  listEtudiants(){
    this.etudiantServices.getEtudiants().subscribe((data) =>{
      this.etudiants = data;      
    });
  }


  openModal(id: number, code: string, nom: string, prenom: string, age: number, telephone: number ) {
    const modal = document.getElementById('etudiantModal');
    if (modal) modal.classList.add('show');
  }


  ajouterEtudiant() {
    this.etudiantServices.ajouterEtudiant(this.newEtudiant).subscribe({
      next:() =>{
        this.listEtudiants();
        this.newEtudiant = {id: null, code: '', nom: '', prenom: '', age: 0, telephone: 0 };
        this.successMessage = "Etudiant ajouter avec succes !";  
        window.location.reload()
      },
      error :(err) => {
          this.erreurMessage = "Echec de l'ajout " + err;
      },
    });
  }

  modifierEtudiant(id: number | null, etudiant: Etudiant | null){
    if (id && etudiant) {    
      this.etudiantServices.modifierrEtudiant(id, etudiant).subscribe({
        next:() =>{
          this.successMessage = "Etudiant Modifier avec succes !";
          window.location.reload();
        },
        error :(err) => {
            this.erreurMessage = "Echec de la modification " + err;
        },
      })
    }
  }

  detailEtudiant(id?: number|null){
    if (id) {
      this.etudiantServices.getEtudiantById(id).subscribe({
        next:(value) =>{
            this.showEtudiant = value;
        },
      })
    }
  }

  supprimerEtudiant(id?: number|null) {
    if (id) {
      this.etudiantServices.supprimerEtudiant(id).subscribe({
        next:() =>{
          this.listEtudiants();
          this.successMessage = "Etudiant Modifier avec succes !"
        },
        error :(err) => {
            this.erreurMessage = "Echec de la modification " + err;
        },
      });
    }
  }





}
