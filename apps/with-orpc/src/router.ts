import tasksRoutes from '#features/tasks/routes';
import { orpc } from '#lib/orpc';
import { securityHeadersMiddleware } from '#middleware/security-headers';

export default orpc.use(securityHeadersMiddleware).router({
  ...tasksRoutes,
});
