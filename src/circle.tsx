/*
 * SPDX-FileCopyrightText:  Copyright 2024 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Bisectriz
 * File:     circle.tsx
 * Date:     04.Jun.2024
 *
 * =============================================================================
 * The component to display the result of bisecting two `ZodiacAngle`s in a
 * drawing.
 */

import * as z from "./zodiacs";
import { Component, For, Match, Switch } from "solid-js";

/**
 * The `Point` type, a 2D vector with x and y coordinates.
 */
type Point = { x: number; y: number };

/**
 * The radius of the outermost circle.
 */
const circleRadius = 250;

/**
 * The width of the ring containing the zodiac signs.
 */
const ringWidth = 40;

/**
 * The radius of the inner circle of the outer ring containing the zodiac signs.
 */
const circleRadiusInner = circleRadius - ringWidth;

/**
 * The center of the circle.
 */
const circleCenter: Point = { x: circleRadius + 1, y: circleRadius + 1 };

/**
 * The size of the SVG's view port.
 */
const viewPortSize = 2 * circleRadius + 2;

/**
 * The angle between two detail scale lines in degrees.
 */
const lineDegree = 5;

/**
 * The number of detail scale lines.
 */
const numLines = 360 / lineDegree;

/**
 * The length of the short detail scale lines.
 */
const lineLength = 10;

/**
 * The length of the long detail scale lines, which are shown every 10 degrees.
 */
const lineLength10 = 15;

/**
 * The offset in degrees of the first zodiac sign - aries. Counterclockwise from
 * "12 o'clock".
 */
const startOffset = 90;

/**
 * The midpoint of the first zodiac sign - aries.
 * It counterclockwise after "12 o'clock" by `z.zodiacDegreeFactor / 2` degrees.
 */
const signStartPoint = rotateAroundCenter(
    { x: circleCenter.x, y: ringWidth / 2 },
    circleCenter,
    z.zodiacDegreeFactor / 2,
);

/**
 * Rotate the `Point` `p` around the `Point` `center` by `angle` degrees.
 * @param p The `Point` to rotate around the given `center`.
 * @param center The center of the rotation.
 * @param angle The angle in degrees to rotate.
 * @returns The point `p` rotated by `angle` degrees around `center`.
 */
function rotateAroundCenter(p: Point, center: Point, angle: number): Point {
    const tP = {
        x: p.x - center.x,
        y: p.y - center.y,
    };
    // eslint-disable-next-line @typescript-eslint/no-extra-parens
    const rad = (angle / 180.0) * Math.PI;
    const rotTP = {
        x: tP.x * Math.cos(rad) + tP.y * Math.sin(rad),
        y: -tP.x * Math.sin(rad) + tP.y * Math.cos(rad),
    };
    return {
        x: rotTP.x + center.x,
        y: rotTP.y + center.y,
    };
}

/**
 * Return the `Circle` component, which is a drawing of a circle of zodiacs, the
 * two given angels and the bisection of the two angles, as JSX.
 * @param props The props holding the two angles and the bisection of the two in
 *              degrees.
 * @returns The `Circle` component as JSX.
 */
// eslint-disable-next-line func-style
const Circle: Component<{
    z1: number;
    z2: number;
    res: number;
}> = (props) => (
    <svg viewBox={0 + " " + 0 + " " + viewPortSize + " " + viewPortSize}>
        <g class="fill-none stroke-black stroke-2" id="circles_with_signs">
            <circle
                cx={circleCenter.x}
                cy={circleCenter.y}
                r={circleRadius}
                id="outer"
            />
            <circle
                cx={circleCenter.x}
                cy={circleCenter.y}
                r={circleRadiusInner}
                id="inner2"
            />

            <For each={Array.from({ length: 12 })}>
                {(_, i) => (
                    <>
                        <g
                            transform={
                                "rotate(" +
                                i() * z.zodiacDegreeFactor +
                                "," +
                                circleCenter.x +
                                "," +
                                circleCenter.y +
                                ")"
                            }>
                            <line
                                x1={circleCenter.x}
                                y1={0}
                                x2={circleCenter.x}
                                y2={ringWidth}
                            />
                        </g>
                        <text
                            text-anchor="middle"
                            dominant-baseline="central"
                            class="font-zodiac text-2xl"
                            {...(rotateAroundCenter(
                                signStartPoint,
                                circleCenter,
                                i() * z.zodiacDegreeFactor + startOffset,
                            ) as Object)}>
                            {z.zodiacSymbol(i())}
                        </text>
                    </>
                )}
            </For>
            <For each={Array.from({ length: numLines })}>
                {(_, i) => (
                    <>
                        <g
                            transform={
                                "rotate(" +
                                i() * lineDegree +
                                "," +
                                circleCenter.x +
                                "," +
                                circleCenter.y +
                                ")"
                            }>
                            <Switch>
                                <Match when={(i() * lineDegree) % 10 === 0}>
                                    <line
                                        x1={circleCenter.x}
                                        y1={ringWidth}
                                        x2={circleCenter.x}
                                        y2={ringWidth + lineLength10}
                                    />
                                </Match>
                                <Match when={(i() * lineDegree) % 10 !== 0}>
                                    <line
                                        x1={circleCenter.x}
                                        y1={ringWidth}
                                        x2={circleCenter.x}
                                        y2={ringWidth + lineLength}
                                        stroke-width={1}
                                    />
                                </Match>
                            </Switch>
                        </g>
                    </>
                )}
            </For>
        </g>
        <g stroke-width="5" id="angles">
            <g
                transform={
                    "rotate(" +
                    -((props.z1 + startOffset) % 360) +
                    "," +
                    circleCenter.x +
                    "," +
                    circleCenter.y +
                    ")"
                }
                class="fill-none stroke-emerald-200"
                id="angle1">
                <line
                    x1={circleCenter.x}
                    y1={ringWidth}
                    x2={circleCenter.x}
                    y2={circleCenter.y}
                />
            </g>
            <g
                transform={
                    "rotate(" +
                    -((props.z2 + startOffset) % 360) +
                    "," +
                    circleCenter.x +
                    "," +
                    circleCenter.y +
                    ")"
                }
                class="fill-none stroke-emerald-200"
                id="angle2">
                <line
                    x1={circleCenter.x}
                    y1={ringWidth}
                    x2={circleCenter.x}
                    y2={circleCenter.y}
                />
            </g>
            <g
                transform={
                    "rotate(" +
                    -((props.res + startOffset) % 360) +
                    "," +
                    circleCenter.x +
                    "," +
                    circleCenter.y +
                    ")"
                }
                class="fill-none stroke-red-700"
                id="bisect_angle">
                <line
                    x1={circleCenter.x}
                    y1={ringWidth}
                    x2={circleCenter.x}
                    y2={circleCenter.y}
                />
            </g>
        </g>
        <circle
            cx={circleCenter.x}
            cy={circleCenter.y}
            r={5}
            class="fill-white stroke-black stroke-2"
            id="centerPoint"
        />
    </svg>
);

export default Circle;
