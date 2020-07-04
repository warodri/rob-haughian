import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models/employee.model';

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    addRecord = false;

    /**
     * Records from server
     */
    arrRecords: Array<Employee> = [];

    /**
     * Record to edit
     */
    recordToEdit: Employee;


    constructor(
        private apiService: ApiService
    ) {}


    /**
     * Init here
     */
    ngOnInit(): void {
        this.getAllRecords();
    }

    /**
     * GET ALL RECORDS FROM SERVER
     */
    getAllRecords() {
        this.apiService.getAllRecords().subscribe( (response: any) => {
            if (response.count) {
                this.arrRecords = response.data;
            }
        });
    }

    /**
     * Simply shows a DIV
     */
    showAddNew() {
        this.recordToEdit = null;
        this.addRecord = true;
    }

    /**
     * Simply hides a DIV
     */
    cancelAdd() {
        this.addRecord = false;
    }

    recordAdded() {
        this.addRecord = false;
        console.log('Reload list');
        this.getAllRecords();
    }

    userRemovedRecord() {
        console.log('Reload list');
        this.getAllRecords();
    }

    userWantsToEditRecord(id: string) {
        console.log('Edit record: ' + id);
        this.recordToEdit = this.arrRecords.find( item => item._id === id);
        this.addRecord = true;
    }

}

