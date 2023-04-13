import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  isLoading: boolean = false;
  searchResults:  Array<any>;
  isResults: boolean = false;


  allSearchedResult: Array<any>;
  
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private apiService: ApiService) {
    this.bookSearch = new FormControl('');
    this.searchResults = [];
    this.allSearchedResult = [];

    this.bookSearch.valueChanges.subscribe(searchTerm => {
      if(searchTerm.length > 0){
        this.isLoading = true
      }
      // if(searchTerm.length > 0 && this.searchResults.length === 0){
      //   this.isResults = true
      // }
    });
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    //this.searchResults = [];
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe((value: string) => {
        this.currentPage = 1;
        this.apiService.searchBooks(value).subscribe((results: any) => {
          // console.log(results,'------')
          this.searchResults = results.docs;
         
          this.isLoading = false;
          this.isResults = results.docs.length === 0 ? true : false
        });
      });
  }

  
  
}
