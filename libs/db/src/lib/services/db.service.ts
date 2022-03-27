import { Injectable } from '@angular/core';
import { AngularFirestore, SetOptions } from '@angular/fire/compat/firestore';
import { FieldPath, OrderByDirection, WhereFilterOp } from 'firebase/firestore';
import { lastValueFrom, map, Observable, take } from 'rxjs';
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

    public deleteDocumentBy<T>(
        path: DbPaths,
        fieldPath: string | FieldPath,
        whereFilter: WhereFilterOp,
        value: unknown
    ): Promise<void> {
        return this.firestore
            .collection<T>(path, (ref) => {
                return ref.where(fieldPath, whereFilter, value);
            })
            .doc()
            .delete();
    }

    public getDocs$<T>(
        path: DbPaths,
        fieldPath: string | FieldPath,
        whereFilter: WhereFilterOp,
        value: unknown,
        orderByPath?: string | FieldPath,
        directionStr?: OrderByDirection
    ): Observable<T[]> {
        return this.firestore
            .collection<T>(path, (ref) => {
                return orderByPath === undefined
                    ? ref.where(fieldPath, whereFilter, value)
                    : ref.where(fieldPath, whereFilter, value).orderBy(orderByPath, directionStr);
            })
            .valueChanges();
    }

    public docExists<T>(
        path: DbPaths,
        fieldPath: string | FieldPath,
        whereFilter: WhereFilterOp,
        value: unknown
    ): Promise<boolean> {
        return lastValueFrom(
            this.firestore
                .collection<T>(path, (ref) => {
                    return ref.where(fieldPath, whereFilter, value);
                })
                .get()
                .pipe(
                    take(1),
                    map((doc) => doc.size > 0)
                )
        );
    }

    public generateId(): string {
        return this.firestore.createId();
    }

    private builPath(path: DbPaths, pathSegments: string): string {
        return `${path}/${pathSegments}`;
    }
}
