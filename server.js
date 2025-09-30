import { app, PORT } from "./src/app.js";

app.listen(PORT, () => {
  console.log(`app Is running on port ${PORT}`);
});
