import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {InstagramApiService} from '../_services/instagram-api.service';
import {PostDetailsComponent} from '../post-details/post-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public currentUser;
  title = 'FEIT Workshop';
  pageNumber: number=1;
  posts: Post[] = [];

  constructor(public dialog: MatDialog, private apiService: InstagramApiService) {
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.getPosts();
  }

  onClick(post: Post){
    const dialogRef = this.dialog.open(PostDetailsComponent, {
      width: '750px',
      height: '700px',
      data: {clickedPost: post}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // // this.animal = result;
    });
  }

  onLoadMore(){
    this.pageNumber++;
    this.getPosts();
  }

  getPosts(){
    this.apiService.getPosts(this.pageNumber).subscribe((receivedPosts)=>{
      this.posts = receivedPosts;
    });
  }

  ngOnInit() {

  }

}
