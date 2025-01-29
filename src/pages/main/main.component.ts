import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Post from "./post";
import {DataService} from "../../app/service/data.service";
import {NgForOf} from "@angular/common";
import {Data} from "./data";
import {FormsModule} from "@angular/forms";
import {ChatComponent} from "../../components/chat/chat.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ChatComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  posts: Post[] = []

  data: Data | undefined;

  products: any;

  messageToSend=""

  chatHistory=""
  constructor(private data_service: DataService) {
  }

  getAllPosts(){
    this.data_service.getAllPosts().subscribe({
      next: (posts) => {
        this.posts=posts;
        console.log(posts);
      }
    })
  }
  getAllData() {
    this.data_service.getAllData().subscribe({
      next: (data) => {
        this.data = data;
        console.log(data);
      }
    })
  }

  getAllProducts() {
    this.data_service.getAllProducts().subscribe({
      next: (products: any) => {
        this.products = products;
        console.log(products);
      }
    })
  }

}
