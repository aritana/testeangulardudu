import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AdminNavbarComponent } from '../../components/shared/admin-navbar/admin-navbar.component';
import { ApiService } from '../../services/api.service';
import { MovieList } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { STORAGE_KEYS, StorageService, StorageValueTypes } from '../../services/storage.service';
import { ROUTE_NAMES } from '../../app.routes';


@Component({
  selector: 'app-manager-page',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    FormsModule,
    CommonModule,
    TableModule
  ],
  templateUrl: './manager-page.component.html',
  styleUrl: './manager-page.component.css'
})
export class ManagerPageComponent implements OnInit{

  title: StorageValueTypes;
  movieList: MovieList | undefined;
  searchText: string;
  columnHeaders: any[];
  rowData: any[];
  totalResults: number;
  loadingTable: boolean;
  tableLoaded: boolean;
  bookList: any[];
  shouldShowSearchBar: boolean;

  constructor(
    private navigationService: NavigationService,
    private apiService: ApiService,
    private storageService: StorageService
  ) {
    if (!this.storageService.retrieveData(STORAGE_KEYS.isLoggedIn)
      && !this.storageService.retrieveData(STORAGE_KEYS.isAdmin)
    ) {
      this.navigateToPage(ROUTE_NAMES.login_page,'');
    }

    this.title = '';
    this.searchText = '';
    this.columnHeaders = [];
    this.rowData = [];
    this.totalResults = 0;
    this.loadingTable = false;
    this.tableLoaded = false;
    this.shouldShowSearchBar = true;
    this.bookList = [];
  }

  ngOnInit(): void {
    this.title = this.storageService.retrieveData(STORAGE_KEYS.currentMediaType);
    this.loadHeaders();
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }

  loadHeaders(): void {
    switch (this.title) {
    case 'Filmes':
      this.columnHeaders = [
        { header: 'Capa', field: 'poster', editable: false },
        { header: 'Título', field: 'title', editable: false },
        { header: 'Avaliações', field: 'vote_average', editable: false },
        { header: 'Ano de Lançamento', field: 'release_date', editable: false },
        { header: 'Ações', field: 'actions', editable: false }
      ];
      break;
    case 'Séries':
      this.columnHeaders = [
        { header: 'Capa', field: 'poster', editable: false },
        { header: 'Título', field: 'name', editable: false },
        { header: 'Avaliações', field: 'vote_average', editable: false },
        { header: 'Ano de Lançamento', field: 'first_air_date', editable: false },
        { header: 'Ações', field: 'actions', editable: false }
      ];
      break;
    case 'Livros':
      this.columnHeaders = [
        { header: 'Capa', field: 'poster', editable: false },
        { header: 'Título', field: 'title', editable: false },
        { header: 'Avaliações', field: 'ratings_average', editable: false },
        { header: 'Ano de Lançamento', field: 'release_date', editable: false },
        { header: 'Autor', field: 'authoredBy', editable: false },
        { header: 'Ações', field: 'actions', editable: false }
      ];
      break;
    case 'Comentários':
      this.shouldShowSearchBar = false;
      this.columnHeaders = [
        { header: 'Usuário', field: 'username', editable: false },
        { header: 'Media', field: 'mediaType', editable: false },
        { header: 'Rating', field: 'rating', editable: false },
        { header: 'Comment', field: 'comment', editable: false },
        { header: 'Remove', field: 'remove', editable: false }
      ];
      this.loadResults();
      break;
    case 'Perfis':
      this.shouldShowSearchBar = false;
      this.columnHeaders = [
        { header: 'Id', field: 'id', editable: false },
        { header: 'Usuário', field: 'username', editable: false },
        { header: 'Nome', field: 'name', editable: false },
        { header: 'Email', field: 'email', editable: false },
        { header: 'Administrador', field: 'isAdmin', editable: false },
        { header: 'Remove', field: 'remove', editable: false }
      ];
      this.loadResults();
      break;
    default:
      break;
    }
  }

  search(): void {
    const searchMovie = (): void => {
      this.apiService.getMovieByName(this.searchText).subscribe({
        next: movie => {
          this.movieList = movie;
          this.loadResults();
        },
        error: error => {
          console.log('Erro', error);
        }
      });
    };

    const searchSeries = (): void => {
      this.apiService.getTvShowByName(this.searchText).subscribe({
        next: show => {
          this.movieList = show;
          this.loadResults();
        },
        error: error => {
          console.log('Erro', error);
        }
      });
    };

    const searchBook = (): void => {
      this.apiService.getBookByName(this.searchText).subscribe({
        next: book => {
          this.bookList = book.docs;
          this.loadResults();
        },
        error: error => {
          console.log('Erro', error);
        }
      });
    };

    this.tableLoaded = false;
    this.loadingTable = true;

    switch(this.title) {
    case 'Filmes':
      searchMovie();
      break;
    case 'Séries':
      searchSeries();
      break;
    case 'Livros':
      searchBook();
      break;
    }

    this.loadingTable = false;
    this.tableLoaded = true;
  }

