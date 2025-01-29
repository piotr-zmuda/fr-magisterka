import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DataService} from "../../../app/service/data.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-left-nav-bar',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './left-nav-bar.component.html',
  styleUrl: './left-nav-bar.component.scss'
})
export class LeftNavBarComponent {
  template: string = "" +
    "\n" +
    "    Conversation History: {chat_history}\n" +
    "    \n" +
    "\n" +
    "    tutaj dodaj preprompting \n" +
    "    User query: {user_query}\n" +
    "    \n" +
    "";


  toastMessage: string = '';
  showToastMessage: boolean = false;
  csvFile: File | null = null;
  constructor(private dataService: DataService ){

  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.csvFile = event.target.files[0];
    }
  }

  submit() {
    this.dataService.generateTable(this.csvFile).subscribe(
      response => {
        this.toastMessage = response;
        this.showToastMessage = true;

        // Automatically hide the toast message after 3 seconds
        setTimeout(() => {
          this.showToastMessage = false;
        }, 10); // Adjust time as needed

      },
      error => {
        this.toastMessage = "Error parsing CSV";
        this.showToastMessage = true;
        setTimeout(() => {
          this.showToastMessage = false;
          console.log(this.showToastMessage);
        }, 10000); // Adjust time as needed
      }
    );
  }
}
