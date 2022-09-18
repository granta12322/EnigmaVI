

    /**
     * @desc When a rotor makes one full rotation the next rotor's offset is incremented
     * by one. The first rotor is rotated after every key stroke.
     */
export function stepRotorsHook(currentOffsets: Array<number>, rotorSize: number): Array<number> {
        const stepSize: number = 1;
        console.log("Input offsets:" + currentOffsets)
        for (let i= 0; i < currentOffsets.length; i++) {

            currentOffsets[i] = (currentOffsets[i] + stepSize) % rotorSize;

            if (currentOffsets[i] != 0) break;  // Rotate next rotor only when start of preceeding is reached.
        };
        console.log(currentOffsets)
        return currentOffsets;
    };

