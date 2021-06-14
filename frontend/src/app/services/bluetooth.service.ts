import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'battery_level';
  static GATT_PRIMARY_SERVICE = 'battery_service';

  constructor(public ble: BluetoothCore) { }

  //Return the connected device
  getDevice() {
    return this.ble.getDevice$();
  }

  //Returns a stream of values emitted by the device for a given characteristic
  stream() {
    return this.ble.streamValues$().pipe(
      map((value: DataView) => value.getInt8(0))
    );
  }

  discover(){
    return this.ble.discover$({
      acceptAllDevices: true
    });
  }

  disconnectDevice() {
    this.ble.disconnectDevice();
  }

  value() {
    console.log('Getting Battery level...');

    return this.ble.value$({
      service: 'battery_service',
      characteristic: 'battery_level'
    });
  }

}
