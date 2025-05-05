import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatService } from "../chat.service";
import { MessageComponent } from "../message/message.component";
import { SuggestedQuestionsComponent } from "../suggested-questions/suggested-questions.component";
import { UserInputComponent } from "../user-input/user-input.component";
import { Message } from "../models/message";

@Component({
  selector: "app-chat-window",
  templateUrl: "./chat-window.component.html",
  styleUrls: ["./chat-window.component.scss"],
  standalone: true,
  imports: [CommonModule, MessageComponent, SuggestedQuestionsComponent, UserInputComponent],
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @ViewChild("messagesContainer") private messagesContainer!: ElementRef;
  messages: Message[] = [];
  isLoading = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
    });

    this.chatService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onQuestionSelected(question: string): void {
    this.chatService.sendMessage(question);
  }

  closeChat(): void {
    console.log("Chat closed");
    this.chatService.clearChat();
  }
}