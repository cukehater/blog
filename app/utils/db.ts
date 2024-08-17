import { MongoClient, ObjectId, OptionalId } from 'mongodb'

const URI: string = String(process.env.NEXT_MONGO_URI)

if (!URI) {
  throw new Error('Please set your MongoDB URI')
}

export const findAll = async (collection: string) => {
  const client: MongoClient = new MongoClient(URI)

  try {
    const db = (await client.connect()).db('blog')
    const result = await db.collection(collection).find().toArray()
    // const result = await db
    //   .collection(collection)
    //   .find({
    //     $or: [
    //       { title: { $regex: /javascript/i } },
    //       { description: { $regex: /javascript/i } }
    //     ]
    //   })
    //   .toArray()
    return result
  } finally {
    await client.close()
  }
}

export const findPosts = async (
  collection: string,
  search: string | boolean
) => {
  const client: MongoClient = new MongoClient(URI)

  try {
    const db = (await client.connect()).db('blog')
    const result = await db
      .collection(collection)
      .find(
        search
          ? {
              $or: [
                {
                  title: {
                    $regex: new RegExp(decodeURI(search as string), 'i')
                  }
                },
                {
                  description: {
                    $regex: new RegExp(decodeURI(search as string), 'i')
                  }
                }
              ]
            }
          : {}
      )
      .toArray()

    return result
  } finally {
    await client.close()
  }
}

export const findOne = async (collection: string, id: string) => {
  const client: MongoClient = new MongoClient(URI)

  try {
    const db = (await client.connect()).db('blog')
    const result = await db.collection(collection).findOne({
      _id: new ObjectId(id)
    })
    return result
  } finally {
    await client.close()
  }
}

export const findPrevOrNext = async (
  collection: string,
  id: string,
  direction: string
) => {
  const client: MongoClient = new MongoClient(URI)
  try {
    const db = (await client.connect()).db('blog')
    const result = await db
      .collection(collection)
      .find({
        _id:
          direction === 'prev'
            ? { $lt: new ObjectId(id) }
            : { $gt: new ObjectId(id) }
      })
      .sort({ _id: direction === 'prev' ? -1 : 1 })
      .limit(1)
      .toArray()
    return result
  } finally {
    await client.close()
  }
}

export const insertOne = async (
  collection: string,
  formData: OptionalId<Document>
) => {
  const client: MongoClient = new MongoClient(URI)
  try {
    const db = (await client.connect()).db('blog')
    const result = await db.collection(collection).insertOne(formData)
    return result
  } finally {
    await client.close()
  }
}

export const deleteOne = async (collection: string, id: string) => {
  const client: MongoClient = new MongoClient(URI)
  try {
    const db = (await client.connect()).db('blog')
    const result = await db.collection(collection).deleteOne({
      _id: new ObjectId(id)
    })
    return result
  } finally {
    await client.close()
  }
}

export const updateOne = async (
  collection: string,
  id: string,
  $set: Record<string, unknown>
) => {
  const client: MongoClient = new MongoClient(URI)
  try {
    const db = (await client.connect()).db('blog')
    const result = await db.collection(collection).updateOne(
      {
        _id: new ObjectId(id)
      },
      { $set }
    )
    return result
  } finally {
    await client.close()
  }
}
