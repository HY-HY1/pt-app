import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  // Logic for user registration
  res.send('Register route');
});

export default router;
