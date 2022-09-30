let productsDao
let cartsDao
const config = 'firebase'

switch (config) {
    case 'json':
        const { default: ProductsDaoFile } = await import('./products/ProductsDaoFile.js')
        const { default: CartsDaoFile } = await import('./carts/CartsDaoFile.js')

        productsDao = new ProductsDaoFile()
        cartsDao = new CartsDaoFile()
        break
    case 'firebase':
        const { default: ProductsDaoFirebase } = await import('./products/ProductsDaoFirebase.js')
        const { default: CartsDaoFirebase } = await import('./carts/CartsDaoFirebase.js')

        productsDao = new ProductsDaoFirebase()
        cartsDao = new CartsDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductsDaoMongodb } = await import('./products/ProductsDaoMongodb.js')
        const { default: CartsDaoMongodb } = await import('./carts/CartsDaoMongodb.js')

        productsDao = new ProductsDaoMongodb()
        cartsDao = new CartsDaoMongodb()
        break
    default:
        break
}

export { productsDao, cartsDao }