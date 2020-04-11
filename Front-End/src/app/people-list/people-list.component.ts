import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PeopleService } from '../people-service/people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  public selectedId;
  people = [];
  errorMsg;

  constructor(private router: Router, private route: ActivatedRoute,
              private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedId = parseInt(params.get('id'), 10);
    });

    this.peopleService.getPeople()
          .subscribe(data => this.people = data,
                    error => this.errorMsg = error);
  }

  onSelect(person) {
    // this.router.navigate(['people/', person.id]);
    this.router.navigate([person.id], {relativeTo: this.route});
  }

  isSelected(person) {
    return person.id === this.selectedId;
  }

}
