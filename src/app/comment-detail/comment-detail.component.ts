import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css',
    "../../css/color.css",
    "../../css/responsive.css",
    "../../css/style.css",
    "../../css/strip.css",]
})
export class CommentDetailComponent implements OnInit {
  // @Input("commentTime") commentTime: Date;
  // @Input("commentedBy") commentedBy: string;
  // @Input("comment") comment: any;
  constructor() { }

  ngOnInit(): void {
  }

}
