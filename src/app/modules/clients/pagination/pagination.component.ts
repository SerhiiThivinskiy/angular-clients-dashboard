import { Component, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Output() currentPageChange: EventEmitter<number> = new EventEmitter();

  currentPage = 1;

  ngOnChanges(args) {
    this.currentPage = 1;
  }

  setCurrentPage(page: number | string) {
    if (!page || page === '0') {
      this.currentPage = 1;
      this.currentPageChange.emit(1);
    } else if (!page.toString().match(/[^0-9]/g)) {
      this.currentPage = Number(page);
      this.currentPageChange.emit(Number(page));
    }
  }

  increment() {
    this.setCurrentPage(this.currentPage + 1);
  }

  decrement() {
    this.setCurrentPage(this.currentPage - 1);
  }

}
