import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { AdminNavbarComponent } from '../../components/shared/admin-navbar/admin-navbar.component';
import { ApiService } from '../../services/api.service';
import { MovieList } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-manager-page',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    FormsModule,
    CommonModule,
    TableModule,
  ],
  templateUrl: './manager-page.component.html',
  styleUrl: './manager-page.component.css'
})
export class ManagerPageComponent implements OnInit{

  title: string;
  movieList: MovieList | undefined;
  searchText: string;
  columnHeaders: any[];
  rowData: any[];
  totalResults: number;
  loadingTable: boolean;
  tableLoaded: boolean;
  bookList: any[];

  constructor(
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService
  ) {
    if(!this.storageService.retrieveData('isAdmin').value) {
      this.navigateToPage('login-page','');
    }

    this.title = '';
    this.searchText = '';
    this.columnHeaders = [];
    this.rowData = [];
    this.totalResults = 0;
    this.loadingTable = false;
    this.tableLoaded = false;
    this.bookList = [];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.title = params['title'];
    });
    this.loadHeaders();
  }

  navigateToPage(page: string, title: string) {
    this.navigationService.navigateToPage(page, title);
  }

  loadHeaders() {
    switch (this.title) {
      case 'Filmes':
        this.columnHeaders = [
          { header: "Capa", field: "poster", editable: false },
          { header: "Título", field: "title", editable: false },
          { header: "Avaliações", field: "vote_average", editable: false },
          { header: "Ano de Lançamento", field: "release_date", editable: false },
          { header: "Ações", field: "actions", editable: false }
        ];
        break;
      case 'Séries':
        this.columnHeaders = [
          { header: "Capa", field: "poster", editable: false },
          { header: "Título", field: "name", editable: false },
          { header: "Avaliações", field: "vote_average", editable: false },
          { header: "Ano de Lançamento", field: "first_air_date", editable: false },
          { header: "Ações", field: "actions", editable: false }
        ];
        break;
      case 'Livros':
        this.columnHeaders = [
          { header: "Capa", field: "poster", editable: false },
          { header: "Título", field: "title", editable: false },
          { header: "Avaliações", field: "ratings_average", editable: false },
          { header: "Ano de Lançamento", field: "release_date", editable: false },
          { header: "Autor", field: "authoredBy", editable: false },
          { header: "Ações", field: "actions", editable: false }
        ];
        break;
      default:
        break;
    }
  }

  async search() {
    const searchMovie = () => {
      this.apiService.getMovieByName(this.searchText).subscribe({
        next: movie => {
          this.movieList = movie;
          this.loadResults();
        },
        error: error => {
          console.log('Erro', error)
        }
      });
    };

    const searchSeries = () => {
      this.apiService.getTvShowByName(this.searchText).subscribe({
        next: show => {
          this.movieList = show;
          this.loadResults();
        },
        error: error => {
          console.log('Erro', error)
        }
      });
    };

    const searchBook = () => {
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
        searchSeries()
        break;
      case 'Livros':
        searchBook();
        break;
    }

    this.loadingTable = false;
    this.tableLoaded = true;
  }

  loadResults() {
    this.rowData = [];

    if (this.title !== 'Livros') {

      if(!this.movieList) {
        return;
      }
      this.movieList.results.slice(0,5).forEach(mov => {
        this.rowData.push({...mov, banner_url: this.buscarImagemFilme(mov.poster_path)});
      });
    } else {
      this.bookList.forEach(book => {
        this.rowData.push({
          ...book,
          id: book.isbn[0],
          release_date: book.publish_date[0],
          authoredBy: book.author_name,
          banner_url: this.buscarImagemLivro(book.cover_edition_key)
        });
      });
    }
  }

  isTableLoading(): boolean {
    return this.loadingTable;
  }

  isTableLoaded(): any {
    return this.tableLoaded;
  }

  getNextPage($event: TableLazyLoadEvent) {
    return;
  }

  loadInventory() {
    this.tableLoaded = false;
    this.loadingTable = true;
    this.rowData = [];

    const getMoviesInventory = () => {
      this.apiService.getAllMovies().subscribe({
        next: movies => {
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

    const getSeriesInventory = () => {
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

    const getBooksInventory = () => {
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

    const searchBookImage = (id: any) => {
      return `https://covers.openlibrary.org/b/id/${id}-L.jpg`;
    };

    switch(this.title) {
      case 'Filmes':
        getMoviesInventory();
        break;
      case 'Séries':
        getSeriesInventory()
        break;
      case 'Livros':
        getBooksInventory();
        break;
    }

    this.loadingTable = false;
    this.tableLoaded = true;
  }

  showDetails(itemId: string) {
    this.navigateToPage('details-page', `${itemId}|${this.title}`);
  }

  buscarImagemFilme(url: string) {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const size = "w500";

    return `${baseUrl}${size}${url}`;
  }

  buscarImagemLivro(id: string) {
    return `https://covers.openlibrary.org/b/olid/${id}.jpg`;
  }
}
