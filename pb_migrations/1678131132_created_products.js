migrate((db) => {
  const collection = new Collection({
    "id": "s5d4pdgl666trvq",
    "created": "2023-03-06 19:32:12.108Z",
    "updated": "2023-03-06 19:32:12.108Z",
    "name": "products",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nyu2q1iz",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": 255,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "6imrnqyr",
        "name": "value",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("s5d4pdgl666trvq");

  return dao.deleteCollection(collection);
})
