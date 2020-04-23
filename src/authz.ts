// Copyright 2018 The Casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Enforcer } from "casbin"
import { Request, Response } from "express"

// BasicAuthorizer class stores the casbin handler
class BasicAuthorizer {
    req: Request;
    res: Response;
    enforcer: Enforcer;
    constructor(req: Request, res: Response, enforcer: Enforcer) {
        this.req = req
        this.res = res
        this.enforcer = enforcer
    }

    // getUserName gets the user name from the request.
    // Currently, only HTTP basic authentication is supported
    getUserName(): string {
        if (this.res.locals.username != undefined) return this.res.locals.username;

        try {
            const header: string = this.req.get("Authorization");
            if (header != undefined) {
                const arr: Array<string> = header.split(" ");
                if (arr[0].trim() == "Basic") {
                    const value: string = Buffer.from(arr[1], 'base64').toString('ascii');
                    const tempArr: Array<string> = value.split(":");
                    return tempArr[0];
                } else {
                    return "";
                }
            } else {
                return "";
            }
        } catch (e) {
            console.log(e);
            return "";
        }

    }

    // checkPermission checks the user/method/path combination from the request.
    // Returns true (permission granted) or false (permission forbidden)
    async checkPermission(): Promise<boolean> {
        const { req, enforcer } = this
        const { originalUrl: path, method } = req
        const user = this.getUserName()
        const isAllowed = await enforcer.enforce(user, path, method)
        return isAllowed
    }
}

// authz returns the authorizer, uses a Casbin enforcer as input
export default function authz(newEnforcer: Promise<Enforcer>) {
    return async (req: Request, res: Response, next): Promise<void> => {
        const enforcer: Enforcer = await newEnforcer;
        if (!(enforcer instanceof Enforcer)) {
            res.status(500).json({ 500: 'Invalid enforcer' })
            return
        }
        const authzorizer = new BasicAuthorizer(req, res, enforcer)
        const isAllowed = await authzorizer.checkPermission()
        if (!isAllowed) {
            res.status(403).json({ 403: 'Forbidden' })
            return
        }
        next()
    }
}


