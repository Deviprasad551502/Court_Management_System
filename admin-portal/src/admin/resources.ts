import { ApiClientService } from './api-client.service.js';

export const buildAdminResources = (apiClient: ApiClientService) => [
  {
    resource: { name: 'States' },
    options: {
      navigation: 'Court Management',
      actions: {
        list: {
          handler: async () => {
            const data = await apiClient.get('/states');
            return {
              records: data.map((row) => ({
                params: row,
              })),
            };
          },
        },
      },
    },
  },

  {
    resource: { name: 'Courts' },
    options: {
      navigation: 'Court Management',
      actions: {
        list: {
          handler: async () => {
            const data = await apiClient.get('/courts');
            return {
              records: data.map((row) => ({
                params: row,
              })),
            };
          },
        },
      },
    },
  },
];
