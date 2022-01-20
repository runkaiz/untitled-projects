# How to run

## One-time setups

1. [Set up your PlanetScale developer environment](https://docs.planetscale.com/reference/planetscale-environment-setup).

Essentially, you need to install `pscale` and `mysql-client`.

2. Configure `pscale`.

Run `pscale auth login` and switch to the team where the database lives: `pscale org switch untitled-team`.

3. Create a `.env` file under the base directory for prisma.

```
DATABASE_URL="mysql://root@127.0.0.1:3309/untitled-db"
SHADOW_DATABASE_URL="mysql://root@127.0.0.1:3310/untitled-db"

# Run `npx prisma generate` everytime you update this file.
```

4. Run `npx prisma generate`.

## To run

1. Run `pscale connect untitled-db main --port 3309` to establish a connection to the db.

2. Run `npm run dev`.
