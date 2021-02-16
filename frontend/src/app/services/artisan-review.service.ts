import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtisanReviewService {

  ARTISAN_REVIEW_ADDRESS: string = 'http://18.191.237.185:8080/';

  constructor(
    private httpClient: HttpClient
  ) {}

  review(id, data): Observable<any> {
    return this.httpClient.post(`${this.ARTISAN_REVIEW_ADDRESS}reviews/rate_artisan/${id}`, data)
  }

  banArtisan(id): Observable<any> {
    return this.httpClient.post(`${this.ARTISAN_REVIEW_ADDRESS}reviews/ban_artisan/${id}`, {})
  }

  tagAsSuki(id): Observable<any> {
    return this.httpClient.post(`${this.ARTISAN_REVIEW_ADDRESS}reviews/tag_suki${id}`, {})
  }
}
