import { JwtService } from "@nestjs/jwt";
import { CurrentUser } from "src/dto/current-user.dto";
import * as ipify from 'ipify2';
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { InjectModel } from "@nestjs/sequelize";
import { Token } from "src/database/token.model";
import { User } from "src/database/user.model";
import { UsersService } from "src/users/users.service";
import { RegisterUserDto } from "src/dto/registration/register-user.dto";
import { CreateUserDetails } from "src/dto/creating/create-details.dto";



export class TokenService {
    constructor(
        private JwtService: JwtService,
        @InjectModel(Token) private tokenRepository: typeof Token,
        @InjectModel(User) private userRepository: typeof User
    ) {}



        /* JWT  */
    async getJwtToken(currentUser: CurrentUser): Promise<string> {
        let payload = {
            id: currentUser.id,
            email: currentUser.email
        }

        return this.JwtService.signAsync(payload)
    }


        /* JWT Reg Token */
    async getJwtRegToken(userModel: User): Promise<string> {
        let payload = {
            id: userModel.id,
            first_name: userModel.first_name,
            role_in_company: userModel.role_in_company,
            email: userModel.email
        }

        return this.JwtService.signAsync(payload)
    }


        /* Refresh Token for registration */
    async getRefreshRegToken(id: number) {
        const userDataToCreate = {
            refresh_token: randomToken.generate(40),
            refresh_token_exp: moment().day(62).format('YYYY/MM/DD'),
        }

        return await this.tokenRepository.upsert({
            userId: id,
            refresh_token: userDataToCreate.refresh_token,
            refresh_token_exp: moment().day(62).format('YYYY/MM/DD'),
            ip_address: (await ipify.ipv4()).toString()
        })
    }


        /* Refresh Token for login*/
    async getRefreshToken(id: number): Promise<string> {
        const userDataToUpdate = {
            refresh_token: randomToken.generate(40),
            refresh_token_exp: moment().day(62).format('YYYY/MM/DD'),
        }

        await this.tokenRepository.update({
            refresh_token: userDataToUpdate.refresh_token,
            refresh_token_exp: userDataToUpdate.refresh_token_exp,
            ip_address: (await ipify.ipv4()).toString()
        }, {where: {id: id}})

        return userDataToUpdate.refresh_token
    }


        /* Refresh Token's validation */
    async validateRefreshToken(email: string, refresh_roken: string): Promise<CurrentUser> {
        const currentDate = moment().day(62).format('YYYY/MM/DD')
        
        let user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        if(!user) {
            return null
        }

        let userToken = await this.tokenRepository.findOne({
            where: {
                refresh_token: refresh_roken,
                refresh_token_exp: currentDate
            }
        })
        if(!userToken) {
            return null
        }


        let currentUser = new CurrentUser()
        currentUser.id = user.id
        currentUser.first_name = user.first_name
        currentUser.last_name = user.last_name
        currentUser.role_in_company = user.role_in_company
        currentUser.email = user.email

        return currentUser
    }
}