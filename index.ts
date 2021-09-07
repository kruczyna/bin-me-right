import fastify from 'fastify'

const server = fastify()


interface IQuerystring {
  trashItem: string;
}

server.get<{
  Querystring: IQuerystring,
}>('/auth', {
  preValidation: (request, reply, done) => {
    const { trashItem } = request.query
    done(trashItem === 'poop' ? new Error('That is a bad word!') : undefined) // do not validate
  }
}
, async (request, reply) => {
  const { trashItem } = request.query

  return `You have to throw out ${trashItem} to the mixed bin`
})


server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
