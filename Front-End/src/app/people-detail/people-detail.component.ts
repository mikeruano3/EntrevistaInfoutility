import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { PeopleService } from '../people-service/people.service';
import { Person } from '../people-service/person';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styles: [``]
})
export class PeopleDetailComponent implements OnInit {

  public personId;
  person: Person;
  errorMsg;

  constructor(private route: ActivatedRoute, private router: Router,
              private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.personId = parseInt(params.get('id'), 10);
    });

    this.peopleService.getPerson(this.personId)
          .subscribe(data => this.person = data,
                    error => this.errorMsg = error);
  }

  deleteAction(person) {
    let successMsg = null;
    this.peopleService.deletePerson(person.id)
      .subscribe(data => successMsg = data,
                error => this.errorMsg = error);

    setInterval(() => {
        if (successMsg !== null) {
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      }, 3000);
  }

  editAction(person) {
    this.router.navigate(['/people-edit', person.id], {relativeTo: this.route.parent});
  }

  goPrevious() {
    const previousId = this.personId > 1 ? this.personId - 1 : this.personId;
    this.router.navigate(['../', previousId], {relativeTo: this.route});
  }

  goNext() {
    const nextId = this.personId + 1;
    this.router.navigate(['../', nextId], {relativeTo: this.route});
  }

  gotoList() {
    const selectedId = this.personId ? this.personId : null;
    this.router.navigate(['../', {id: selectedId}], {relativeTo: this.route});
  }

}
