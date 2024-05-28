**Startex-Task**

This is the backend for a task of Startex can add books and be a seller and buyer. The backend is built using Node.js, Express, and Prisma.

**Project Setup**

1. **Clone the Repository**: First, you need to clone the repository. You can do this by running the following command in your terminal:

```bash
git clone https://github.com/Siva20021/Startex-Task.git
```

2. **Install Dependencies**: Next, you need to navigate to the project directory and install the dependencies. For this project, you'll need Express, Prisma, and a few other packages. You can install them by running the following command:

```bash
cd Startex-Task
npm install
```

3. **Set up Environment Variables**: The project uses environment variables to configure the database and other settings. You need to create a `.env` file in the root of the project and add the following variables:

```bash
DATABASE_URL=postgresql://postgres:test@localhost:5432/startex?schema=public
```

4. **Generate Prisma Client**: After installing the dependencies, you need to generate the Prisma client. You can do this by running the following command in your terminal:

```bash
npx prisma generate
```

5. **Start the Server**: Finally, you can start the server by running the following command:

```bash
npm start
```

The server will start on the port specified in the `.env` file.

**Video**

[Click here to watch the video](https://www.loom.com/share/81b103ec75fe4249b3c2aef8153aa1e0?sid=049776f1-1b21-4c53-ae62-93944a25a10f)

