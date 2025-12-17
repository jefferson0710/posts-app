import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../../services/posts.services';

@Component({
  standalone: true,
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PostsListComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  Pesquisar = '';
  loading = true;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.filteredPosts = posts;
      this.loading = false;
    });

    this.postsService.loadPosts();
  }

  search() {
    const term = this.Pesquisar.toLowerCase();

    this.filteredPosts = this.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.body.toLowerCase().includes(term)
    );
  }
}
