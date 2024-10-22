import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  // Logic to retrieve user account info
  res.send('Account route');
});

export default router;
