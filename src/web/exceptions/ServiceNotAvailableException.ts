/**
 * The thrown exception when the external API service is not available,
 * either because of a bad network connection or out of service.
 */
export class ServiceNotAvailableException extends Error {
  constructor() {
    super();
  }
}
