import { Component, OnInit } from '@angular/core';
import { ComentsContentComponent } from './coments-content/coments-content.component';
import { NavigationService } from '../../services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { STORAGE_KEYS, StorageService, StorageValueTypes } from '../../services/storage.service';
import { ReviewDialogComponent } from '../../components/dialogs/review-dialog/review-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ROUTE_NAMES } from '../../app.routes';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    ComentsContentComponent,
    FormsModule,
    NgbRatingModule,
    CommonModule
  ],
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css' ]
})
export class DetailsPageComponent implements OnInit{
  title: any;
  itemId: any;
  itemTitle: any;
  itemImageUrl: any;
  itemDescription: any;
  itemRating: any;
  imageUrl: any;
  isAdmin: StorageValueTypes;
  isLoggedIn: StorageValueTypes;
  isInLibrary: StorageValueTypes;

  constructor(
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.isLoggedIn = this.storageService.retrieveData(STORAGE_KEYS.isLoggedIn);
    this.isAdmin = this.storageService.retrieveData(STORAGE_KEYS.isAdmin);
    this.isInLibrary = this.storageService.retrieveData(STORAGE_KEYS.isInLibrary);

    if (!this.isLoggedIn) {
      this.navigateToPage(ROUTE_NAMES.login_page, '');
    }
  }

  ngOnInit(): void {
    this.itemId = this.storageService.retrieveData(STORAGE_KEYS.currentMediaId);
    this.title = this.storageService.retrieveData(STORAGE_KEYS.currentMediaType);
    this.isInLibrary = this.storageService.retrieveData(STORAGE_KEYS.isInLibrary);

    const searchMovieImage = (): string => {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'w500';
      return `${baseUrl}${size}${this.itemImageUrl}`;
    };

    const searchSerieImage = (): string => {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'w500';
      return `${baseUrl}${size}${this.itemImageUrl}`;
    };

    const getMovieDetails = (): void => {
      this.apiService.getMovieDetails(this.itemId).subscribe({
        next: movie => {
          this.itemTitle = movie.title;
          this.itemDescription = movie.overview;
          this.itemImageUrl = movie.poster_path;
          this.itemRating = (movie.vote_average / 10) * 5;
          this.imageUrl = searchMovieImage();
        },
        error: err => {
          console.log(err);
        }
      });
    };

    const getSerieDetails = (): void => {
      this.apiService.getTvShowDetails(this.itemId).subscribe({
        next: serie => {
          console.log(serie);
          this.itemTitle = serie.name;
          this.itemDescription = serie.overview;
          this.itemImageUrl = serie.poster_path;
          this.itemRating = (serie.vote_average / 10) * 5;
          this.imageUrl = searchSerieImage();
        },
        error: err => {
          console.log(err);
        }
      });
    };

    const getBookDetails = (): void => {
      this.apiService.getExternalBookById(this.itemId).subscribe({
        next: b => {
          const book = b[`ISBN:${this.itemId}`];
          console.log(book);
          this.itemTitle = `${book.title} - ${book.subtitle}`;
          this.itemDescription = book.excerpts[0].text;
          this.itemRating = 0;
          this.imageUrl = book.cover.large;
        },
        error: error => {
          console.log(error);
        }
      });
    };

    const getMovieInInventory = (): void => {
      this.apiService.getMovieById(this.itemId).subscribe({
        next: () => {
          console.log(`In Inventory ${this.itemId}`);
          this.storageService.saveData({key: STORAGE_KEYS.isInLibrary, value: true});
          this.isInLibrary = true;
        },
        error: () => {
          this.storageService.saveData({key: STORAGE_KEYS.isInLibrary, value: false});
          this.isInLibrary = false;
        }
      });
    };

    const getSerieInInventory = (): void => {
      this.apiService.getSerieById(this.itemId).subscribe({
        next: () => {
          console.log(`In Inventory ${this.itemId}`);

          this.storageService.saveData({key: STORAGE_KEYS.isInLibrary, value: true});
          this.isInLibrary = true;
        },
        error: () => {
          this.storageService.saveData({key: STORAGE_KEYS.isInLibrary, value: false});
          this.isInLibrary = false;
        }
      });
    };

    const getBookInInventory = (): void => {
      this.apiService.getBookById(this.itemId).subscribe({
        next: () => {
          console.log(`In Inventory ${this.itemId}`);
          this.storageService.saveData({key: STORAGE_KEYS.isInLibrary, value: true});
          this.isInLibrary = true;
        },
        error: () => {
          console.log(`Not in Inventory ${this.itemId}`);
          this.storageService.saveData({key: STORAGE_KEYS.isInLibrary, value: false});
          this.isInLibrary = false;
        }
      });
    };

    switch(this.title) {
    case 'Filmes':
      getMovieDetails();
      getMovieInInventory();
      break;
    case 'Séries':
      getSerieDetails();
      getSerieInInventory();
      break;
    case 'Livros':
      getBookDetails();
      getBookInInventory();
      break;
    default:
      this.imageUrl = '';
      break;
    }
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }

