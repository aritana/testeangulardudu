import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coments-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coments-content.component.html',
  styleUrl: './coments-content.component.css'
})
export class ComentsContentComponent implements OnInit {
  comments: any;

  constructor() {
    this.comments = [];
  }

  ngOnInit(): void {
    this.comments = [
      {
        username: 'john_doe',
        comment: 'This is a great post!',
        date: new Date('2023-05-30T14:22:00')
      },
      {
        username: 'jane_smith',
        comment: 'I learned a lot from this article. Thanks!',
        date: new Date('2023-05-31T10:15:00')
      },
      {
        username: 'jane_smith',
        comment: 'I learned a lot from this article. Thanks!',
        date: new Date('2023-05-31T10:15:00')
      },
      {
        username: 'jane_smith',
        comment: 'I learned a lot from this article. Thanks!',
        date: new Date('2023-05-31T10:15:00')
      },
      {
        username: 'jane_smith',
        comment: 'I learned a lot from this article. Thanks!',
        date: new Date('2023-05-31T10:15:00')
      }
    ];
  }
}
