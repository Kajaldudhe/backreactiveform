import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
   
  
  http: any;
  private httpObj: any = {
    type: '',
    url: '',
    options: Object
  };
  // Define API
  userObj: any;
  baseURL: string = "https://awseauction-master.mahamining.com/master/";
  
  constructor(private httpclient:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getHttp(): any {
    return this.httpclient.request(this.httpObj.type, this.httpObj.url, this.httpObj.options);
  }

  setHttp(_type: string, _url: string,) {
    this.httpObj.type = _type;
    this.httpObj.url = this.baseURL + _url; 
        } 
        
  bindProject() {
        return this.httpclient
          .get(
            'https://awseauction-master.mahamining.com/master/project/GetAll'
          )
      }
      bindUserType() {
        return this.httpclient
          .get(
            'https://awseauction-master.mahamining.com/master/user-type/getAll'

          )
      }
      bindSubUser(_user:any,_data:any) {
        return this.httpclient
          .get(
            ' https://awseauction-master.mahamining.com/master/subusertype/GetAllByUserTypeId?UserTypeId='+ _user +'&ProjectId=' +_data
          )
      }
      bindRole(_subuser:any,_key:any){
        return this.httpclient
        .get(
          
          'https://awseauction-master.mahamining.com/master/user-role/GetAll?UserTypeId1&ProjectId='+ _subuser +'&ProjectId=' +_key
        )
      } 
      getList(){
        return this.httpclient
        .get(
          'https://awseauction-master.mahamining.com/master/user-registration/GetAll'

        )
      }

      postSubmit(data: any){
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          });
        return this.httpclient
        .post(
          'https://awseauction-master.mahamining.com/master/user-registration',  JSON.stringify(data),{ headers: headers}

        )
      }
      onUpdate(data: any){
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          });
        return this.httpclient
        .put(
          'https://awseauction-master.mahamining.com/master/user-registration',  JSON.stringify(data),{ headers: headers}

        )
      } 
      bindDesignation(){
        return this.httpclient
        .get(
          'https://awseauction-master.mahamining.com/master/designation/GetAll'


        )
      }
      handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
          return errorMessage;
        });
      }
    }



