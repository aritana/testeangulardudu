export class MediaComment {
  username: string;
  mediaType: string;
  mediaId: string;
  rating: string;
  date: string;
  comment: string;

  constructor(
    username: string,
    mediaType: string,
    mediaId: string,
    rating: string,
    date: string,
    comment: string
  ) {
    this.username = username;
    this.mediaType = mediaType;
    this.mediaId = mediaId;
    this.rating = rating;
    this.date = date;
    this.comment = comment;
  }
}

export class MediaCommentList {
  page: number;
  results: MediaComment[];
  total_pages: number;
  total_results: number;

  constructor(
    page: number,
    results: MediaComment[],
    total_pages: number,
    total_results: number,
  ) {
    this.page = page;
    this.results = results;
    this.total_pages = total_pages;
    this.total_results = total_results;
  }
}
