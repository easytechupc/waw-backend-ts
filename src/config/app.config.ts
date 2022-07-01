import * as packageJson from "../../package.json";

export const AppConfig = () => ({
  name: packageJson.name,
  title: packageJson.title,
  description: packageJson.description,
  version: packageJson.version,
  port: Number(process.env.PORT) || 3000,
});
