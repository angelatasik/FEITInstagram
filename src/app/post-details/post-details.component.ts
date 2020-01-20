import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InstagramApiService } from '../_services/instagram-api.service';
import {AuthenticationService} from '../_services';


export interface DialogData {
  clickedPost: Post;
}

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postComments: PostComment[] = [];
  newComment: PostComment;
  currentUser: firebase.User;
  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<PostDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: InstagramApiService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.newComment= { id: this.data.clickedPost.id,
                      accountName: this.currentUser.email,
                      comment: '',
                      photoUrl: 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
                      fullName: this.currentUser.displayName};
      this.apiService.getPostComments(this.data.clickedPost.id)
          .subscribe((comments)=>{
            this.postComments = comments;
          });
    }

    onComment(){

      this.apiService.postComment(this.data.clickedPost.id,this.newComment)
      .subscribe(()=>{
        console.log("Posted new comment");
      });

      this.newComment.comment='';
    }
}
