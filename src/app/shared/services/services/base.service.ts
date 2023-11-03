import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rgb } from 'd3-color';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login001mb } from '../restcontroller/entities/Login001mb';
import { CalloutService } from './callout.service';
import { DataSharedService } from './datashared.service';

@Injectable()
export class BaseService {
    // private objectSource = new BehaviorSubject<Object>(Object);
    // private isLoadIcon = new BehaviorSubject<boolean>(false);
    // private isSideNavShow = new BehaviorSubject<boolean>(false);

    // currentMenuObject = this.objectSource.asObservable();
    // currentLoaderObject = this.isLoadIcon.asObservable();
    // currentSideNavObject = this.isSideNavShow.asObservable();

    public currentUserSubject = new BehaviorSubject<Object>(Object);
    currentUser = this.currentUserSubject.asObservable();

    public static readonly REQUEST_REDIRECT: number = 302;
    public static readonly SC_UNAUTHORIZED: number = 401;
    public static readonly SC_NOT_FOUND: number = 404;
    public static readonly SC_INTERNAL_SERVER_ERROR: number = 500;
    public static readonly SC_SERVICE_UNAVAILABLE: number = 503;
    public static readonly SC_BAD_REQUEST: number = 400;

    constructor(
        public router: Router,
        public httpClient: HttpClient,
        private calloutService: CalloutService,
        public dataSharedService: DataSharedService,
        public baseService: BaseService
    ) {}

