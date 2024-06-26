/*
 * SPDX-FileCopyrightText:  Copyright 2024 Roland Csaszar
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Project:  Bisectriz
 * File:     ZodiacAngleInput.tsx
 * Date:     01.Jun.2024
 *
 * =============================================================================
 * The inputs to let the user set a single `ZodiacAngle` as a component.
 */

import * as z from "./zodiacs";
import { Component, Index, Setter } from "solid-js";

/**
 * Return the `ZodiacAngleInput` component as JSX.
 * The input fields for the `ZodiacAngle` to are:
 * - zodiac
 * - degrees
 * - minutes
 * @param props The `ZodiacAngle`, its setter function and the id of the
 * `ZodiacAngle` to use for HTML ids.
 * @returns The `ZodiacAngleInput` component as JSX.
 */
// eslint-disable-next-line func-style
const ZodiacAngleInput: Component<{
    z: z.ZodiacAngle;
    setZ: Setter<z.ZodiacAngle>;
    id: number;
}> = (props) => {
    // eslint-disable-next-line lines-around-comment
    /**
     * Handle the change of the zodiac.
     * Set the zodiac in the `ZodiacAngle` of the prop.
     * @param e The event to handle.
     */
    function handleZ(e: Event): void {
        // eslint-disable-next-line no-eq-null, eqeqeq
        if (e.currentTarget == null) {
            return;
        }
        const el: HTMLInputElement = e.currentTarget as HTMLInputElement;
        props.setZ({
            z: Number(el.value) as z.Zodiacs,
            degrees: props.z.degrees,
            minutes: props.z.minutes,
        });
    }

    /**
     * Handle the change of the degrees.
     * Set the degrees in the `ZodiacAngle` of the prop.
     * @param e The event to handle.
     */
    function handleDeg(e: Event): void {
        // eslint-disable-next-line no-eq-null, eqeqeq
        if (e.currentTarget == null) {
            return;
        }
        const el: HTMLInputElement = e.currentTarget as HTMLInputElement;
        props.setZ({
            z: props.z.z,
            degrees: Number(el.value),
            minutes: props.z.minutes,
        });
    }

    /**
     * Handle the change of the minutes.
     * Set the minutes in the `ZodiacAngle` of the prop.
     * @param e The event to handle.
     */
    function handleMin(e: Event): void {
        // eslint-disable-next-line no-eq-null, eqeqeq
        if (e.currentTarget == null) {
            return;
        }
        const el: HTMLInputElement = e.currentTarget as HTMLInputElement;
        props.setZ({
            z: props.z.z,
            degrees: props.z.degrees,
            minutes: Number(el.value),
        });
    }

    return (
        <>
            {" "}
            <form
                class={
                    (props.id === 1
                        ? "border-emerald-200"
                        : "border-emerald-200") +
                    " my-2 rounded-md border-2 border-solid bg-white py-2 text-2xl shadow-md"
                }
                action=""
                name={"Zodiac_angle_input" + props.id}>
                <label for={"zodiac" + props.id}>
                    <span class="sr-only">
                        {"Zodiac sign of the angle " + props.id}
                    </span>
                </label>
                <select
                    name={"zodiac" + props.id}
                    id={"zodiac" + props.id}
                    class="bg-white font-zodiac"
                    onChange={handleZ}
                    value={props.z.z}>
                    <Index each={z.zodiacSlovak}>
                        {(zodiac, i) => (
                            <option value={i}>
                                {z.zodiacSymbol(i)} {zodiac()}
                            </option>
                        )}
                    </Index>
                </select>
                <label for={"zodiac" + props.id + "-deg"}>
                    {" "}
                    <span class="sr-only">
                        {"remaining angle in degrees of the angle " + props.id}
                    </span>
                </label>
                <input
                    type="number"
                    name={"zodiac" + props.id + "-deg"}
                    id={"zodiac" + props.id + "-deg"}
                    class="bg-white"
                    placeholder="0"
                    value={props.z.degrees !== 0 ? props.z.degrees : ""}
                    required
                    min="0"
                    max="29"
                    size={2}
                    onChange={handleDeg}
                />
                °
                <label for={"zodiac" + props.id + "-min"}>
                    {" "}
                    <span class="sr-only">
                        {"remaining angle in minutes of the angle" + props.id}
                    </span>
                </label>
                <input
                    type="number"
                    name={"zodiac" + props.id + "-min"}
                    id={"zodiac" + props.id + "-min"}
                    class="bg-white"
                    placeholder="0"
                    value={props.z.minutes !== 0 ? props.z.minutes : ""}
                    required
                    min="0"
                    max="59"
                    size={2}
                    onChange={handleMin}
                />
                '
            </form>
        </>
    );
};

export default ZodiacAngleInput;
