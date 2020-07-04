import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models/employee.model';

declare var $: any;

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    @Input() records: Array<Employee>;

    @Output() deleteRecord = new EventEmitter();

    @Output() editRecord = new EventEmitter();

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
    }

    /**
     * DELETE RECORD
     */
    onDeleteRecord(id: string) {
        if (confirm('Are you sure?') === false) {
            return;
        }
        this.apiService.deleteRecord(id).subscribe( () => {
            this.deleteRecord.emit();
        });
    }

    /**
     * User wants to edit an existing record
     */
    getRecordById(id: string) {
        this.editRecord.emit(id);
    }

}

