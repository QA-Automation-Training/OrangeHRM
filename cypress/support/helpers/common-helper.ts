class CommonHelper {
  static sendAPIRequest(
    method: string,
    url: string,
    body?: string | object,
    header?: Record<string, string>
  ) {
    return cy
      .request({
        method,
        url,
        ...(body && { body }),
        headers: {
          ...(body ? { "Content-Type": "application/json" } : {}),
          ...(header || {}),
        },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        return response;
      });
  }

  static cleanup(URL: string, ids: number[]) {
    return this.sendAPIRequest("DELETE", URL, {
      ids,
    });
  }
}
export { CommonHelper }