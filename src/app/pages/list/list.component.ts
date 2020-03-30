import { Component, OnInit } from '@angular/core';

import { FaceApiService } from '../../services/face-api.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  people: Person[];

  constructor(
    private apiService: FaceApiService,
  ) { }

  ngOnInit() {
    this.apiService.getPeople().subscribe(
      people => {
        this.people = people
        console.log(people)
      }     
    );    
  }

  delete(id: string) {
    console.log('deleting ' + id + '...');

    this.apiService.deletePerson(id).subscribe(
      res => {
        console.log('delete done');
        const elm = document.getElementById(id);
        elm.className = 'hide';        
      },
      err =>{
        console.log('HTTP Error', err)
      },
      () => console.log('HTTP request completed.')
      );
    }
}
