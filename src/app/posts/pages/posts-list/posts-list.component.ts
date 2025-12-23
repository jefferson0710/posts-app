import { Post } from './../../../models/posts.model';
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
  selectPost: any = null;
  isModalOpen = false;
  postText: string = '';
  searchMessage: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  paginatedPosts: any[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.filteredPosts = posts;
      this.totalPages = Math.ceil(
        this.filteredPosts.length / this.itemsPerPage
      );
      this.updatePagination();
      this.loading = false;
      this.calculateTotalPages();
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
    if (this.filteredPosts.length === 0) {
      this.searchMessage = 'Nenhum post encontrado para essa busca.';
    } else {
      this.searchMessage = '';
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePagination();
  }
  openEditarModal(post: any) {
    this.selectPost = { ...post };
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectPost = null;
  }

  savePost() {
    this.postsService.updatePost(this.selectPost);
    this.closeModal();
  }

  deleteModal(post: any) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este post?');

    if (confirmDelete) {
      this.postsService.deletePostLocal(post.id);
    }
  }
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedPosts = this.filteredPosts.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredPosts.length / this.itemsPerPage);
  }
}
