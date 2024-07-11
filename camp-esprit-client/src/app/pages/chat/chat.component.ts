// chat.component.ts
import { Component, OnInit } from '@angular/core';
import {Message} from "../../models/Message";
import {ChatService} from "../../services/chat/chat.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: Message[] = [];
  sender: string = 'User' + Math.floor(Math.random() * 1000);

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages(1).subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage({ content: this.message, sender: this.sender });
      this.message = '';
    }
  }
}
