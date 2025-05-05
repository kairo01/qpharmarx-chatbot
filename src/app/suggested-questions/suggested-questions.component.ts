import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatService } from "../chat.service";
import type { SuggestedQuestion } from "../models/message";

@Component({
  selector: "app-suggested-questions",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./suggested-questions.component.html",
  styleUrls: ["./suggested-questions.component.scss"]
})
export class SuggestedQuestionsComponent implements OnInit, AfterViewInit {
  @Output() questionSelected = new EventEmitter<string>();
  suggestedQuestions: SuggestedQuestion[] = [];

  @ViewChild("scrollContainer", { static: false }) scrollContainerRef!: ElementRef;

  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;

  constructor(private chatService: ChatService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.chatService.suggestedQuestions$.subscribe((questions) => {
      this.suggestedQuestions = questions;
    });
  }

  ngAfterViewInit(): void {
    const container = this.scrollContainerRef.nativeElement;

    this.renderer.listen(container, "mousedown", (e: MouseEvent) => {
      this.isDown = true;
      container.classList.add("active");
      this.startX = e.pageX - container.offsetLeft;
      this.scrollLeft = container.scrollLeft;
    });

    this.renderer.listen("window", "mouseup", () => {
      this.isDown = false;
      container.classList.remove("active");
    });

    this.renderer.listen(container, "mouseleave", () => {
      this.isDown = false;
      container.classList.remove("active");
    });

    this.renderer.listen(container, "mousemove", (e: MouseEvent) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - this.startX) * 2; // scroll speed
      container.scrollLeft = this.scrollLeft - walk;
    });
  }

  onQuestionClick(question: string): void {
    this.questionSelected.emit(question);
  }
}
