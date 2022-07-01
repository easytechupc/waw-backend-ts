import "dotenv/config";
import { DataSource } from "typeorm";

import { DatabaseConfig } from "./database.config";

const config = DatabaseConfig();

export default new DataSource(config);
