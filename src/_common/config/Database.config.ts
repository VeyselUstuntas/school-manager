import { registerAs } from "@nestjs/config";
import entities from "../typeorm";

//konfigürasyon grubu oluşturmak için kullanılır. 
// .env de tanımlanan ayarları çeker 
export default registerAs('database', () => ({
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: entities, // entity ler alınır
    synchronize: true, // yapılan entity değişlikliklerini db ye yansıtır. 
}));