import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models/employee.model';

declare var $: any;

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    /**
     * Record to edit
     */
    @Input() recordToEdit: Employee;

    @Output() cancelAdd = new EventEmitter();

    @Output() recordAdded = new EventEmitter();

    constructor(
        private apiService: ApiService
    ) {}

    /**
     * Init here
     */
    ngOnInit(): void {
    }

    /**
     * ADD / UPDATE RECORD
     */
    saveChanges() {

        /**
         * Get input from user. 
         * We use jquery for simplicity only
         */
        const name = $('#name').val();
        const age = $('#age').val();
        const position = $('#position').val();

        /**
         * Validate not empty
         */
        if (!name || !age || !position) {
            $('#addNewInfo').html('Please fill all fields');
            return;
        }

        /**
         * This is our data to save
         */
        const data = {
            name,
            age,
            position
        };

        if (this.recordToEdit) {

            /**
             * Update values
             */
            this.apiService.updateChanges(this.recordToEdit._id, data).subscribe( () => {
                this.onRecordAdded();
            });

        } else {

            /**
             * Insert new record
             */
            this.apiService.addRecord(data).subscribe( () => {
                this.onRecordAdded();
                this.onCancelAdd();
            });

        }
    }

    /**
     * Simply hides a DIV
     */
    onCancelAdd() {
        this.cancelAdd.emit();
    }

    onRecordAdded() {
        this.recordAdded.emit();
    }

}

