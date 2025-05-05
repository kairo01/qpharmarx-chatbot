import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatService } from "../chat.service";
import { SuggestedQuestion } from "../models/message";

@Component({
  selector: "app-suggested-questions",
  templateUrl: "./suggested-questions.component.html",
  styleUrls: ["./suggested-questions.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class SuggestedQuestionsComponent implements OnInit {
  @Output() questionSelected = new EventEmitter<string>();
  suggestedQuestions: SuggestedQuestion[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.suggestedQuestions$.subscribe((questions) => {
      this.suggestedQuestions = questions;
    });
  }

  onQuestionClick(question: string): void {
    this.questionSelected.emit(question);
  }
}