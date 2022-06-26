import 'dotenv/config'
import { config, createSchema }  from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Products';
import { ProductImage } from './schemas/ProductImage';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session'
import { insertSeedData } from './seed-data/index'

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // Hoe long we get co be connecter
  secret: process.env.COOKIE_SECRET
}

const { withAuth } = createAuth({
  listKey: 'User', 
  identityField: 'email', 
  secretField: 'password', 
  initFirstItem: {
    fields: ['name', 'email', 'password'], 
    //Todo : add roles 
  }
})

export default withAuth(
  config({
  //@ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL], 
      credentials: true,
    },
  }, 
  db: {
    adapter: 'mongoose', 
    url: databaseUrl, 
    async onConnect(keystone) {
      console.log('Connected to the DB 😎'); 
      if (process.argv.includes('--seed-data')){
        await insertSeedData(keystone); 
      }
    }
  }, 
  lists: createSchema({
    //Schema items go here
    User, 
    Product, 
    ProductImage,
  }), 
  ui: {
    //Show the UI only for people who pass this test
    isAccessAllowed: ({session}) => {
      return session?.data
    }, 
  }, 

  session: withItemData(statelessSessions(sessionConfig), {
    User : `id`
  })
}))