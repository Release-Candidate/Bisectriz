/*
 * SPDX-FileCopyrightText:  Copyright 2024 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Bisectriz
 * File:     ZodiacAnglesDisplay.tsx
 * Date:     01.Jun.2024
 *
 * ==============================================================================
 */

import * as z from "./zodiacs";
import { Component } from "solid-js";
import { circle } from "./assets/circle";

/**
 * Return the `ZodiacAnglesDisplay` component as JSX.
 * Contains the text display of the bisect of two `ZodiacAngle`s and the circle
 * of zodiacs displaying the two `ZodiacAngle`s as two lines and the bisect
 * angle of these.
 * @param props The two `ZodiacAngle`s to display.
 * @returns The `ZodiacAnglesDisplay` component as JSX.
 */
// eslint-disable-next-line func-style
const ZodiacAnglesDisplay: Component<{
    z1: z.ZodiacAngle;
    z2: z.ZodiacAngle;
}> = (props) => (
    <>
        <div class="m-4 bg-orange-200 p-8">
            <p class="text-2xl font-bold">
                Bisectriz:
                <br />
                {z.zodiacAngleString(z.bisectZodiacAngle(props.z1, props.z2))}
            </p>
        </div>
        <div id="circle">{circle}</div>
    </>
);

export default ZodiacAnglesDisplay;
