import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AvatarComponent } from "../avatar/avatar.component";
import { Message } from "../models/message";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
  standalone: true,
  imports: [CommonModule, AvatarComponent],
})
export class MessageComponent {
  @Input() message!: Message;
}