import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ApiService } from '../../services/api.service';
import { STORAGE_KEYS, StorageService, StorageValueTypes } from '../../services/storage.service';
import { ROUTE_NAMES } from '../../app.routes';

@Component({
  selector: 'app-list-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-content.component.html',
  styleUrl: './list-content.component.css'
})
export class ListContentComponent implements OnInit {
  title: StorageValueTypes;
  imageSrcs: any[][];
  isLoadingImages: boolean;
  pageLimit: number;

  constructor(
    private navigationService: NavigationService,
    private apiService: ApiService,
    private storageService: StorageService
  ) {

    if(!this.storageService.retrieveData(STORAGE_KEYS.isLoggedIn)) {
      this.navigateToPage(ROUTE_NAMES.login_page,'');
    }

    this.pageLimit = 6;
    this.isLoadingImages = true;
    this.title = 'Filmes';
    this.imageSrcs = [];
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }

  ngOnInit(): void {
    this.title = this.storageService.retrieveData(STORAGE_KEYS.currentMediaType);

    switch (this.title) {
    case 'Filmes':
      this.getMovieImages();
      break;

    case 'Séries':
      this.getSeriesImages();
      break;

    case 'Livros':
      this.getBookImages();
      break;

    default:
      break;
    }
  }

  getMovieImages(): void {
    this.imageSrcs = [];
    const moviesArray: Array<{ id: string; }> = [];
    this.apiService.getAllMovies().subscribe({
      next: movies => {
        movies.forEach((movie: { id: string; }) => {
          moviesArray.push(movie);
        });
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        const tempArray: any[] = [];
        moviesArray.forEach((movie: { id: string; }, index: number) => {
          this.apiService.getMovieDetails(movie.id).subscribe({
            next: result => {
              tempArray.push({src: this.buscarImagemFilme(result.poster_path), id: result.id});
            },
            error: err => {
              console.log(err);
            }
          });

          if (!(index+1 % this.pageLimit)) {
            this.imageSrcs.push(tempArray);
            tempArray.splice(0,tempArray.length);
          }
        });
        this.imageSrcs.push(tempArray);
        this.isLoadingImages = false;
      }
    });
  }

  getSeriesImages(): void {
    this.imageSrcs = [];
    const seriesArray: Array<{ id: string; }> = [];
    this.apiService.getAllSeries().subscribe({
      next: movies => {
        movies.forEach((movie: { id: string; }) => {
          seriesArray.push(movie);
        });
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        const tempArray: any[] = [];
        seriesArray.forEach((serie: { id: string; }, index: number) => {
          this.apiService.getTvShowDetails(serie.id).subscribe({
            next: result => {
              tempArray.push({src: this.buscarImagemFilme(result.poster_path), id: result.id});
            },
            error: err => {
              console.log(err);
            }
          });

          if (!(index+1 % this.pageLimit)) {
            this.imageSrcs.push(tempArray);
            tempArray.splice(0,tempArray.length);
          }
        });
        this.imageSrcs.push(tempArray);
        this.isLoadingImages = false;
      }
    });
  }

  getBookImages(): void {
    this.imageSrcs = [];
    const booksArray: Array<{ id: string; }> = [];
    this.apiService.getAllBooks().subscribe({
      next: movies => {
        movies.forEach((movie: { id: string; }) => {
          booksArray.push(movie);
        });
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        const tempArray: any[] = [];
        booksArray.forEach((book: { id: string; }, index: number) => {
          this.apiService.getExternalBookById(book.id).subscribe({
            next: r => {
              const result = r[`ISBN:${book.id}`];
              console.log(result);
              tempArray.push({src: result.cover.large, id: book.id});
            },
            error: err => {
              console.log(err);
            }
          });

          if (!(index+1 % this.pageLimit)) {
            this.imageSrcs.push(tempArray);
            tempArray.splice(0,tempArray.length);
          }
        });
        this.imageSrcs.push(tempArray);
        this.isLoadingImages = false;
      }
    });
  }


  buscarImagemFilme(url: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const size = 'w500';

    return `${baseUrl}${size}/${url}`;
  }

  navigateToPageByIndex(index: number): void {
    this.navigateToPage('details-page', `${index}|${this.title}`);
  }
}
