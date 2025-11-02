// common-helper.ts
class CommonHelper {
  /**
   * Send API request with authentication
   */
  static sendAPIRequest(
    method: string,
    url: string,
    body?: string | object,
    headers?: Record<string, string>
  ) {
    return cy.request({
      method,
      url,
      ...(body && { body }),
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(headers || {}),
      },
      failOnStatusCode: false,
    });
  }

  /**
   * Cleanup - delete multiple records
   */
  static cleanup(endpoint: string, ids: number[]) {
    return this.sendAPIRequest("DELETE", endpoint, { ids });
  }
}

export { CommonHelper };