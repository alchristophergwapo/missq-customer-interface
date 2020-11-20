import { Injectable } from '@angular/core';
import { Nanny } from "../../models/nanny";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class NannyService {

  public user: Observable<any>;
  AUTH_SERVER_ADDRESS: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  // post(nanny: Nanny): Observable<any> {

  // }
}
