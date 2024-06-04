/*
 * SPDX-FileCopyrightText:  Copyright 2024 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Bisectriz
 * File:     circle.tsx
 * Date:     04.Jun.2024
 *
 * =============================================================================
 */

import * as z from "../zodiacs";
import { Component, For } from "solid-js";

type Point = { x: number; y: number };

function rotateAroundCenter(p: Point, center: Point, angle: number): Point {
    const tP = {
        x: p.x - center.x,
        y: p.y - center.y,
    };
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

function pointToObject(p: Point): Object {
    return p;
}

// eslint-disable-next-line func-style
const Circle: Component<{
    z1: number;
    z2: number;
    res: number;
}> = (props) => (
    <svg viewBox="0 0 502 502">
        <g class="fill-none stroke-DarkBrown stroke-2" id="circles_with_signs">
            <circle cx="251" cy="251" r="250" id="outer" />
            <circle cx="251" cy="251" r="220" id="inner2" />
            <For each={Array.from({ length: 12 })}>
                {(_, i) => (
                    <>
                        <g transform={"rotate(" + i() * 30 + ", 251, 251)"}>
                            <line x1="251" y1="0" x2="251" y2="30" />
                        </g>
                        <text
                            text-anchor="middle"
                            dominant-baseline="central"
                            {...pointToObject(
                                rotateAroundCenter(
                                    { x: 185, y: 26 },
                                    { x: 251, y: 251 },
                                    i() * 30 + 90,
                                ),
                            )}>
                            {z.zodiacSymbol(i())}
                        </text>
                    </>
                )}
            </For>
        </g>
        <g stroke-width="5" id="angles">
            <g
                transform={"rotate(-" + ((props.z1 + 90) % 360) + ", 251, 251)"}
                class="fill-none stroke-blue-500"
                id="angle1">
                <line x1="251" y1="30" x2="251" y2="251" />
            </g>
            <g
                transform={"rotate(-" + ((props.z2 + 90) % 360) + ", 251, 251)"}
                class="fill-none stroke-green-500"
                id="angle2">
                <line x1="251" y1="30" x2="251" y2="251" />
            </g>
            <g
                transform={
                    "rotate(-" + ((props.res + 90) % 360) + ", 251, 251)"
                }
                class="fill-none stroke-DarkRed"
                id="bisect_angle">
                <line x1="251" y1="30" x2="251" y2="251" />
            </g>
        </g>
    </svg>
);

export default Circle;
