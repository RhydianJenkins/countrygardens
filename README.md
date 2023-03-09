# Country Gardens

This is an ecommerce site for Country Gardens.

## Getting Started

Rename `.env.example` to `.env` and fill in the parameters.

```bash
pocketbase serve # start the database server
npm i # install dependencies
npm run dev # start the front end server
```
Go to `http://127.0.0.1:8090/_/` and set up your admin account for the database. You will only need to do this once.

You should then be able to go to `http://localhost:3000` and see the home page.

## Database Setup

I followed [these instructions](https://github.com/pocketbase/pocketbase/discussions/537) to set up my fly.io/pocketbase instance.

The db is managed by [PocketBase](https://pocketbase.io/) and is self hosted. When you `pocketbase migrate` a `pb_data` directory is created which will store your database.

A dockerfile is provided to deploy an instance of this database to [fly.io](https://fly.io/). Follow these instructions to [Install flyctl](https://fly.io/docs/hands-on/install-flyctl) then run the following:

```bash
flyctl auth signup # Create a fly.ui account
flyctl auth login # Log in
flyctl launch --dockerfile ./src/docker/Dockerfile.pb # Set up the remote machine with our image

# ... follow setup prompts, *SAYING NO TO SETTING UP A DATABASE AND DEPLOYING*

flyctl volumes create pb_data --size=1 # Create an instance to store the database
flyctl deploy # Deploy to that instance. Run this command again to apply config changes
```

## Database Migrations

Generate a local `pb_migrations` file, upload to fly.io, execute.

```bash
# Register ssh key with local agent (if you haven't already)
flyctl ssh issue --agent

# Proxies connections to a fly VM through a Wireguard tunnel
flyctl proxy 10022:22

# Tar a copy of your locally generated migrations
tar cvzf path/to/local/pb_migrations

# Copy them to fly VM
scp -r -P 10022 path/to/local/pb_migrations.tar.gz root@localhost:/pb/pb_migraions.tar.gz

# SSH into fly VM
flyctl ssh console

# Execute migration
cd pb && ./pocketbase migrate
```
