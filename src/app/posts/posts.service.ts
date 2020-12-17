import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts() {
    this.http.get<{message: string, posts: any[]}>('http://localhost:3000/api/posts')
    .pipe(map((data) => {
      return data.posts.map(({_id, ...post}) => ({...post, id: _id}))
    }))
    .subscribe((posts) => {
      this.posts = posts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable()
  }

  addPost(title: string, content: string) {
    const post: Post = {id: "", title, content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((response) => {
      console.log(response.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts])
    })
  }

  deletePost(postId: string) {
    this.http.delete<{message: string}>(`http://localhost:3000/api/posts/${postId}`)
      .subscribe((response) => {
        console.log(response.message);
        this.posts = this.posts.filter(post => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
      })
  }
}
