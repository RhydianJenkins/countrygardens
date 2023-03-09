migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5d4pdgl666trvq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qngcuz4a",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5d4pdgl666trvq")

  // remove
  collection.schema.removeField("qngcuz4a")

  return dao.saveCollection(collection)
})
