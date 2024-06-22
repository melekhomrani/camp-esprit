import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-thread',
  templateUrl: './post-thread.component.html',
  styleUrls: ['./post-thread.component.css']
})
export class PostThreadComponent {
  @Output() newThread = new EventEmitter<any>();
  content: string = '';
  selectedFile: File | null = null;

  postThread(): void {
    if (this.content) {
      const reader = new FileReader();
      reader.onload = () => {
        const thread = {
          id: Date.now(),
          user: 'Arij Arfaoui',
          avatarUrl: "",
          content: this.content,
          imageUrl: this.selectedFile ? reader.result as string : null,
          likes: 0,
          comments: []
        };
        this.newThread.emit(thread);
        this.content = '';
        this.selectedFile = null;
      };
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.newThread.emit({
          id: Date.now(),
          user: 'Arij Arfaoui',
          avatarUrl: '',
          content: this.content,
          likes: 0,
          comments: []
        });
        this.content = '';
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }
}
