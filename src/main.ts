import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
   app.enableCors({
        origin: "*",  // Altere para seu domínio final em produção
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    });
  const configSwagger = new DocumentBuilder()
    .setTitle('BackEnd Teste para Site SebbyGames')
    .setDescription('Aplicação com endpoints, gerenciando usuarios e outras funcionalidades')
    .setVersion('1.0')
    .addTag('endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document); 
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforma automaticamente os tipos para o tipo correto
    whitelist: true, // Remove qualquer propriedade que não esteja no DTO
  }));
  await app.listen(process.env.PORT || 3000);
  console.log(`server on in port 3000`)
}
bootstrap();
