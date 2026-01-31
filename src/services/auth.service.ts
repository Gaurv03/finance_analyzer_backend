import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    public async signup(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password } = req.body;

            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            const existingUser = await this.userRepository.findOne({ where: { email } });
            if (existingUser) {
                throw new Error("User already exists with this email");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = this.userRepository.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            await this.userRepository.save(user);

            // Remove password from response for security
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error: any) {
            console.error(" [AuthService signup Error]: ", error.message);
            throw error;
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new Error("Invalid email or password");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid email or password");
            }

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                console.error("JWT_SECRET is not defined in environment variables");
                throw new Error("Internal server error");
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                secret,
                {
                    expiresIn: '1d',
                    algorithm: "HS256"
                }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            const { password: _, ...userWithoutPassword } = user;
            return { user: userWithoutPassword, token };
        } catch (error: any) {
            console.error(" [AuthService login Error]: ", error.message);
            throw error;
        }
    }

    public async logout(req: Request, res: Response) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            return { message: "Logged out successfully" };
        } catch (error: any) {
            console.error(" [AuthService logout Error]: ", error.message);
            throw error;
        }
    }
}

export default new AuthService();

