/*
 * SPDX-FileCopyrightText:  Copyright 2024 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Bisectriz
 * File:     zodiacs.ts
 * Date:     30.May.2024
 *
 * =============================================================================
 */

/**
 * The 12 zodiac signs.
 */
export const enum Zodiacs {
    Aries,
    Taurus,
    Gemini,
    Cancer,
    Leo,
    Virgo,
    Libra,
    Scorpio,
    Sagittarius,
    Capricorn,
    Aquarius,
    Pisces,
}

/**
 * Constant to multiply the zodiac index with to get the angle in degrees.
 * Starting with Aries at 0°.
 */
const zodiacDegreeFactor = 30;

/**
 * Return the angle in degrees of the given zodiac, starting with aries at 0.
 * @param z The zodiac to get the angle of.
 * @returns The angle in degrees of the given zodiac, starting with aries at 0.
 */
export function zodiacDegrees(z: Zodiacs): number {
    return z * zodiacDegreeFactor;
}

/**
 * The name of the 12 zodiac sign in slovak.
 */
export const zodiacSlovak = [
    "baran",
    "býk",
    "bliženci",
    "rak",
    "lev",
    "panna",
    "váhy",
    "škorpion",
    "strelec",
    "kozorožec",
    "vodnár",
    "ryby",
];

/**
 * Return the slovak name of the given zodiac.
 * @param z The zodiac to get the slovak name of.
 * @returns The slovak name of the zodiac.
 */
export function zodiacString(z: Zodiacs): string {
    return zodiacSlovak[z];
}

/**
 * The Unicode symbols of the 12 zodiac signs.
 */
const zodiacSymbols = [
    "♈",
    "♉",
    "♊",
    "♋",
    "♌",
    "♍",
    "♎",
    "♏",
    "♐",
    "♑",
    "♒",
    "♓",
];

/**
 * Return the Unicode symbol of the given zodiac.
 * @param z The zodiac to get the symbol of.
 * @returns The Unicode symbol of the zodiac.
 */
export function zodiacSymbol(z: Zodiacs): string {
    return zodiacSymbols[z];
}

/**
 * A angle given in zodiac signs, degrees and minutes.
 * `z` is angle in as a zodiac sign, the angle in 30° increments,
 * `degrees` is the remainder of the angle in degrees should be between 0 and 30
 *  (exclusive),
 * `minutes` is the remainder of the angle in minutes.
 */
export type ZodiacAngle = {
    // eslint-disable-next-line lines-around-comment
    /**
     * The zodiac sign of the angle. This is a angle in 30° increments.
     */
    z: Zodiacs;

    /**
     * The part of the angle in degrees, should be between 0 and 30 (exclusive).
     */
    degrees: number;

    /**
     * The part of the angle in minutes, should be between 0 and 59 (exclusive).
     * A minute is 1/60 of a degree.
     */
    minutes: number;
};

/**
 * Return a string representation of the given `ZodiacAngle`.
 * @param a The `ZodiacAngle` to convert to a string.
 * @returns The string representation of the given `ZodiacAngle`.
 */
export function zodiacAngleString(a: ZodiacAngle): string {
    return `${zodiacString(a.z)} ${a.degrees}°${a.minutes}' ${zodiacSymbol(a.z)}`;
}

/**
 * Return the angle in degrees of the given `ZodiacAngle`.
 * @param a The `ZodiacAngle` to convert to degrees.
 * @returns The angle in degrees of the given `ZodiacAngle`.
 */
export function zodiacAngle2Deg(a: ZodiacAngle): number {
    // eslint-disable-next-line no-magic-numbers
    return (a.z * zodiacDegreeFactor + a.degrees + a.minutes / 60) % 360;
}

/**
 * Return the `ZodiacAngle` of the given angle in degrees.
 * @param angle The angle in degrees to convert to a `ZodiacAngle`.
 * @returns The `ZodiacAngle` of the given angle in degrees.
 */
export function deg2ZodiacAngle(angle: number): ZodiacAngle {
    // eslint-disable-next-line no-magic-numbers
    const z = Math.floor(angle / zodiacDegreeFactor) % 12;
    const degrees = Math.floor(angle % zodiacDegreeFactor);
    // Round two times, once to a factor of ten and then round again after / 10.
    const minutes = Math.round(
        // eslint-disable-next-line no-magic-numbers, @typescript-eslint/no-extra-parens
        Math.round(((angle - (z * zodiacDegreeFactor + degrees)) * 600) % 600) *
            // eslint-disable-next-line no-magic-numbers
            0.1,
    );
    return { z, degrees, minutes };
}

/**
 * Return the bisection of the angle between the two given `ZodiacAngle`s.
 * @param a The first `ZodiacAngle` of the angle to bisect.
 * @param b The second `ZodiacAngle` of the angle to bisect.
 * @returns The bisection of the angle between the two given `ZodiacAngle`s.
 */
export function bisectZodiacAngle(a: ZodiacAngle, b: ZodiacAngle): ZodiacAngle {
    const aDeg = zodiacAngle2Deg(a);
    const bDeg = zodiacAngle2Deg(b);
    // eslint-disable-next-line no-magic-numbers
    const cDeg = (aDeg + bDeg) * 0.5;
    return deg2ZodiacAngle(cDeg);
}
