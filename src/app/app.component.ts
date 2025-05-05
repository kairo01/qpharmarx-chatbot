import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatWindowComponent } from "./chat-window/chat-window.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [CommonModule, ChatWindowComponent],
})
export class AppComponent {
  title = "qpharmarx-chatbot";
}