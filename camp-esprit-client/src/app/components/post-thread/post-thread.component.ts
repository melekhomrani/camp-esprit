import { Component, OnInit } from '@angular/core';
import { Tag} from "../../models/Tag";
import { TagService} from "../../services/tag.service";

@Component({
  selector: 'app-post-thread', // Adjust selector as per your component
  templateUrl: './post-thread.component.html',
  styleUrls: ['./post-thread.component.css']
})
export class PostThreadComponent implements OnInit {

  tags: Tag[] = [];
  content: string = ''; // Assuming you have this for thread content

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.tagService.getAllTags().subscribe(
        tags => {
          this.tags = tags;
        },
        error => {
          console.error('Error loading tags:', error);
        }
    );
  }

  postThread(): void {
    // Implement your post thread logic here
  }
}
