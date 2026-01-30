import { app, PORT } from "./src/app.js";

app.listen(PORT, () => {
  console.log(`Server Is running on port http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
});
