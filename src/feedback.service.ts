import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  // Get all feedbacks from the database
  async getFeedbacks(): Promise<Feedback[]> {
    return await this.feedbackRepository.find();
  }

  // Add a new feedback to the database
  async addFeedback(email: string, text: string): Promise<Feedback> {
    const feedback = new Feedback();
    feedback.email = email;
    feedback.text = text;
    return await this.feedbackRepository.save(feedback);
  }
}
