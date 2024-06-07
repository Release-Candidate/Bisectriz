/*
 * SPDX-FileCopyrightText:  Copyright 2024 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Bisectriz
 * File:     App.tsx
 * Date:     30.May.2024
 *
 * ==============================================================================
 * The main app component.
 */

import * as z from "./zodiacs";
import { Accessor, JSX, Setter, createSignal } from "solid-js";
import ZodiacAngleInput from "./ZodiacAngleInput";
import ZodiacAnglesDisplay from "./ZodiacAnglesDisplay";

/**
 * The app's main component.
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

    /**
     * Handle the reset.
     * Resets both `ZodiacAngle`s to their initial values: `Aries`, 0, 0.
     * @param e The event to handle.
     */
    function handleReset(e: Event): void {
        // eslint-disable-next-line no-eq-null, eqeqeq
        if (e.currentTarget == null) {
            return;
        }
        setZ1({
            z: z.Zodiacs.Aries as z.Zodiacs,
            degrees: 0,
            minutes: 0,
        });
        setZ2({
            z: z.Zodiacs.Aries as z.Zodiacs,
            degrees: 0,
            minutes: 0,
        });
    }

    return (
        <>
            <section>
                <button
                    onClick={handleReset}
                    class="rounded-md border-2 border-solid  bg-red-300 px-4 py-2  text-2xl shadow-md hover:bg-red-400 active:bg-red-500 active:text-white active:shadow-none">
                    Reset
                </button>
                <ZodiacAngleInput z={z1()} setZ={setZ1} id={1} />
                <ZodiacAngleInput z={z2()} setZ={setZ2} id={2} />
            </section>
            <section>
                <ZodiacAnglesDisplay z1={z1()} z2={z2()} />
            </section>
        </>
    );
}

export default App;
