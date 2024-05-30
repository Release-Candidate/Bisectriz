/*
 * SPDX-FileCopyrightText:  Copyright 2023 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Gregor
 * File:     gregor_test.ts
 * Date:     29.Oct.2023
 *
 * ==============================================================================
 */

import * as cj from "chai";
import * as fc from "fast-check";

describe("Test Date to Day of the Week", () => {
    it("OK", () => {
        cj.expect(5).to.not.equal(6);
    });
    it("FastCheck", () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), (a, b) => {
                cj.assert.equal(a + b, b + a);
            }),
            { verbose: true, numRuns: 1000 },
        );
    });
});
