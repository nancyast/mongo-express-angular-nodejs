import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: "app-post-list",
  styleUrls: ['./post-list.component.css'],
  templateUrl: './post-list.component.html'
})
export class PostListComponent {
  // posts: Post[] = [
  //   { title: "First Post", content: "This is the First post\'s content"},
  //   { title: "Second Post", content: "This is the Second post\'s content"},
  //   { title: "Third Post", content: "This is the Third post\'s content"}
  // ]
  @Input() posts: Post[] = []
}
