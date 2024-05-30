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
function App(): JSX.Element {
    const [count, setCount] = createSignal(0);

    return (
        <>
            <h1>Bisectriz</h1>
            {circle}
            <div class="card  m-4 bg-orange-200">
                <button class="" onClick={() => setCount((cnt) => cnt + 1)}>
                    count is {count()}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR{" "}
                    {z.zodiacSymbol(z.Zodiacs.Cancer)}
                </p>
            </div>
        </>
    );
}

export default App;
