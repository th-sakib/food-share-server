import "dotenv/config";
import { app } from "./app.js";
import connectDb from "./db/db.js";

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongodb connection error: ", error);
    process.exit(1); // Exit the process if the connection fails
  });
