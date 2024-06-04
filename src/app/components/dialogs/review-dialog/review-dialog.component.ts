import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { STORAGE_KEYS, StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbRatingModule
  ],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {

  comment: string;
  rating: number;
  errorMessage: string;
  hasSendErrors: boolean;

  constructor(
    private dialogRef: MatDialogRef<ReviewDialogComponent>,
    private storageService: StorageService,
    private apiService: ApiService
  ) {
    this.comment = '';
    this.errorMessage = '';
    this.hasSendErrors = false;
    this.rating = 0;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  sendReview(): void {
    if (this.rating === 0 || this.comment === '') {
      this.errorMessage = 'Por favor preencha todos os campos';
      this.hasSendErrors = true;
      console.log(this.errorMessage);
      return;
    }

    this.apiService.addComment({
      'username': `${this.storageService.retrieveData(STORAGE_KEYS.username)}`,
      'mediaType': `${this.storageService.retrieveData(STORAGE_KEYS.currentMediaType)}`,
      'mediaId': `${this.storageService.retrieveData(STORAGE_KEYS.currentMediaId)}`,
      'rating': `${this.rating}`,
      'date': Date.now().toString(),
      'comment': this.comment
    }).subscribe({
      next: () => {
        this.closeDialog();
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
