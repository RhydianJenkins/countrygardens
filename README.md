# Country Gardens

This is an ecommerce site for Country Gardens.

## Getting Started

Rename `.env.example` to `.env` and fill in the parameters.

```bash
npm run dev # start the front end server
pocketbase migrate && pocketbase serve # start the database server
```

You should then be able to go to `http://localhost:3000` and see the home page.

## Database management

I followed [these instructions](https://github.com/pocketbase/pocketbase/discussions/537) to set up my fly.io/pocketbase instance.

The db is managed by [PocketBase](https://pocketbase.io/) and is self hosted. When you `pocketbase migrate` a `pb_data` directory is created which will store your database.

A dockerfile is provided to deploy an instance of this database to [fly.io](https://fly.io/). Follow these

[Install flyctl](https://fly.io/docs/hands-on/install-flyctl) then run the following

```bash
flyctl auth signup # Create a fly.ui account
flyctl auth login # Log in
flyctl launch --dockerfile ./src/docker/Dockerfile.pb # Set up the remote machine with our image

# ... follow setup prompts, *SAYING NO TO SETTIP UP A DATABASE AND DEPLOYING*

flyctl volumes create pb_data --size=1 # Create an instance to store the database
flyctl deploy # Deploy to that instance
```

