import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Message } from "./models/message";

@Injectable({
  providedIn: "root",
})
export class AiService {
  private readonly INITIAL_MESSAGES: Message[] = [
    {
      id: "1",
      content: "Hello! I'm your QPharmaRx assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ];

  private readonly SUGGESTED_QUESTIONS = [
    "What medications are available for high blood pressure?",
    "How do I refill my prescription?",
    "What are the side effects of ibuprofen?",
  ];

  constructor() {}

  getInitialMessages(): Message[] {
    return this.INITIAL_MESSAGES;
  }

  getSuggestedQuestions(): string[] {
    return this.SUGGESTED_QUESTIONS;
  }

  // Simulate AI response with realistic pharmacy-related responses
  generateResponse(userMessage: string): Observable<Message> {
    let response = "";
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes("high blood pressure") || lowercaseMessage.includes("hypertension")) {
      response =
        "Common medications for high blood pressure include ACE inhibitors like lisinopril, ARBs like losartan, calcium channel blockers like amlodipine, and diuretics like hydrochlorothiazide. It's important to take these medications as prescribed and monitor your blood pressure regularly.";
    } else if (lowercaseMessage.includes("refill") || lowercaseMessage.includes("prescription")) {
      response =
        "To refill your prescription, you can use our mobile app, call our pharmacy directly, or visit in person. Make sure to have your prescription number ready. We typically need 24-48 hours to process refills.";
    } else if (lowercaseMessage.includes("ibuprofen") || lowercaseMessage.includes("side effects")) {
      response =
        "Common side effects of ibuprofen include stomach pain, heartburn, nausea, vomiting, headache, dizziness, and mild rash. Serious side effects, though rare, can include stomach bleeding, kidney problems, and allergic reactions. Always take as directed and consult your doctor if you experience concerning symptoms.";
    } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
      response = "Hello! How can I assist you with your pharmacy needs today?";
    } else {
      response =
        "Thank you for your question. As a pharmacy assistant, I can provide information about medications, side effects, prescription refills, and general health advice. Could you please provide more details about your question so I can give you a more specific answer?";
    }

    const message: Message = {
      id: Date.now().toString(),
      content: response,
      role: "assistant",
      timestamp: new Date(),
    };

    // Simulate network delay
    return of(message).pipe(delay(1000));
  }
}