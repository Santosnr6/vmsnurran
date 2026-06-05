import { z } from 'zod';

export const validateGameInput = (score) => {
    const scoreSchema = z.object({
        homeScore : z
            .number()
            .min(0, 'Hemmalagets mål måste vara 0 eller fler'),
        awayScore : z
            .number()
            .min(0, 'Hemmalagets mål måste vara 0 eller fler'),
    });

    const result = scoreSchema.safeParse(score);
    return result;
}

export const validateLoginInput = (credentials) => {
    const loginSchema = z.object({
        username: z.string().min(6, 'Användarnamn måste bestå av minst 6 tecken'),
        password: z.string().min(6, 'Lösenord måste bestå av minst 6 tecken'),
    });

    const result = loginSchema.safeParse(credentials);
    return result;
};

export const validateRegisterInput = (userData) => {
    const registerSchema = z.object({
        firstName: z.string().min(2, 'Förnamn måste bestå av minst 2 tecken'),
        lastName: z.string().min(2, 'Efternamn måste bestå av minst 2 tecken'),
        username: z.string().min(6, 'Användarnamn måste bestå av minst 6 tecken'),
        password: z.string().min(6, 'Lösenord måste bestå av minst 6 tecken'),
    });

    const result = registerSchema.safeParse(userData);
    return result;
};

export const validateTextInput = (value) => {
    const textSchema = z.string().min(2, 'Fältet måste bestå av minst 2 tecken');
    const result = textSchema.safeParse(value);
    return result;
};

export const validateNumberInput = (value) => {
    const numberSchema = z.number().min(0, 'Nummer måste vara 0 eller fler');
    const result = numberSchema.safeParse(value);
    return result;
};


