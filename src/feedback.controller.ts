import { Controller, Get, Post, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';

@Controller('api/feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Route to get all feedbacks
  @Get()
  async getAllFeedbacks(): Promise<Feedback[]> {
    return this.feedbackService.getFeedbacks();
  }

  // Route to add a new feedback
  @Post()
  async addFeedback(
    @Body('email') email: string,
    @Body('text') text: string,
  ): Promise<Feedback> {
    return this.feedbackService.addFeedback(email, text);
  }
}
