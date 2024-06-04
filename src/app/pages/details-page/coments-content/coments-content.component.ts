import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { STORAGE_KEYS, StorageService } from '../../../services/storage.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTE_NAMES } from '../../../app.routes';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-coments-content',
  standalone: true,
  imports: [
    CommonModule,
    NgbRatingModule
  ],
  templateUrl: './coments-content.component.html',
  styleUrl: './coments-content.component.css'
})
export class ComentsContentComponent implements OnInit {
  comments: any;
  mediaId: string;
  currentPage: string;
  username: string;
  showRemoveOption: boolean;

  constructor(
    private apiService: ApiService,
    private storagesService: StorageService,
    private navigationService: NavigationService
  ) {
    this.mediaId = '';
    this.currentPage = '';
    this.username = '';
    this.showRemoveOption = false;
    this.comments = [];
  }

  ngOnInit(): void {
    this.mediaId = `${this.storagesService.retrieveData(STORAGE_KEYS.currentMediaId)}`;
    this.currentPage = `${this.storagesService.retrieveData(STORAGE_KEYS.currentPage)}`;
    this.username = `${this.storagesService.retrieveData(STORAGE_KEYS.username)}`;

    const mediaComments = (): void => {
      this.comments = [];
      this.apiService.getAllCommentsByMediaId(this.mediaId).subscribe({
        next: comments => {
          comments.forEach((comment: { username: any; date: any; comment: any; rating: any}) => {
            this.comments.push({
              username: comment.username,
              date: comment.date,
              comment: comment.comment,
              rating: comment.rating
            });
          });
        },
        error: error => {
          console.log(error);
        }
      });
    };

    const userComments = (): void => {
      this.comments = [];
      this.apiService.getAllCommentsByUsername(this.username).subscribe({
        next: comments => {
          comments.forEach((comment: { id: any, username: any; date: any; comment: any; rating: any}) => {
            this.comments.push({
              id: comment.id,
              username: comment.username,
              date: comment.date,
              comment: comment.comment,
              rating: comment.rating
            });
          });
        },
        error: error => {
          console.log(error);
        }
      });
    };

    switch (this.currentPage) {
    case ROUTE_NAMES.details_page:
      this.showRemoveOption = false;
      mediaComments();
      break;
    case ROUTE_NAMES.user_page:
      this.showRemoveOption = true;
      userComments();
      break;
    default:
      break;
    }
  }

  removeComment(id: string): void {
    this.apiService.removeCommentById(id).subscribe({
      next: (): void => {
        console.log(`Removed ${id}`);
        this.navigationService.navigateToPage(this.currentPage, '');
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
