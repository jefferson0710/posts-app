import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable({ providedIn: 'root' })

/**Utilizado para armazenar o estado atual dos posts, permite que múltiplos componentes
 * acessem e modifiquem a lista de posts de forma reativa.*/
export class PostsService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Carrega os posts da API externa.
   * A resposta é armazenada no BehaviorSubject, tornando os dados disponíveis para toda a aplicação.
   * Em caso de erro, uma mensagem é exibida ao usuário.
   */
  loadPosts(): void {
    this.http.get<Post[]>('/posts').subscribe({
      next: (posts) => this.postsSubject.next(posts),
      error: () => alert('Erro ao carregar posts'),
    });
  }

  getPosts() {
    return this.posts$;
  }
  /** Atualiza um post no cache local.
   * A estratégia utilizada é a substituição do post
   * com o mesmo ID dentro da lista atual.*/
  updatePost(updatedPost: Post): any {
    const posts = this.postsSubject.value.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    this.postsSubject.next(posts);
  }
  /** Deleta um post do cache local.
   * A estratégia utilizada é a remoção do post
   * com o ID correspondente da lista atual. Sem necessidade de recarregar dados da API*/
  deletePostLocal(id: number) {
    const updatedPosts = this.postsSubject.value.filter((p) => p.id !== id);

    this.postsSubject.next(updatedPosts);
  }
}
