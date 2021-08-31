class ApiMethodNotAllowed extends Error {
  constructor() {
    super();
    this.message = "Method not allowed";
  }
}

class NotAuthorized extends Error {
  constructor() {
    super();
    this.message = "Not authorized";
  }
}

export { ApiMethodNotAllowed, NotAuthorized };
