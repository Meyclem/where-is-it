export class ApiMethodNotAllowed extends Error {
  constructor() {
    super();
    this.message = "Method not allowed";
  }
}

export class NotAuthorized extends Error {
  constructor() {
    super();
    this.message = "Not authorized";
  }
}
