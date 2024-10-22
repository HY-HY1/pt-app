import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  // Logic for user login
  res.send('Login route');
});

export default router;
