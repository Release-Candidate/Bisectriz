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
 * The name of the 12 zodiac sign in slovak.
 */
const zodiacSlovak = [
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
export const zodiacSymbols = [
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
