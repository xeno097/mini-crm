# Mini Crm

## Description

Mini crm is a simple nestjs project that allows to manage clients that can have multiple addresses.

## How to run the project

With npm installed on your machine, install project dependencies running the following command:

```cmd
npm i
```

Create a `.env` file in the root of the project that holds the following variables:

- `PORT`: the port where the project will be running.
- `DB_URI`: the mongodb uri used to connect the project to a mongodb database.
- `ACCESS_TOKEN_SECRET`: the string used to encode the jwt.
- `ACCESS_TOKEN_EXP`: the jwt expiration time.

### Production mode

```cmd
npm run start:prod
```

### Development mode

The following command runs the project with hot reload enabled so thata everytime a new change is saved, the project automatically restarts with the new changes loaded.

```cmd
npm run start:dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
