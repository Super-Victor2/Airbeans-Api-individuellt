import nedb from 'nedb-promises';

const database = new nedb({ filename: 'order.db', autoload: true });

export async function findOrdersByUserId(userId) {
    return await database.find({ userId }, { coffeeId: 0 });
}

export default { findOrdersByUserId };
