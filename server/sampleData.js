const products = [
  {
    id: '1',
    name: 'IPhone 13',
    slug: 'iphone13',
    price: '30000',
    description: 'This is a description IPhone 13',
    categories: ['1', '2']
  },
  {
    id: '2',
    name: 'IPhone 14',
    slug: 'iphone14',
    price: '50000',
    description: 'This is a description IPhone 14',
    categories: ['2']
  },
  {
    id: '3',
    name: 'Apple Watch 7',
    slug: 'apple-watch-7',
    price: '15000',
    description: 'This is a description Apple Watch 7',
    categories: ['1']
  },
  {
    id: '4',
    name: 'Apple Watch 6',
    slug: 'apple-watch-6',
    price: '12000',
    description: 'This is a description Apple Watch 6',
    categories: ['1']
  },
  {
    id: '5',
    name: 'MacBook',
    slug: 'macbook',
    price: '100000',
    description: 'This is a description MacBook',
    categories: ['1']
  }
]

const categories = [
  {
    id: '1',
    name: 'Laptops',
    slug: 'laptops',
  },
  {
    id: '2',
    name: 'Mobile',
    slug: 'mobile',
  },
]

const users = [
  {
    id: '1',
    email: 'hubytskyi@gmail.com',
    name: 'Mykola',
    role: 'admin',
    password: '1234',
  },
  {
    id: '2',
    email: 'test@gmail.com',
    name: 'Test',
    role: 'user',
    password: '12345',
  },
  {
    id: '3',
    email: 'test2@gmail.com',
    name: 'Test2',
    role: 'user',
    password: '123456',
  },
  {
    id: '4',
    email: 'test3@gmail.com',
    name: 'Test3',
    role: 'user',
    password: '1234567',
  },
  {
    id: '5',
    email: 'editor@gmail.com',
    name: 'Editor',
    role: 'editor',
    password: '1111',
  },
]

module.exports = {
  products,
  users,
  categories,
}