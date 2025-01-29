import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import {DataService} from "../../app/service/data.service";
import {FormsModule} from "@angular/forms";
import {LeftNavBarComponent} from "../leftNavBar/left-nav-bar/left-nav-bar.component";
import {SpeechRecognitionService} from "../../app/service/speech/speech.service";
import {RightNavBarComponent} from "../right-nav-bar/right-nav-bar.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    FormsModule,
    CommonModule,
    LeftNavBarComponent,
    RightNavBarComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  @ViewChild(LeftNavBarComponent) leftNavBarComponent!: LeftNavBarComponent;
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement> | undefined;

  userQuery: string = '';

  voiceTextArea: string = 'this is voice text area';

  llamaTemplate:string = '"you are regular chat assistant you need to talk like real human with emphathy, provide a full response as you would in a typical conversation. "\n' +
    '        "Use smalltalk chat if you receive input not related to database."\n' +
    '        "If there is question related to database inventory please analyze the following question and determine if it is about databases or not. "\n' +
    '        "If it is about a database, respond with \'database\'."\n' +
    '        "The question is: "';

  chatHistory: { sender: string, message: string[] }[] = [{ sender: 'ai', message: ["ask me a question about the products that you search"] }];

  disabledButton: boolean = false;



  constructor(private dataService: DataService, private speechService: SpeechRecognitionService) {
  }

  startRecognition(): void {
    this.speechService.startListening((text: string) => {
      this.userQuery = text;
    });
  }

  stopRecognition(): void {
    console.log("stop listen");
    this.speechService.stopListening();
  }

  sendCsvAnswer() {
    this.dataService.generateCsvAnswer( this.leftNavBarComponent.csvFile, this.userQuery).subscribe(response => {
      this.chatHistory.push({sender: 'user', message: [this.userQuery]});
      this.chatHistory.push({ sender: 'ai', message: [response]});
    });
  }

  sendQuery() {

    this.disabledButton = true;
    this.chatHistory.push({sender: 'user', message: [this.userQuery]});
    const chatHistoryString = JSON.stringify(this.chatHistory.map(chat => chat.message));


    this.dataService.getResponseFromAI(this.userQuery, chatHistoryString, this.leftNavBarComponent.template, this.leftNavBarComponent.csvFile).subscribe(response => {
      this.userQuery = '';
      if (this.videoPlayer && this.videoPlayer.nativeElement) {
        this.videoPlayer.nativeElement.play();
      }
      console.log(response);
      if(typeof response === "string"){
        this.chatHistory.push({ sender: 'ai', message: [response]});
      }else{
        // @ts-ignore
        this.chatHistory.push({ sender: 'ai', message: response.map(item => item.filter(itemSub => itemSub !== null))});
      }
      this.disabledButton = false;
    }, error => {
      console.log(error)
      if (this.videoPlayer && this.videoPlayer.nativeElement) {
        this.videoPlayer.nativeElement.play();
      }
      this.chatHistory.push({ sender: 'ai', message: ['i dont understand the question, can you ask me one more time?']});
      this.disabledButton=false;
    })
  }




}
