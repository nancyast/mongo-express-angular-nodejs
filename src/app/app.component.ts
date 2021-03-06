import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';
  storedPosts: Post[] = []

  onAddPost(post: any) {
    console.log('post:', post)
    this.storedPosts.push(post);
  }
}
