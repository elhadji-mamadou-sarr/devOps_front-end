import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../../models/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantServiceService {

  private apiUrl = 'http://127.0.0.1:8080/api/v1/etudiants';

  constructor(private http: HttpClient) { }

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  
  ajouterEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Etudiant>(this.apiUrl, etudiant, {headers});
  }

  modifierrEtudiant(id: number, etudiant: Etudiant): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, etudiant, {headers});
  }

  getEtudiantById(id: number): Observable<Etudiant> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Etudiant>(url);
  }


  supprimerEtudiant(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }


}
