/*
 * SPDX-FileCopyrightText:  Copyright 2024 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Bisectriz
 * File:     index.tsx
 * Date:     01.Jun.2024
 *
 * ==============================================================================
 * The entry point of the web app.
 */

/* @refresh reload */
import "./index.css";
import App from "./App";
import { render } from "solid-js/web";

const root = document.getElementById("app");

render(() => <App />, root!);
