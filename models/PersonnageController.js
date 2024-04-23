export default class Personnage {

    constructor(sousraces_id, origines_id, sousclasses_id, users_id, nom, id, user, sousclasses) {

        this._sousraces_id = sousraces_id;

        this._origines_id = origines_id;

        this._sousclasses_id = sousclasses_id;

        this._users_id = users_id;

        this._nom = nom;

        this._id = id;

        this._user = user;

        this._sousclasses = sousclasses;
    }

    get sousraces_id() {
        return this._sousraces_id
    }

    get origines_id() {
        return this._origines_id
    }

    get sousclasses_id() {
        return this._sousclasses_id
    }

    get users_id() {
        return this._users_id
    }

    get nom() {
        return this._nom
    }

    get id() {
        return this._id
    }


    get user() {
        return this._user;
    }

    get sousclasses() {
        return this._sousclasses;
    }

    toJSON() {
        return {
            sousraces_id: this._sousraces_id,
            origines_id: this._origines_id,
            sousclasses_id: this._sousclasses_id,
            users_id: this._users_id,
            nom: this._nom,
            id: this._id,
            user: this._user,
            sousclasses: this._sousclasses
        };
    }
}


