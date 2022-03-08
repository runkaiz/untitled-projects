# To migrate

After updating `prisma/schema.prisma`, run the following commands to create branches for migration.

`pscale branch create untitled-db <branch-name>`
`pscale branch create untitled-db shadow`

Establish connections:

`pscale connect untitled-db <branch-name> --port 3309`
`pscale connect untitled-db shadow --port 3310`

Under the base directory,

`npx prisma migrate dev name --<commit_name>`

Then,

`pscale deploy-request create untitled-db <branch-name>`

Review the deploy request (web). Clean up branches.

Disconnect from current connections and establish a new one:

`pscale connect untitled-db main --port 3309`

Optional:

`npx prisma studio` to examine database tables.
