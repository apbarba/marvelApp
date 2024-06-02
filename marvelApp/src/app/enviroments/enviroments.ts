// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as CryptoJS from 'crypto-js';



export const environment = {
    production: false,
    marvelUrl: 'https://gateway.marvel.com:443/v1/public/',
    marvelKeyPublic: '159103821392056e08f70aefbc6c0b2c', // Api key personal pública nuestra de la páguina para hacer las peticiones
    marvelKeyPrivate: '99714158a4c06b0945a323bc9154f7a3b2acc273', //Api key personal privada que nos ha generado al iniciar sesion
    getAuthParams() {
      const timestamp = new Date().getTime();
      const toBeHashed = `${timestamp}${this.marvelKeyPrivate}${this.marvelKeyPublic}`;
      const hash = CryptoJS.MD5(toBeHashed).toString();
      return {
        ts: timestamp,
        apikey: this.marvelKeyPublic,
        hash: hash
      };
    }
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.