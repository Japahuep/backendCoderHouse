let productsDao
let cartsDao

switch (process.env.PERS) {
    case 'json':
        const { default: ProductsDaoFile } = await import('./products/ProductsDaoFile.js')
        const { default: CartsDaoFile } = await import('./carts/CartsDaoFile.js')

        productsDao = new ProductsDaoFile()
        cartsDao = new CartsDaoFile()
        break
    case 'firebase':
        
        break
    case 'mongodb':
        
        break
    case 'mariadb':
        
        break
    case 'sqlite3':
        
        break
    default:
        
        break
}

export { productsDao, cartsDao }