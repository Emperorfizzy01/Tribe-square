"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Codemania Assessment')
        .setDescription('A simple social media platform')
        .setVersion('2.0')
        .addTag('users')
        .build();
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.use((0, helmet_1.default)());
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const PORT = process.env.port || 3000;
    app.enableCors();
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map