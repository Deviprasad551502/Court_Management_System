import { Module } from '@nestjs/common';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
import type { AdminModuleOptions } from '@adminjs/nestjs';
import { ApiClientModule } from './api-client.module.js';
import { ApiClientService } from './api-client.service.js';
import { buildAdminResources } from './resources.js';

@Module({
  imports: [
    ApiClientModule,
    AdminJsModule.createAdminAsync({
      imports: [ApiClientModule],
      inject: [ApiClientService],
      useFactory: async (
        apiClient: ApiClientService,
      ): Promise<AdminModuleOptions> => {
        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: buildAdminResources(apiClient),
          },
          auth: {
            authenticate: async (email: string, password: string) => {
              try {
                const token = await apiClient.login(email, password);
                apiClient.setToken(token);
                return { email };
              } catch {
                return null;
              }
            },
            cookieName: 'adminjs',
            cookiePassword: 'adminjs-secret',
          },
          sessionOptions: {
            resave: false,
            saveUninitialized: false,
            secret: 'adminjs-session',
          },
        };
      },
    }),
  ],
})
export class AdminModule {}
