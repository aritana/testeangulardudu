import { Component, OnInit } from '@angular/core';
import { ComentsContentComponent } from './coments-content/coments-content.component';
import { NavigationService } from '../../services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [ComentsContentComponent, RatingModule, FormsModule],
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css', ]
})
export class DetailsPageComponent implements OnInit{
  title: any;
  itemId: any;
  itemTitle: any;
  itemImageUrl: any;
  itemDescription: any;
  itemRating: any;
  imageUrl: any;

  constructor(
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService
  ) {
    if(!this.storageService.retrieveData('isAdmin').value) {
      this.navigateToPage('login-page','');
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const parts = params['title'].split('|');
      this.itemId = parts[0];
      this.title = parts[1];
    });

    const searchMovieImage = () => {
      const baseUrl = "https://image.tmdb.org/t/p/";
      const size = "w500";
      return `${baseUrl}${size}${this.itemImageUrl}`;
    }

    const searchSerieImage = () => {
      const baseUrl = "https://image.tmdb.org/t/p/";
      const size = "w500";
      return `${baseUrl}${size}${this.itemImageUrl}`;
    }

    const searchBookImage = () => {
      return `https://covers.openlibrary.org/b/id/${this.itemImageUrl}-L.jpg`;
    }

    const getMovieDetails = () => {
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
    }

    const getSerieDetails = () => {
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
    }

    const getBookDetails = () => {
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

    switch(this.title) {
      case 'Filmes':
        getMovieDetails();
        break;
      case 'Séries':
        getSerieDetails();
        break;
      case 'Livros':
        getBookDetails();
        break;
      default:
        this.imageUrl = '';
        break;
    }
  }

  navigateToPage(page: string, title: string) {
    this.navigationService.navigateToPage(page, title);
  }

  removeFromLibrary() {
    const removeMovie = () => {
      this.apiService.removeMovieById(this.itemId).subscribe({
        next: result => {
          console.log('SUCESSFULLY DELETED');
        },
        error: error => {
          console.log(error);
        }
      });
    }

    const removeSerie = () => {
      this.apiService.removeSerieById(this.itemId).subscribe({
        next: result => {
          console.log('SUCESSFULLY DELETED');
        },
        error: error => {
          console.log(error);
        }
      });
    }

    const removeBook = () => {
      this.apiService.removeBookById(this.itemId).subscribe({
        next: result => {
          console.log('SUCESSFULLY DELETED');
        },
        error: error => {
          console.log(error);
        }
      });
    }

    switch (this.title) {
      case 'Filmes':
        removeMovie();
        break;
      case 'Séries':
        removeSerie()
        break;
      case 'Livros':
        removeBook()
        break;
      default:
        break;
    }
  }

  addToLibrary() {
    const addMovie = () => {
      this.apiService.getMovieById(this.itemId).subscribe({
        next: media => {
          console.log('MEDIA ALREADY IN LIBRARY');
        },
        error: error => {
          this.apiService.addMovie({id: this.itemId}).subscribe({
            next: result => {
              console.log(`Successfully added ${this.itemId} to library`);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      });
    }

    const addSerie = () => {
      this.apiService.getSerieById(this.itemId).subscribe({
        next: media => {
          console.log('MEDIA ALREADY IN LIBRARY');
        },
        error: error => {
          this.apiService.addSerie({id: this.itemId}).subscribe({
            next: result => {
              console.log(`Successfully added ${this.itemId} to library`);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      });
    }


    const addBook = () => {
      this.apiService.getBookById(this.itemId).subscribe({
        next: media => {
          console.log('MEDIA ALREADY IN LIBRARY');
        },
        error: error => {
          this.apiService.addBook({id: this.itemId}).subscribe({
            next: result => {
              console.log(`Successfully added ${this.itemId} to library`);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      });
    }

    switch (this.title) {
      case 'Filmes':
        addMovie();
        break;
      case 'Séries':
        addSerie()
        break;
      case 'Livros':
        addBook();
        break;
      default:
        break;
    }
  }
}
