import { prisma } from "../../config/prisma";
import {
    comparePassword,
    hashPassword,
} from "../../utils/hash";

import { signToken } from "../../utils/jwt";

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {

    const exists = await prisma.user.findUnique({
        where: { email }
    });

    if (exists) {
        throw new Error("Email already exists");
    }

    const passwordHash =
        await hashPassword(password);

    const user =
        await prisma.user.create({
            data: {
                name,
                email,
                passwordHash
            }
        });

    return user;
};

export const loginUser = async (
    email: string,
    password: string
) => {

    const user =
        await prisma.user.findUnique({
            where: { email }
        });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const valid =
        await comparePassword(
            password,
            user.passwordHash
        );

    if (!valid) {
        throw new Error("Invalid credentials");
    }

    return {
        token: signToken(user.id)
    };
};