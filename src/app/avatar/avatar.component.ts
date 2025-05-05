import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class AvatarComponent {
  @Input() isAi = true;
}