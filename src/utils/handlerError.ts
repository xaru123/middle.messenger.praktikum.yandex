import { Notification } from '../components/notification';
import { parseJson } from './parseJson';
import { router } from '../router';

export function handlerError(data: XMLHttpRequest) {
  if (!data.response) {
    return router.go('/500');
  }
  const { reason } = parseJson(data);
  new Notification('danger', reason);
  return Promise.reject(data);
}
