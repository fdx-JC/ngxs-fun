import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @Input() placeholder: string;
  @Input() options: IUser[];
  @Input() position: string;
  @Output() addUser = new EventEmitter<{ email: string; position: string }>();

  inputControl = new FormControl();
  filteredOptions: Observable<IUser[] | null>;
  selectedUser: string;

  ngOnInit(): void {
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterOptions(value))
    );
  }

  private filterOptions(value: string): IUser[] | null {
    if (!value) return this.options;
    const filterValue = value.toLowerCase().trim();

    if (!this.options) return null;

    return this.options.filter((user) =>
      user.displayName.toLowerCase().includes(filterValue)
    );
  }

  onSelect(element: MatAutocompleteSelectedEvent): void {
    this.selectedUser = element.option.value;
  }

  onAddUser(): void {
    this.addUser.emit({ email: this.selectedUser, position: this.position });
  }
}
