import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ChatService } from "../chat.service";

@Component({
  selector: "app-user-input",
  templateUrl: "./user-input.component.html",
  styleUrls: ["./user-input.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UserInputComponent {
  messageText = "";
  isLoading = false;

  constructor(private chatService: ChatService) {
    this.chatService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  sendMessage(): void {
    if (this.messageText.trim() && !this.isLoading) {
      this.chatService.sendMessage(this.messageText);
      this.messageText = "";
    }
  }
}