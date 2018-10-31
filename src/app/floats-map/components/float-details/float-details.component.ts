import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Float } from '../../models/float.model';
import { FloatsMapQuery } from '../../queries/floats-map.query';

@Component({
  selector: 'app-float-details',
  templateUrl: './float-details.component.html',
  styleUrls: ['./float-details.component.scss']
})
export class FloatDetailsComponent implements OnInit {
  float: Observable<Float>;

  constructor(private floatsMapQuery: FloatsMapQuery) {
    this.float = this.floatsMapQuery.selectActive();
  }

  ngOnInit() {
  }
}