  removeFromLibrary(): void {
    const removeMovie = (): void => {
      this.apiService.removeMovieById(this.itemId).subscribe({
        next: () => {
          console.log('SUCESSFULLY DELETED');
        },
        error: error => {
          console.log(error);
        }
      });
    };

    const removeSerie = (): void => {
      this.apiService.removeSerieById(this.itemId).subscribe({
        next: () => {
          console.log('SUCESSFULLY DELETED');
        },
        error: error => {
          console.log(error);
        }
      });
    };

    const removeBook = (): void => {
      this.apiService.removeBookById(this.itemId).subscribe({
        next: () => {
          console.log('SUCESSFULLY DELETED');
        },
        error: error => {
          console.log(error);
        }
      });
    };

    switch (this.title) {
    case 'Filmes':
      removeMovie();
      break;
    case 'Séries':
      removeSerie();
      break;
    case 'Livross':
      removeBook();
      break;
    default:
      break;
    }

    this.isInLibrary = false;
  }

  addToLibrary(): void {
    const addMovie = (): void => {
      this.apiService.getMovieById(this.itemId).subscribe({
        next: () => {
          console.log('MEDIA ALREADY IN LIBRARY');
        },
        error: () => {
          this.apiService.addMovie({id: this.itemId}).subscribe({
            next: () => {
              console.log(`Successfully added ${this.itemId} to library`);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      });
    };

    const addSerie = (): void => {
      this.apiService.getSerieById(this.itemId).subscribe({
        next: () => {
          console.log('MEDIA ALREADY IN LIBRARY');
        },
        error: () => {
          this.apiService.addSerie({id: this.itemId}).subscribe({
            next: () => {
              console.log(`Successfully added ${this.itemId} to library`);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      });
    };


    const addBook = (): void => {
      this.apiService.getBookById(this.itemId).subscribe({
        next: () => {
          console.log('MEDIA ALREADY IN LIBRARY');
        },
        error: () => {
          this.apiService.addBook({id: this.itemId}).subscribe({
            next: () => {
              console.log(`Successfully added ${this.itemId} to library`);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      });
    };

    switch (this.title) {
    case 'Filmes':
      addMovie();
      break;
    case 'Séries':
      addSerie();
      break;
    case 'Livros':
      addBook();
      break;
    default:
      break;
    }

    this.isInLibrary = true;
  }


  reviewMedia(): void {
    this.dialog.open(ReviewDialogComponent, {
      width: '40vw',
      data: { message: 'Olá, faça sua avaliação!' }
    }).afterClosed().subscribe({
      next: () => {
        this.navigateToPage(ROUTE_NAMES.details_page, `${this.itemId}|${this.title}`);
      }
    });
  }

  getToPreviousPage(): void {
    this.navigateToPage(ROUTE_NAMES.list_content, this.title);
  }
}
