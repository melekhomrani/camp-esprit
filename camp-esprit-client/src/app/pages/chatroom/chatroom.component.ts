// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Client } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import {ChatService} from "../../services/chat/chat.service";
//
// @Component({
//   selector: 'app-chatroom',
//   templateUrl: './chatroom.component.html',
//   styleUrls: ['./chatroom.component.css']
// })
// export class ChatRoomComponent implements OnInit {
//
//   chatRoomId: number;
//   messages: any[] = [];
//   newMessage: string = '';
//   private stompClient: Client | undefined;
//
//   constructor(private route: ActivatedRoute, private chatService: ChatService) {
//     this.chatRoomId = this.route.snapshot.params['id'];
//   }
//
//   ngOnInit(): void {
//     this.loadMessages();
//     this.initializeWebSocketConnection();
//   }
//
//   loadMessages() {
//     this.chatService.getMessages(this.chatRoomId).subscribe(data => {
//       this.messages = data;
//     });
//   }
//
//   initializeWebSocketConnection() {
//     const socket = new SockJS('http://localhost:8080/ws');
//     this.stompClient = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str)
//     });
//
//     this.stompClient.onConnect = (frame) => {
//       console.log('Connected: ' + frame);
//       this.stompClient!.subscribe(`/topic/public`, (message) => {
//         if (message.body) {
//           this.messages.push(JSON.parse(message.body));
//         }
//       });
//     };
//
//     this.stompClient.onStompError = (frame) => {
//       console.error('Broker reported error: ' + frame.headers['message']);
//       console.error('Additional details: ' + frame.body);
//     };
//
//     this.stompClient.activate();
//   }
//
//   sendMessage() {
//     const message = {
//       content: this.newMessage,
//       sender: 'User',  // Replace with actual sender
//       chatRoomId: this.chatRoomId
//     };
//     this.stompClient!.publish({
//       destination: '/app/chat.sendMessage',
//       body: JSON.stringify(message)
//     });
//     this.newMessage = '';
//   }
// }
