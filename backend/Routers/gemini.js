import express from 'express';
import { rewritingSentence } from '../Controllers/geminiController.js';

const router = express.Router();

router.post('/rewriting', rewritingSentence);

export default router;