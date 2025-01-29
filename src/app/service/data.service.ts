import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import Post from "../../pages/main/post";
import {Data} from "../../pages/main/data";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = "http://jsonplaceholder.typicode.com/posts";

  apiFlask = "http://127.0.0.1:5000/api/data";

  apiProductsFlask = "http://127.0.0.1:5000/api/products";

  apiAIFlask = "http://127.0.0.1:5000/api/generateAI";

  apiTableFlask = "http://127.0.0.1:5000/api/generateSqlScript";

  apiCsvFlask = "http://127.0.0.1:5000/api/generateCsvAnswer";
  constructor(private http:HttpClient) {}

  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl);
  }

  getAllData(): Observable<Data>{
    return this.http.get<Data>(this.apiFlask);
  }

  getAllProducts(): Observable<any>{
    return this.http.get<any>(this.apiProductsFlask);
  }

  getResponseFromAI(user_query: string, chat_history: string, template: string, file: File | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('user_query', user_query);
    formData.append('chat_history', chat_history);
    formData.append('template', template);
    formData.append('llama_query', ''); // Include if necessary
    if (file) {
      formData.append('file', file, file.name);
    }

    // Send the POST request with the form data
    return this.http.post<any>(this.apiAIFlask, formData);
  }

  generateTable(file: File | null): Observable<any> {
    console.log(file);
    if(file === null){
      return this.http.post<any>("", "");
    }else {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      return this.http.post<any>(this.apiTableFlask, formData);
    }
  }

  generateCsvAnswer(file: File | null, userQuery: string): Observable<any> {
    console.log(file);

    if (file === null) {
      // Handle case where no file is provided
      return this.http.post<any>(this.apiTableFlask, { user_query: userQuery });
    } else {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('user_query', userQuery);  // Add user_query to form data

      return this.http.post<any>(this.apiCsvFlask, formData);
    }
  }
}
