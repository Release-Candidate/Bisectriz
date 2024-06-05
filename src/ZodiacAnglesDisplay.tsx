/*
 * SPDX-FileCopyrightText:  Copyright 2024 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Bisectriz
 * File:     ZodiacAnglesDisplay.tsx
 * Date:     01.Jun.2024
 *
 * =============================================================================
 * The component to display the result of bisecting two `ZodiacAngle`s.
 */

import * as z from "./zodiacs";
import Circle from "./circle";
import { Component } from "solid-js";

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
        <p
            class="m-2 rounded-md border-2 border-solid border-red-700 bg-gray-100 p-2 font-zodiac text-2xl"
            id="result_bisect">
            Bisectriz:
            <br />
            {z.zodiacAngleString(z.bisectZodiacAngle(props.z1, props.z2))}
        </p>
        <div id="result_circle">
            <Circle
                z1={z.zodiacAngle2Deg(props.z1)}
                z2={z.zodiacAngle2Deg(props.z2)}
                res={z.zodiacAngle2Deg(z.bisectZodiacAngle(props.z1, props.z2))}
            />
        </div>
    </>
);

export default ZodiacAnglesDisplay;
