import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DataService} from "./service/data.service";
import Post from "../pages/main/post";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pocket_human_front';


  constructor() {

  }
  ngOnInit() {

  }
}
