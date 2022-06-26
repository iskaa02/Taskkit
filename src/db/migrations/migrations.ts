import { schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";
import ToVersion2 from "./version2";

export default schemaMigrations({
  migrations: [ToVersion2],
});
