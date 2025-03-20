import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AdressResponse } from '../interfaces/address-info.interface';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressValidationService {

}
