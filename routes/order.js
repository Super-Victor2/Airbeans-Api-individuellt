import { Router } from 'express';
import { nanoid } from 'nanoid';
import { cart } from '../config/data.js';
import nedb from 'nedb-promises';

let totalyprice = 0;
const database = new nedb({ filename: 'order.db', autoload: true });
const userDatabase = new nedb({ filename: 'register.db', autoload: true });

const router = Router();

function totalPrice() {
    totalyprice = cart.reduce((sum, item) => sum + item.price, 0);
}

router.get('/', (req, res) => {
    totalPrice();
    res.json({ cart, totalyprice });
});

// ORDER COFFEE
router.post('/', async (req, res) => {
    totalPrice();
    const { name, quantity, userId, price, total } = req.body;

    if (userId) {
        const loggedInUser = await userDatabase.findOne({ _id: userId });

        if (!loggedInUser) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const addCoffee = {
            id: cart.length + 1,
            orderId: nanoid(),
            name,
            quantity,
            userId,
            price,
            total,
        };

        cart.push(addCoffee);
        await database.insert(addCoffee);

        const userOrders = await database.find({ userId });
        const totalQuantity = userOrders.reduce((acc, order) => acc + order.quantity, 0);

        function getDeliveringTime(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const randomNumber = getDeliveringTime(10, 60);
        console.log(`Your coffee will be delivered in about ${randomNumber} minutes`);

        totalPrice();

        res.json({
            success: true,
            message: 'Coffee added successfully',
            name,
            quantity,
            userId,
            order: addCoffee,
            userOrders,
            total: totalQuantity,
            totalprice: totalyprice,
        });
        console.log(`Total price is ${totalyprice}`);
    } else {
        return res.status(400).json({ error: 'You must provide a user ID' });
    }
});

export default router;
