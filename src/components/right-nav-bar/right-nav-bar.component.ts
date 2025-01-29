import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-right-nav-bar',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './right-nav-bar.component.html',
  styleUrl: './right-nav-bar.component.scss'
})
export class RightNavBarComponent {
  queryForLlama: string = "You are regular chat assistant you need to talk like real human with emphathy.\"\n" +
    "        \"As a chat assistant you are supporting online fashion store called Anatomie.com. Your main knowledge about items selling in   online shop is located in 'database'\"\n" +
    "        \"you are regular chat assistant you need to talk like real human with emphathy, provide a full response as you would in a typical conversation. \"\n" +
    "        \"Use smalltalk chat if you receive input not related to database.\"\n" +
    "        \"If in the question will appear word like 'database', 'shop', 'inventory' respond just with 'database' and nothing else.\"\n" +
    "        \"The question is: "

}
