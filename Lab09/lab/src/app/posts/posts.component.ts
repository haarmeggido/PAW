import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  public posts: any;

  constructor(private http: HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(response => {
        this.posts = response;
        this.posts = this.posts.slice(0, 40)
      });
  }

  addPost(value: any) {
    console.log(value.body);
  }
}
