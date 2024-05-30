/*
 * SPDX-FileCopyrightText:  Copyright 2024 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Bisectriz
 * File:     App.tsx
 * Date:     30.May.2024
 *
 * ==============================================================================
 */

import "./App.css";
import * as z from "./zodiacs";
import { JSX, createSignal } from "solid-js";
import { circle } from "./assets/circle";

/**
 * The app's main entry point.
 * @returns {JSX.Element} Main app component.
 */
// eslint-disable-next-line max-lines-per-function
function App(): JSX.Element {
    const [z1, setZ1] = createSignal(0);
    const [z2, setZ2] = createSignal(0);
    const [deg1, setDeg1] = createSignal(0);
    const [deg2, setDeg2] = createSignal(0);
    const [min1, setMin1] = createSignal(0);
    const [min2, setMin2] = createSignal(0);
    const angle: z.ZodiacAngle = {
        z: z1() as z.Zodiacs,
        degrees: 15,
        minutes: 20,
    };
    const angle2: z.ZodiacAngle = {
        z: z.Zodiacs.Cancer,
        degrees: 8,
        minutes: 45,
    };

    return (
        <>
            <h1>Bisectriz</h1>
            <p class="text-xl">
                <label for="zodiac1">Zvieratník:</label>
                <select
                    name="zodiac1"
                    id="zodiac1"
                    onChange={(e) => setZ1(Number(e.target.value))}>
                    <option value="0">baran</option>
                    <option value="1">býk</option>
                    <option value="2">bliženci</option>
                    <option value="3">rak</option>
                    <option value="4">lev</option>
                    <option value="5">panna</option>
                    <option value="6">váhy</option>
                    <option value="7">škorpion</option>
                    <option value="8">strelec</option>
                    <option value="9">kozorožec</option>
                    <option value="10">vodnár</option>
                    <option value="11">ryby</option>
                </select>

                <label for="zodiac1-deg"> deg: </label>
                <input
                    type="number"
                    name="zodiac1-deg"
                    id="zodiac1-deg"
                    value="0"
                    min="0"
                    max="29"
                    onChange={(e) => setDeg1(Number(e.target.value))}
                />

                <label for="zodiac1-min"> min: </label>
                <input
                    type="number"
                    name="zodiac1-min"
                    id="zodiac1-min"
                    value="0"
                    min="0"
                    max="59"
                    onChange={(e) => setMin1(Number(e.target.value))}
                />
            </p>
            <p class="text-xl">
                <label for="zodiac2">Zvieratník:</label>
                <select
                    name="zodiac2"
                    id="zodiac2"
                    onChange={(e) => setZ2(Number(e.target.value))}>
                    <option value="0">baran</option>
                    <option value="1">býk</option>
                    <option value="2">bliženci</option>
                    <option value="3">rak</option>
                    <option value="4">lev</option>
                    <option value="5">panna</option>
                    <option value="6">váhy</option>
                    <option value="7">škorpion</option>
                    <option value="8">strelec</option>
                    <option value="9">kozorožec</option>
                    <option value="10">vodnár</option>
                    <option value="11">ryby</option>
                </select>

                <label for="zodiac2-deg"> deg: </label>
                <input
                    type="number"
                    name="zodiac2-deg"
                    id="zodiac2-deg"
                    value="0"
                    min="0"
                    max="29"
                    onChange={(e) => setDeg2(Number(e.target.value))}
                />

                <label for="zodiac2-min"> min: </label>
                <input
                    type="number"
                    name="zodiac2-min"
                    id="zodiac2-min"
                    value="0"
                    min="0"
                    max="59"
                    onChange={(e) => setMin2(Number(e.target.value))}
                />
            </p>
            <div class="card  m-4 bg-orange-200">
                <p class="text-2xl font-bold">
                    Bisectriz:{" "}
                    {z.zodiacAngleString(
                        z.bisectZodiacAngle(
                            { z: z1(), degrees: deg1(), minutes: min1() },
                            { z: z2(), degrees: deg2(), minutes: min2() },
                        ),
                    )}
                </p>
            </div>
            {circle}
        </>
    );
}

export default App;
