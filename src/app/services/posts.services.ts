import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadPosts(): void {
    this.http.get<Post[]>('/posts').subscribe({
      next: (posts) => this.postsSubject.next(posts),
      error: () => alert('Erro ao carregar posts'),
    });
  }

  getPosts() {
    return this.posts$;
  }
}
