import isExistingUser from '@utils/mongoose/isExistingUser';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;

        const findUser = await isExistingUser(user.id);
        if (!findUser) {
            res.status(404).json({ error: 'User not found' });
            return
        }

        const userProfile = {
            name: findUser.name,
            email: findUser.email,
            phone: findUser.phone,
            address: findUser.address,
            emailVerified: findUser.emailVerified,
            phoneVerified: findUser.phoneVerified,
            demographics: findUser.demographics,
            subscription: findUser.subscription,
            stripeCustomerId: findUser.stripeCustomerId,
        };

        res.json({ userProfile, message: 'Please complete additional fields if necessary' });
    } catch (error) {
        next(error);
    }
}); 

// To handle form submissions or additional profile data
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const { phone, address, demographics, ...otherFields } = req.body; // Add more fields as needed

        const findUser = await isExistingUser(user.id);
        if (!findUser) {
            res.status(404).json({ error: 'User not found' });
            return
        }

        findUser.phone = phone || findUser.phone;
        findUser.address = address || findUser.address;
        findUser.demographics = demographics || findUser.demographics;
        
        await findUser.save();

        res.status(200).json({ success: true, message: 'Profile updated successfully', updatedProfile: findUser });
    } catch (error) {
        next(error);
    }
});

export default router;
