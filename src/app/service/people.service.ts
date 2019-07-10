import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EMPTY,  Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) {
  }

  readAllContacts(): Observable<IPeopleResponse> {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
     window.location.replace('https://accounts.google.com/o/oauth2/v2/auth?client_id=509055025449-nhgv2hr6jis5sm5qj88li6rbtor6epim.apps.googleusercontent.com&response_type=token&scope=https://www.googleapis.com/auth/contacts.readonly&state=OAuth2ContactViewer&redirect_uri=http://localhost:4200');
      return EMPTY;
    } else {
      return this.http.get<IPeopleResponse>('https://people.googleapis.com/v1/people/me/connections?personFields=names,phoneNumbers',{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      });
    }
  }
}

interface IPeopleResponse{
  connections: [{
    names: [{
      displayName: string
    }],
    phoneNumbers: [
      {
        value: string
      }
      ]
  }]
}
