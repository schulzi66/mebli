import { Injectable } from '@angular/core';
import { AngularFirestore, SetOptions } from '@angular/fire/compat/firestore';
import { FieldPath, WhereFilterOp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DbPaths } from '../models/db-paths.enum';

@Injectable({
    providedIn: 'root',
})
export class DbService {
    public constructor(private readonly firestore: AngularFirestore) {}

    public getDoc$<T>(path: DbPaths, pathSegments: string): Observable<T | undefined> {
        return this.firestore.doc<T>(this.builPath(path, pathSegments)).valueChanges();
    }

    public setDoc<T>(path: DbPaths, pathSegments: string, data: T, options?: SetOptions): Promise<void> {
        return this.firestore.doc<T>(this.builPath(path, pathSegments)).set(data, options ?? {});
    }

    public updateDocument<T>(path: DbPaths, pathSegments: string, data: Partial<T>): Promise<void> {
        return this.firestore.doc<T>(this.builPath(path, pathSegments)).update(data);
    }

    public deleteDocument<T>(path: DbPaths, pathSegments: string): Promise<void> {
        return this.firestore.doc<T>(this.builPath(path, pathSegments)).delete();
    }

    public getDocs$<T>(
        path: DbPaths,
        fieldPath: string | FieldPath,
        whereFilter: WhereFilterOp,
        value: unknown
    ): Observable<T[]> {
        return this.firestore
            .collection<T>(path, (ref) => {
                return ref.where(fieldPath, whereFilter, value);
            })
            .valueChanges();
    }

    private builPath(path: DbPaths, pathSegments: string): string {
        return `${path}/${pathSegments}`;
    }
}
