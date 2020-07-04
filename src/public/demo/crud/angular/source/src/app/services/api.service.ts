import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

/**
 * Default http options to send for most of our requests
 */
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authentication: 'jwt ',
        key: 'REPLACE WITH YOUR DEVELOPER KEY'
    })
};

/**
 * This is the API server
 */
const apiUrl = 'https://vaskit.com';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }


    /**
     * ADD
     */
    addRecord(data: { name: string, age: number, position: string }) {
        return this.http.post(apiUrl + '/record/api', {

            /**
             * Table name where this record will be inserterd.
             * You must create these tables from your Dashboard
             * https://vaskit.com/dashboard
             */
            table: 'employees',

            /**
             * This is the data to insert in your table
             */
            data,

            /**
             * You can define this record security
             */
            readPublic: true,
            writePublic: true,
            readUsers: [/** Your user's IDs who can read this record separated by comma */],
            writeUsers: [/** Your user's IDs who can write this record separated by comma */]

        }, httpOptions);
    }


    /**
     * UPDATE CHANGES
     */
    updateChanges(id: string, data: { name: string, age: number, position: string }) {
        return this.http.put(apiUrl + '/record/api/' + id, {

            /**
             * Table name where this record will be updated.
             * You must create these tables from your Dashboard
             * https://vaskit.com/dashboard
             */
            table: 'employees',

            /**
             * This is the data to update in your table
             */
            data,

            /**
             * You can define this record security
             */
            readPublic: true,
            writePublic: true,
            readUsers: [/** Your user's IDs who can read this record separated by comma */],
            writeUsers: [/** Your user's IDs who can write this record separated by comma */]

        }, httpOptions);
    }


    /**
     * FIND ALL
     */
    getAllRecords() {
        return this.http.post(apiUrl + '/record/api/find', {
            table: 'employees'
        }, httpOptions);
    }


    /**
     * FIND BY ID
     */
    getRecordById(id: string) {
        return this.http.post(apiUrl + '/record/api/find/' + id, {
            table: 'employees'
        }, httpOptions);
    }


    /**
     * DELETE RECORD
     */
    deleteRecord(id: string) {
        return this.http.delete(apiUrl + '/record/api/' + id, httpOptions);
    }

}
