import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';


@Injectable({
  providedIn: 'root'
})
export class WorkforceService {

  constructor(private webReqService : WebRequestService) { }

  getList() {
    return this.webReqService.get('ideal');
  }

  createList(title: string) {
    return this.webReqService.post('ideal', { title });
  }

  deleteList(ids) {
  return this.webReqService.delete('ideal', ids);
  }
}

