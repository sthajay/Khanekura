export class User {
    //firebase ko token 1 hour ma expire hunxa
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) { }

    //getter only because we dont want to set the token ourself
    get token() {
        if (!this._tokenExpirationDate || new Date > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}