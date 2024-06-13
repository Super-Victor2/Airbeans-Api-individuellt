import { Router } from 'express';
import db from '../services/menu.js';
import { authenticateUser, isAdmin } from '../middlewares/validateAdmin.js';

const router = Router();

// Get request for all menu items
router.get('/', authenticateUser, isAdmin, async (req, res) => {
    try {
        const menu = await db.find({});
        res.send(menu);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Post new menu item
router.post('/', authenticateUser, isAdmin, async (req, res) => {
    const { id, title, desc, price } = req.body;

    if (id && title && desc && price) {
        const createdAt = new Date();
        const newMenuItem = { id, title, desc, price, createdAt };
        try {
            const newDoc = await db.insert(newMenuItem);
            res.status(201).json(newDoc);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(400).send('New menu item could not be created, missing requirement.');
    }
});

// Make special offer
router.post('/', authenticateUser, isAdmin, async (req, res) => {
  try {
      const cappuccino = await db.findOne({ title: 'Cappuccino' });
      const cortado = await db.findOne({ title: 'Cortado' });

      if (cappuccino && cortado) {
          res.json({ offer: 'Special offer: Cappuccino and Cortado for 40kr' });
      } else {
          res.status(400).send('Offer cannot be made, required items not found.');
      }
  } catch (error) {
      res.status(500).send(error);
  }
});


// Update a menu item
router.put('/menu/:id', authenticateUser, isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMenuItem = req.body;

  try {
      const numUpdated = await db.update({ id }, { $set: updatedMenuItem });
      if (numUpdated === 0) {
          return res.status(404).send('Menu item not found');
      }
      
      updatedMenuItem.modifiedAt = new Date();
      res.json(updatedMenuItem);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Remove menu item
router.delete('/menu/:id', authenticateUser, isAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const numRemoved = await db.remove({ id });
        if (numRemoved === 0) return res.status(404).send('Menu item not found');
        res.status(200).json({ id });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
