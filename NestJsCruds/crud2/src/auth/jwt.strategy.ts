import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma.service";

export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(private readonly prismaService: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: {username: string}){
        const users = await this.prismaService.user.findUnique({
            where: {
                username: payload.username
            }
        })

        return users
    }
}