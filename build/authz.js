"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const casbin_1 = require("casbin");
// authz returns the authorizer, uses a Casbin enforcer as input
function authz(newEnforcer) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const enforcer = yield newEnforcer;
        if (!(enforcer instanceof casbin_1.Enforcer)) {
            res.status(500).json({ 500: 'Invalid enforcer' });
            return;
        }
        const authzorizer = new BasicAuthorizer(req, res, enforcer);
        const isAllowed = yield authzorizer.checkPermission();
        if (!isAllowed) {
            res.status(403).json({ 403: 'Forbidden' });
            return;
        }
        next();
    });
}
exports.default = authz;
// BasicAuthorizer class stores the casbin handler
class BasicAuthorizer {
    constructor(req, res, enforcer) {
        this.req = req;
        this.res = res;
        this.enforcer = enforcer;
    }
    // getUserName gets the user name from the request.
    // Currently, only HTTP basic authentication is supported
    getUserName() {
        if (this.res.locals.username != undefined)
            return this.res.locals.username;
        let header = this.req.get("Authorization");
        if (header != "undefined") {
            let arr = header.split(" ");
            if (arr[0].trim() == "Basic") {
                let value = Buffer.from(arr[1], 'base64').toString('ascii');
                let tempArr = value.split(":");
                return tempArr[0];
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    }
    // checkPermission checks the user/method/path combination from the request.
    // Returns true (permission granted) or false (permission forbidden)
    checkPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            const { req, enforcer } = this;
            const { originalUrl: path, method } = req;
            const user = this.getUserName();
            const isAllowed = yield enforcer.enforce(user, path, method);
            return isAllowed;
        });
    }
}
//# sourceMappingURL=authz.js.map