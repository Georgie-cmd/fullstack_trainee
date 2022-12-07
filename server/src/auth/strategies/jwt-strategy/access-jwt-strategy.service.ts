import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/database/user.model";



export class AccessJwtStrategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        super({
            ignoreExpiration: false, 
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    let secretData = request?.cookies['access-cookie']

                    return secretData?.token
                }
            ])
        })
    }


    async validate(payload: User) {
        if(!payload) {
            return new UnauthorizedException()
        }

        return payload
    }
}