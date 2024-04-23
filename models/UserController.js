export default class User {

    constructor(id, name, email, email_verified_at, password, remember_token, created_at, update_at, administrateur) {

        this._id = id;

        this._name = name;

        this._email = email;

        this._email_verified_at = email_verified_at;

        this._password = password;

        this._remember_token = remember_token;

        this._created_at = created_at;

        this._update_at = update_at;

        this._administrateur = administrateur;
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get email() {
        return this._email
    }

    get email_verified_at() {
        return this._email_verified_at
    }

    get password() {
        return this._password
    }

    get remember_token() {
        return this._remember_token
    }

    get created_at() {
        return this._created_at
    }

    get update_at() {
        return this._update_at
    }

    get administrateur() {
        return this._administrateur
    }


    toJSON() {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
            email_verified_at: this._email_verified_at,
            password: this._password,
            remember_token: this._remember_token,
            created_at: this._created_at,
            update_at: this._update_at,
            administrateur: this._administrateur,
        }
    }
}


