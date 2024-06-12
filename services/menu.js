import nedb from 'nedb-promises'

const database = new nedb({filename: 'menu.db', autoload: true});

async function showMenu() {

    try {
        const menu = await database.find({})
        return menu
    } catch (error) {
        console.error(error)
    }
 
}

export default { showMenu }