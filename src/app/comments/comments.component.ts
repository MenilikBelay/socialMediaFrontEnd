import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PostService } from '../services/post.service';
import { Post } from '../services/post.model';
declare var $: any;

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: [
    "./comments.component.css",
    "../../css/color.css",
    "../../css/responsive.css",
    "../../css/style.css",
    "../../css/strip.css",
  ],
})
export class CommentsComponent implements OnInit {
  @Input('postId') postId: string;
  @Input('comments') comments: any [];
  post: Post;
  isLoading = false;
  
  postid: string;
  content: string;

  constructor(public postsService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
//     $(".post-comt-box textarea").on("keydown", function(event) {

//     if (event.keyCode == 13) {
//       var comment = $(this).val();
//       var parent = $(".showmore").parent("li");
//       var comment_HTML = '	<li><div class="comet-avatar"></div><div class="we-comment"><div class="coment-head"><h5><a href="time-line.html" title="">{{this.comments.commentedBy.firstName}}</a></h5><span> moments ago</span><a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a></div><p>{{comments.comment}}</p></div></li>';
//       $(comment_HTML).insertBefore(parent);
//       $(this).val('');
// 	}
// }); 
  }
  onEnter(content: string, postId: string) {
    // if (this.form.invalid) {
    //   return;
    // }
    this.isLoading = true;
    console.log(content);
    console.log(postId);
    // console.log(this.postid);
    this.postsService.addComment(content, postId);
    this.isLoading = false;
    
  }
  updateId(input: string) {
    this.postid = input;
  }
}
