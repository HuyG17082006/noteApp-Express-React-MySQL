
import { useState } from "react"

export default (fn, time = 500) => {
    const [isLocked, setLocked] = useState(false);

    const runFunc = (...args) => {
        if (isLocked)
            return;

        setLocked(true);
        fn(...args);

        setTimeout(() => {
            setLocked(false);
        }, time);
    }

    return {
        runFunc,
        isLocked
    }
}