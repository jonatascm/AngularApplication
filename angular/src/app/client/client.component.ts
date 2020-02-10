import { ApiService } from '../services/api.service';
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

}
