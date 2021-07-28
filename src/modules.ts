import { JwtModule } from "@nestjs/jwt"
import { UserModule } from "./user/user.module"


export const modules = [
    UserModule
    // JwtModule.register({
    //     secret: process.env.JWT_SECRET_KEY
    // })
]