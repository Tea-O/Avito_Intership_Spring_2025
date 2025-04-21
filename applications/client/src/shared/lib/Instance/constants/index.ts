import type { HttpStatus } from '../types';

export const HTTP_CODE: HttpStatus = {
  UNKNOWN: {
    code: 0,
    message: 'Неизвестная ошибка',
  },
  SUCCESS: {
    OK: {
      code: 200,
      message: 'Запрос был успешно обработан и выполнен',
    },
    CREATED: {
      code: 201,
      message: 'Запрос был успешно выполнен, и в результате был создан новый ресурс',
    },
  },
  CLIENT_ERROR: {
    BAD_REQUEST: {
      code: 400,
      message: 'Сервер не может обработать запрос из-за ошибки клиента',
    },
    UNAUTHORIZED: {
      code: 401,
      message: 'Для доступа к запрашиваемому ресурсу требуется аутентификация',
    },
    FORBIDDEN: {
      code: 403,
      message: 'У вас нет прав для доступа к запрашиваемому ресурсу',
    },
    NOT_FOUND: {
      code: 404,
      message: 'Запрашиваемый ресурс не был найден на сервере',
    },
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: {
      code: 500,
      message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос',
    },
    NOT_IMPLEMENTED: {
      code: 501,
      message: 'Сервер не поддерживает функциональность, необходимую для выполнения запроса',
    },
    BAD_GATEWAY: {
      code: 502,
      message: 'Сервер, действующий как шлюз или прокси, получил недействительный ответ от вышестоящего сервера',
    },
    SERVICE_UNAVAILABLE: {
      code: 503,
      message: 'Сервер временно не может обработать запрос из-за перегрузки или обслуживания',
    },
  },
} as const;
