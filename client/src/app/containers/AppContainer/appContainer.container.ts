import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-container',
  templateUrl: './appContainer.container.html',
  styleUrls: ['./appContainer.container.scss']
})

export class AppContainer {

  constructor(private router: Router) { }
}
