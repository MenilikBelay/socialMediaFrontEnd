import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: [
    './post-detail.component.css',
    '../../css/color.css',
    '../../css/responsive.css',
    '../../css/style.css',
    '../../css/strip.css',
  ],
})
export class PostDetailComponent implements OnInit, OnChanges {
  // @Input("post") post: Post;
  @Input('postTime') postTime: Date;
  @Input('noOflikedBy') noOflikedBy: number;
  @Input('creator') creator: any;
  @Input('content') content: string;
  @Input('imagePath') imagePath: string;
  @Input('noOfComments') noOfComments: number;
  @Input('postId') postId: string;
  likes: number = 0;
  toggler: boolean = true;
  // @Input("noOfComments") noOfComments: number;

  constructor(public postsService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.likes = this.noOflikedBy;
  }

  like(pid: string) {
    this.likes += (this.toggler ? 1 : -1);
    this.toggler = !this.toggler;
    this.postsService.addLike(pid);
  }
}
