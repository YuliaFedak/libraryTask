import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())
    app.setGlobalPrefix('api')
    app.use((req: any, res: any, next: any) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
