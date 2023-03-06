migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5d4pdgl666trvq")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5d4pdgl666trvq")

  collection.listRule = null

  return dao.saveCollection(collection)
})
