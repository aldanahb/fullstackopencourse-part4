const initialUsers = [
  {
    name: 'Ada Lovelace',
    username: 'adal',
    password: 'secret1'
  },
  {
    name: 'Grace Hopper',
    username: 'hopper',
    password: 'secret2'
  },
  {
    name: 'Linus Torvalds',
    username: 'torvalds',
    password: 'linux123'
  },
  {
    name: 'Alan Turing',
    username: 'aturing',
    password: 'machine'
  },
  {
    name: 'Margaret Hamilton',
    username: 'mhamilton',
    password: 'apollo'
  },
  {
    name: 'Dennis Ritchie',
    username: 'dritchie',
    password: 'clang'
  },
  {
    name: 'Ken Thompson',
    username: 'kthompson',
    password: 'unix'
  }
]

const invalidUsers = [
    {name: 'Anna', password: 'secret'}, 
    {name: 'Charles', username: 'ch', password: 'secret1'}, 
    {name: 'Ken', username: 'ken55'}, 
    {name: 'Alan', username: 'alan5', password: '33'}
]

module.exports = {initialUsers, invalidUsers}