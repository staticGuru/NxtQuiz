import { CustomRequest } from '@backend/core/ports/event-tracking-port.interface';

export function createCustomRequest(
  init: RequestInit,
  customProps: Partial<CustomRequest>,
): CustomRequest {
  const req = new Request('https://simplestudy.ie', init) as CustomRequest;
  return Object.assign(req, customProps);
}