  loadResults(): void {
    this.rowData = [];

    const loadMovies = (): void => {
      if(!this.movieList) {
        return;
      }
      this.movieList.results.slice(0,5).forEach(mov => {
        this.rowData.push({...mov, banner_url: this.buscarImagemFilme(mov.poster_path)});
      });
    };

    const loadSeries = (): void => {
      if(!this.movieList) {
        return;
      }
      this.movieList.results.slice(0,5).forEach(mov => {
        this.rowData.push({...mov, banner_url: this.buscarImagemFilme(mov.poster_path)});
      });
    };

    const loadBooks = (): void => {
      this.bookList.forEach(book => {
        this.rowData.push({
          ...book,
          id: book.isbn[0],
          release_date: book.publish_date[0],
          authoredBy: book.author_name,
          banner_url: this.buscarImagemLivro(book.cover_edition_key)
        });
      });
    };

    const loadComments = (): void => {
      this.apiService.getAllComments().subscribe({
        next: comments => {
          comments.forEach((comment: any) => {
            this.rowData.push(comment);
          });
        },
        error: error => {
          console.log(error);
        }
      });
    };

    const loadPerfis = (): void => {
      this.apiService.getAllProfiles().subscribe({
        next: comments => {
          comments.forEach((comment: any) => {
            this.rowData.push(comment);
          });
        },
        error: error => {
          console.log(error);
        }
      });
    };

    switch (this.title) {
    case 'Filmes':
      loadMovies();
      break;

    case 'Series':
      loadSeries();
      break;

    case 'Livros':
      loadBooks();
      break;

    case 'Comentários':
      loadComments();
      break;

    case 'Perfis':
      loadPerfis();
      break;
    }
  }

  isTableLoading(): boolean {
    return this.loadingTable;
  }

  isTableLoaded(): any {
    return this.tableLoaded;
  }

  getNextPage($event: TableLazyLoadEvent): void {
    console.log($event);
    return;
  }

  loadInventory(): void {
    this.tableLoaded = false;
    this.loadingTable = true;
    this.rowData = [];

    const getMoviesInventory = (): void => {
      this.apiService.getAllMovies().subscribe({
        next: movies => {
          console.log('AAA');
          movies.forEach((movie: { id: string; }) => {
            this.apiService.getMovieDetails(movie.id).subscribe({
              next: value => {
                this.rowData.push({ ...value, banner_url: this.buscarImagemFilme(value.poster_path)});
              },
              error: error => {
                console.log(error);
              }
            });
          });
        },
        error: error => {
          console.log(error);
        }
      });
    };

    const getSeriesInventory = (): void => {
      this.apiService.getAllSeries().subscribe({
        next: series => {
          series.forEach((serie: { id: string; }) => {
            this.apiService.getTvShowDetails(serie.id).subscribe({
              next: value => {
                this.rowData.push({ ...value, banner_url: this.buscarImagemFilme(value.poster_path)});
              },
              error: error => {
                console.log(error);
              }
            });
          });
        },
        error: error => {
          console.log(error);
        }
      });
    };

    const getBooksInventory = (): void => {
      this.apiService.getAllBooks().subscribe({
        next: books => {
          books.forEach((book: { id: string; }) => {
            this.apiService.getExternalBookById(book.id).subscribe({
              next: v => {
                const value = v[`ISBN:${book.id}`];
                console.log(value);
                this.rowData.push({
                  ...value,
                  authoredBy: value.authors[0].name,
                  id: book.id,
                  release_date: value.publish_date,
                  banner_url: value.cover.medium
                });
              },
              error: error => {
                console.log(error);
              }
            });
          });
        },
        error: error => {
          console.log(error);
        }
      });
    };

    switch(this.title) {
    case 'Filmes':
      getMoviesInventory();
      break;
    case 'Séries':
      getSeriesInventory();
      break;
    case 'Livros':
      getBooksInventory();
      break;
    }

    this.loadingTable = false;
    this.tableLoaded = true;
  }

  showDetails(itemId: string): void {
    this.navigateToPage('details-page', `${itemId}|${this.title}`);
  }

  buscarImagemFilme(url: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const size = 'w500';

    return `${baseUrl}${size}${url}`;
  }

  buscarImagemLivro(id: string): string {
    return `https://covers.openlibrary.org/b/olid/${id}.jpg`;
  }

  removeItem(id: string): void {
    const removeComment = (): void => {
      this.apiService.removeCommentById(id).subscribe({
        next: (): void => {
          this.reloadPage();
        },
        error: error => {
          console.log(error);
        }
      });
    };

    const removeProfile = (): void => {
      this.apiService.removeProfileById(id).subscribe({
        next: (): void => {
          this.reloadPage();
        },
        error: error => {
          console.log(error);
        }
      });
    };

    switch(this.title) {
    case 'Comentários':
      removeComment();
      break;
    case 'Perfis':
      removeProfile();
      break;
    default:
      break;
    }
  }

  reloadPage(): void {
    this.navigationService.navigateToPage(ROUTE_NAMES.manager_page, `${this.title}`);
  }
}
