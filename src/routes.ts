import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-fedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';


export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodeMailerMailAdapter();

  const submitFeedbackuseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackuseCase.execute({
    type,
    comment,
    screenshot
  });


  return res.status(201).send();
});