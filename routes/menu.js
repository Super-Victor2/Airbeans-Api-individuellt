import { Router } from 'express'
import { authenticateUser, isAdmin } from '../middlewares/validateAdmin.js';
import { showMenu } from '../services/menu.js'

const router = Router()


// Get request for all menu items
router.get('/', authenticateUser, isAdmin, async(req, res) => { 
  const menu = await showMenu()
  res.json({menu : menu})
});

// Post new menu item
router.post('/', authenticateUser, isAdmin, (req, res) => {
  const { id, title, desc, price } = req.body;

  if (id && title && desc && price) {
      const createdAt = new Date();
      const newMenuItem = { id, title, desc, price, createdAt };
      menu.push(newMenuItem);
      res.status(201).json(newMenuItem);
  } else {
      res.status(400).send('New menu item could not be created.');
  }
});

router.put('/menu/:id', (req, res) => {
  const id = req.params.id;
  const updatedMenuItem = req.body;

  if (menu[id]) {
    menu[id] = updatedMenuItem;
    updatedMenuItem.modifiedAt = new Date();
    res.json(updatedMenuItem);
  } else {
    res.status(404).send('Menu item not found');
  }
});


// Remove menu item
router.delete('/menu/:id', authenticateUser, isAdmin, (req, res) => {
  const id = req.params.id;
  const deleteMenuItem = menu.splice(id, 1);
  res.status(200).json(deleteMenuItem)
})

// Menu data
const menu = [
    {
      "id":1,
      "title":"Bryggkaffe",
      "desc":"Bryggd på månadens bönor.",
      "price":39
    },
    {
      "id":2,
      "title":"Caffè Doppio",
      "desc":"Bryggd på månadens bönor.",
      "price":49
    },
    {
      "id":3,
      "title":"Cappuccino",
      "desc":"Bryggd på månadens bönor.",
      "price":49
    },
    {
      "id":4,
      "title":"Latte Macchiato",
      "desc":"Bryggd på månadens bönor.",
      "price":49
    },
    {
      "id":5,
      "title":"Kaffe Latte",
      "desc":"Bryggd på månadens bönor.",
      "price":54
    },
    {
      "id":6,
      "title":"Cortado",
      "desc":"Bryggd på månadens bönor.",
      "price":39
    }
  ]





export default router
