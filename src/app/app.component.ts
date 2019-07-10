import {Component, OnInit} from '@angular/core';
import {PeopleService} from "./service/people.service";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  contactList: Array<{name: string, number: string}> = [];

  constructor(private route: ActivatedRoute, private peopleService: PeopleService) {
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(value => {
      try{
        const accessToken = value.split('&').find(value => {
          return value.startsWith('access_token');
        }).split('=')[1];
        sessionStorage.setItem('access_token', accessToken);
        this.loadAllContacts();
      }catch (e) {
        // do nothing
      }
    });
  }

  loadAllContacts(): void {
    this.peopleService.readAllContacts().subscribe(value => {
      this.contactList = [];
      value.connections.forEach((value1, index) => {
        this.contactList.push({
          name: value1.names[0].displayName,
          number: value1.phoneNumbers[0].value
        });
      })
    });


  }



}
