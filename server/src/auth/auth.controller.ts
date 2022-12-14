import { Body, Controller, Get, Post, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { CurrentUser } from 'src/dto/current-user.dto';
import { RegisterUserDto } from 'src/dto/registration/register-user.dto';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';



@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokenService: TokenService 
    ) {}
    


    @Get('/authenctification')
    @UseGuards(AuthGuard('refresh'))
    async auth(@Req() req: any) {
        return ['Hello', 'World!']
    }


    @Get('/reg-refresh-token')
    @Redirect('/authenctification', 301)
    @UseGuards(AuthGuard('access'))
    async refreshToken(@Req() req: any, @Res({ passthrough: true }) res: Response) {
        const token = await this.tokenService.getRefreshRegToken(req.user.id)

        const secretData = {
            token
        }

        res.clearCookie('access-cookie')
        res.cookie('auth-cookie', secretData, {httpOnly: true})

        return {...secretData}
    }


    @Get('/refresh-token')
    @UseGuards(AuthGuard('refresh'))
    async refreshTokens(@Req() req: any, @Res({ passthrough: true }) res: Response) {
        const token = await this.tokenService.getJwtToken(req.user as CurrentUser)
        const refreshToken = await this.tokenService.getRefreshToken(req.user.id)

        const secredData = {
            token,
            refresh_token: refreshToken
        }

        res.cookie('auth-cookie', secredData, {httpOnly: true})

        return { msg: 'success' }
    }



    
    @Post('/registration') 
    @Redirect('/reg-refresh-token', 301)
    async registration(
        @Req() req: any, @Res({ passthrough: true }) res: Response,
        @Body() registerDto: RegisterUserDto
    ) {
        const user = await this.authService.registration(registerDto)
        const token = await this.tokenService.getJwtRegToken(user)

        const secretData = {
            token
        }

        res.cookie('access-cookie', secretData, {httpOnly: true})

        return {user, ...secretData}
    }

    @Post('/')
    @UseGuards(AuthGuard('local'))
    async userValidation(@Req() req: any, @Res({ passthrough: true }) res: Response) {
        let token = await this.tokenService.getJwtToken((req.user as CurrentUser))
        let refresh_token = await this.tokenService.getRefreshToken(req.user.id)
    
        let secretData = {
            token,
            refresh_token: refresh_token
        }

        res.cookie('auth-cookie', secretData, {httpOnly: true})
        
        return secretData
    }
}

