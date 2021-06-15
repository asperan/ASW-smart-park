import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return '<div>' + data[0] + '</div>' +
           '<div>Parcheggi: ' + data[1] + '/' + data[2] + '</div><br>' +
           '<div>Lun-Ven: ' + data[3] + '</div>' +
           '<div>' + data[4] + '</div><br>' +
           '<div>Sab-Dom: ' + data[5] + '</div>' +
           '<div>' + data[6] + '</div>'
    ;
  }
}
