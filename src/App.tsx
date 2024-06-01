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
import { Accessor, JSX, Setter, createSignal } from "solid-js";
import { ZodiacAngleInput } from "./ZodiacAngleInput";
import { circle } from "./assets/circle";

/**
 * The app's main entry point.
 * @returns {JSX.Element} Main app component.
 */
// eslint-disable-next-line max-lines-per-function
function App(): JSX.Element {
    const [z1, setZ1]: [Accessor<z.ZodiacAngle>, Setter<z.ZodiacAngle>] =
        createSignal({
            z: z.Zodiacs.Aries as z.Zodiacs,
            degrees: 0,
            minutes: 0,
        });
    const [z2, setZ2]: [Accessor<z.ZodiacAngle>, Setter<z.ZodiacAngle>] =
        createSignal({
            z: z.Zodiacs.Aries as z.Zodiacs,
            degrees: 0,
            minutes: 0,
        });

    return (
        <>
            <h1>Bisectriz</h1>
            <ZodiacAngleInput z={z1()} setZ={setZ1} id={1} />
            <ZodiacAngleInput z={z2()} setZ={setZ2} id={2} />
            <div class="card  m-4 bg-orange-200">
                <p class="text-2xl font-bold">
                    Bisectriz:
                    <br />
                    {z.zodiacAngleString(z.bisectZodiacAngle(z1(), z2()))}
                </p>
            </div>
            {circle}
        </>
    );
}

export default App;
