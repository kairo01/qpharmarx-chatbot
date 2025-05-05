import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Message, SuggestedQuestion } from "./models/message";
import { AiService } from "./ai.service";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private suggestedQuestionsSubject = new BehaviorSubject<SuggestedQuestion[]>([]);
  public suggestedQuestions$ = this.suggestedQuestionsSubject.asObservable();

  constructor(private aiService: AiService) {
    // Initialize with the welcome message
    this.messagesSubject.next(this.aiService.getInitialMessages());

    // Initialize suggested questions
    this.updateSuggestedQuestions();
  }

  sendMessage(content: string): void {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    // Add user message to the list
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, userMessage]);

    // Set loading state
    this.loadingSubject.next(true);

    // Get AI response
    this.aiService.generateResponse(content).subscribe((aiResponse) => {
      const updatedMessages = this.messagesSubject.getValue();
      this.messagesSubject.next([...updatedMessages, aiResponse]);

      // Update suggested questions based on the conversation
      this.updateSuggestedQuestions();

      // Reset loading state
      this.loadingSubject.next(false);
    });
  }

  private updateSuggestedQuestions(): void {
    const questions = this.aiService.getSuggestedQuestions();
    const suggestedQuestions: SuggestedQuestion[] = questions.map((text, index) => ({
      id: `q-${index}`,
      text,
    }));
    this.suggestedQuestionsSubject.next(suggestedQuestions);
  }

  clearChat(): void {
    this.messagesSubject.next(this.aiService.getInitialMessages());
    this.updateSuggestedQuestions();
  }
}