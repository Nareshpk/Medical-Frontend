import { Injectable } from '@angular/core';

import { Person } from '../minerva/data/entities/person';

@Injectable()
export class ModelLocator {
    private static _instance: ModelLocator = null;

    // Return the instance of the service
    public static get instance(): ModelLocator {
        if (ModelLocator._instance === null) {
            ModelLocator._instance = new ModelLocator();
        }
        return ModelLocator._instance;
    }

    constructor() {
        return (ModelLocator._instance = ModelLocator._instance || this);
    }

    leaId: string = '';
    minervaUser: Person;

    isAppDataDirty: boolean = false;
}