    ngOnInit() {
        let userJson: any = sessionStorage.getItem('currentUser');

        this.currentUser =
            userJson !== null ? JSON.parse(userJson) : new Login001mb();
        this.currentUserSubject = new BehaviorSubject<any>(this.currentUser);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    protected postCallService(
        url: string,
        parameters: Object = {},
        body: Object = {}
    ) {
        this.dataSharedService.isShowsLoaderIcon(true);
        let httpHeader = new HttpHeaders();
        httpHeader.set('Access-Control-Allow-Origin', '*');
        httpHeader.append('Content-Type', 'application/json');
        return new Observable<any>((observer) => {
            this.httpClient
                .post(url, this.getRequestBody(body, true), {
                    headers: httpHeader,
                    params: this.getURLSearchParams(parameters, true),
                    responseType: 'json',
                })
                .pipe(
                    map((res: any) => this.extractDataForValidate(res, url)),
                    catchError((e: any) => this.handleError(e, url))
                )
                .subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
        });
    }

    protected postCallService1(
        url: string,
        parameters: Object = {},
        body: Object = {}
    ) {
        this.dataSharedService.isShowsLoaderIcon(true);
        let httpHeader = new HttpHeaders();
        httpHeader.set('Access-Control-Allow-Origin', '*');
        httpHeader.append('Content-Type', '');
        return new Observable<any>((observer) => {
            this.httpClient
                .post(url, this.getRequestBody(body, true), {
                    headers: httpHeader,
                    params: this.getURLSearchParams(parameters, true),
                    responseType: 'json',
                })
                .pipe(
                    map((res: any) => this.extractDataForValidate(res, url)),
                    catchError((e: any) => this.handleError(e, url))
                )
                .subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
        });
    }
    protected getCallService1(url: string, parameters: Object = {}) {
        this.dataSharedService.isShowsLoaderIcon(true);
        let httpHeader = new HttpHeaders();
        httpHeader.set('Access-Control-Allow-Origin', '*');
        httpHeader.append('Content-Type', 'application/json');
        return new Observable<any>((observer) => {
            this.httpClient.get(this.getURLParams(url, parameters), {
                headers: httpHeader,
                responseType: 'blob',
            }).pipe(
                map((res: any) => this.extractDataForValidate(res, url)),
                catchError((e: any) => this.handleError(e, url))
            )
                .subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
        });
    }
    protected putCallService(
        url: string,
        parameters: Object = {},
        body: Object = {}
    ) {
        this.dataSharedService.isShowsLoaderIcon(true);

        let httpHeader = new HttpHeaders();
        httpHeader.set('Access-Control-Allow-Origin', '*');
        httpHeader.append('Content-Type', 'application/json');
        return new Observable<any>((observer) => {
            this.httpClient
                .put(url, this.getRequestBody(body, true), {
                    headers: httpHeader,
                    params: this.getURLSearchParams(parameters, true),
                    responseType: 'json',
                })
                .pipe(
                    map((res: any) => this.extractDataForValidate(res, url)),
                    catchError((e: any) => this.handleError(e, url))
                )
                .subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
        });
    }

    protected getCallService(url: string, parameters: Object = {}) {
        this.dataSharedService.isShowsLoaderIcon(true);
        let httpHeader = new HttpHeaders();
        httpHeader.set('Access-Control-Allow-Origin', '*');
        httpHeader.append('Content-Type', 'application/json');
        return new Observable<any>((observer) => {
            this.httpClient
                .get(this.getURLParams(url, parameters), {
                    headers: httpHeader,
                    responseType: 'json',
                })
                .pipe(
                    map((res: any) => this.extractDataForValidate(res, url)),
                    catchError((e: any) => this.handleError(e, url))
                )
                .subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
        });
    }

    protected deleteCallService(url: string, parameters: Object = {}) {
        this.dataSharedService.isShowsLoaderIcon(true);
        let httpHeader = new HttpHeaders();
        httpHeader.set('Access-Control-Allow-Origin', '*');
        httpHeader.append('Content-Type', 'application/json');
        return new Observable<any>((observer) => {
            this.httpClient
                .delete(this.getURLParams(url, parameters), {
                    headers: httpHeader,
                    responseType: 'json',
                })
                .pipe(
                    map((res: any) => this.extractDataForValidate(res, url)),
                    catchError((e: any) => this.handleError(e, url))
                )
                .subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
        });
    }

    private getURLParams(url: string, parameters: any): string {
        if (parameters) {
            for (let property in parameters) {
                url = url + '/' + parameters[property];
            }
        }
        return url;
    }

    private getURLSearchParams(
        parametersObj: any,
        excapeHTML: boolean
    ): HttpParams {
        let parameters = new HttpParams();
        if (parametersObj != null) {
            for (let property in parametersObj) {
                let paramValue = parametersObj[property];
                if (typeof paramValue == 'object') {
                    paramValue = excapeHTML ? paramValue : paramValue;
                } else if (typeof paramValue == 'boolean') {
                    paramValue = paramValue.toString();
                } else if (typeof paramValue == 'number') {
                    paramValue = paramValue.toString();
                }
                parameters = parameters.set(property, paramValue);
            }
        }
        return parameters;
    }

    private getRequestBody(bodyObj: any, excapeHTML: boolean) {
        return bodyObj;
    }

    private extractDataForValidate(res: Response, url: string) {
        this.dataSharedService.isShowsLoaderIcon(false);
        return res || {};
    }

    private handleError(error: Response | any, url: string) {
        this.dataSharedService.isShowsLoaderIcon(false);
        if(error && error.error) {
            if (error.error.statusCode == BaseService.SC_UNAUTHORIZED || error.error.statusCode == BaseService.SC_SERVICE_UNAVAILABLE) {
                this.calloutService.showError(error.error.message);
                return throwError(error.error.message);
            } else if (error.error.statusCode == BaseService.REQUEST_REDIRECT) {
                this.calloutService.showError(error.error.message);
                return throwError(error.error.message);
            } else if (error.error.statusCode == BaseService.SC_NOT_FOUND) {
                this.calloutService.showError("Invalid Request");
                return throwError(error);
            } else if (error.error.statusCode == BaseService.SC_BAD_REQUEST)  {
                this.calloutService.showError(error.error.message);
                return Observable.throw(error);
            } else {
                this.calloutService.showError(error.error.message);
                return throwError(error);
            }
        } else {
            return throwError(error);
        }
    }
    // starting pointing
}
