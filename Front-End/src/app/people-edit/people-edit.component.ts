import { Component, OnInit } from '@angular/core';
import { Person } from '../people-service/person';
import { PeopleService } from '../people-service/people.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-people-edit',
  templateUrl: '../people-add/people-add.component.html',
  styles: [``]
})
export class PeopleEditComponent implements OnInit {

  personModel = new Person(0, '', '', 0, null);
  personId;
  submitted = false;
  successMsg: any;
  errorMsg: any;
  pageTitle: 'Edit Register';

  constructor(private route: ActivatedRoute, private router: Router,
              private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.personId = parseInt(params.get('id'), 10);
    });

    this.peopleService.getPerson(this.personId)
          .subscribe(data => this.personModel = data,
                    error => this.errorMsg = error);
  }

  onSubmit() {
    this.peopleService.editPerson(this.personModel)
        .subscribe(
              data => this.successMsg = data,
              error => this.errorMsg = error
              );
  }

}
