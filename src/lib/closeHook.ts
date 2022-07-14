import { useEffect, useRef } from "react";

/**
 * Trigger close event if an interaction occurs outside of a given element
 * @param onClose Function to call on close
 * @returns Ref object to pass to parent element
 */
export default function useCloseHook(onClose?: () => void) {
    const ref = useRef(null);

    useEffect(() => {
        if (onClose) {
            function onClick(ev: MouseEvent) {
                if (!ev.composedPath().includes(ref.current!)) {
                    onClose!();
                }
            }

            document.addEventListener("click", onClick);
            return () => document.removeEventListener("click", onClick);
        }
    }, [onClose]);

    return ref;
}
