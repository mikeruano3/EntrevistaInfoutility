import { Component, OnInit } from '@angular/core';
import { Person } from '../people-service/person';
import { PeopleService } from '../people-service/people.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people-add',
  templateUrl: './people-add.component.html',
  styles: [``]
})
export class PeopleAddComponent implements OnInit {
  personModel = new Person(0, '', '', 0, null);
  submitted = false;
  successMsg: any;
  errorMsg: any;
  pageTitle = 'People Register';
  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.peopleService.register(this.personModel)
        .subscribe(
              data => this.successMsg = data,
              error => this.errorMsg = error
              );
  }
}
