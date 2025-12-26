import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'mi_secreto_super_seguro', // Igual que en JwtModule
        });
    }

    async validate(payload: any) {
        // aquí puedes hacer validaciones extra o consultar base de datos si quieres
        return { id: payload.sub, username: payload.username, role: payload.role };
    }
}
