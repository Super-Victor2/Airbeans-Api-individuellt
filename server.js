import express from 'express'
import cors from 'cors'
import aboutRouter from './routes/about.js'
import authRouter from './routes/auth.js'
import historyRouter from './routes/orderHistory.js'
import orderRouter from './routes/order.js'
import menuRouter from './routes/menu.js'

// Start the server
const app = express();
const PORT = 8070;
global.user = null

//Middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use('/about', aboutRouter)
app.use('/auth', authRouter)
app.use('/history', historyRouter)
app.use('/order', orderRouter)
app.use('/menu', menuRouter)




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


