import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Ensure transformation is enabled
      whitelist: true, // Strips properties that do not have decorators
    }),
  );
  // await CommandFactory.run(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SimpleStudy API')
    .setDescription('SimpleStudy API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  // Enable CORS with detailed configuration and logging
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost',
        'https://next.simplestudy.ie',
        'https://simplestudy.ie',
        'https://next.simplestudy.cloud',
        'https://simplestudy.cloud',
        'https://simplestudy.io',
        'https://simplestudy.uk',
      ];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        console.log('Origin not allowed by CORS:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // get PORT env value
  await app.listen(process.env.BACKEND_APP_PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
