import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Dock icon that belongs to this window (falls back to the dock container)
const getDockTargetEl = (windowKey) =>
  document.querySelector(`#dock .dock-icon[data-window="${windowKey}"]`) ??
  document.querySelector("#dock .dock-container");

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMinimized, isFullscreen } = windows[windowKey];

    const ref           = useRef(null);
    const isFirstRender = useRef(true);
    const activeTween   = useRef(null); // the transition currently running
    const draggableRef  = useRef(null);
    const prevIsOpen    = useRef(false);
    const prevIsMin     = useRef(false);
    const homePosRef    = useRef({ x: 0, y: 0 }); // pre-minimize drag position

    const killActiveTween = () => {
      if (activeTween.current) {
        activeTween.current.kill();
        activeTween.current = null;
      }
    };

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;
      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      draggableRef.current = instance;
      return () => {
        instance.kill();
        killActiveTween();
      };
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      if (isFirstRender.current) {
        isFirstRender.current = false;
        // Check persisted state on first render
        if (windows[windowKey].isOpen && !windows[windowKey].isMinimized) {
          el.style.display = "block";
          prevIsOpen.current = true;
          prevIsMin.current = windows[windowKey].isMinimized;
        } else {
          el.style.display = "none";
          prevIsOpen.current = windows[windowKey].isOpen;
          prevIsMin.current = windows[windowKey].isMinimized;
        }
        return;
      }

      const wasOpen = prevIsOpen.current;
      const wasMin  = prevIsMin.current;
      prevIsOpen.current = isOpen;
      prevIsMin.current  = isMinimized;

      // Any new transition supersedes the one currently running.
      // This guarantees a fast close→reopen, minimize→restore, or
      // restore→minimize can never be overridden by a stale onComplete.
      killActiveTween();

      // ── Opening: closed → open ──
      if (!wasOpen && isOpen && !isMinimized) {
        el.style.display = "block";

        if (prefersReducedMotion()) {
          gsap.set(el, { scale: 1, opacity: 1, y: 0, clearProps: "filter" });
          return;
        }

        activeTween.current = gsap.fromTo(
          el,
          { scale: 0.55, opacity: 0, y: 48, filter: "blur(4px)" },
          {
            scale: 1, opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.48, ease: "back.out(1.6)",
            clearProps: "filter",
          },
        );
        return;
      }

      // ── Closing: open → closed ──
      if (wasOpen && !wasMin && !isOpen) {
        if (prefersReducedMotion()) {
          el.style.display = "none";
          gsap.set(el, { clearProps: "scale,opacity,y,filter" });
          return;
        }

        activeTween.current = gsap.to(el, {
          scale: 0.72, opacity: 0, y: 14, filter: "blur(3px)",
          duration: 0.22, ease: "power3.in",
          onComplete: () => {
            el.style.display = "none";
            // Clear only what we animated — never clearProps:"all" here
            gsap.set(el, { clearProps: "scale,opacity,y,filter" });
            if (activeTween.current) activeTween.current = null;
          },
        });
        return;
      }

      // ── Minimise: open → minimised ──
      // Animate toward the actual Dock icon geometry (measured live),
      // while remembering the window's drag position so restore returns it.
      if (wasOpen && !wasMin && isOpen && isMinimized) {
        const startX = gsap.getProperty(el, "x");
        const startY = gsap.getProperty(el, "y");
        homePosRef.current = { x: startX, y: startY };

        if (prefersReducedMotion()) {
          el.style.display = "none";
          return;
        }

        const targetEl = getDockTargetEl(windowKey);
        const tweenVars = {
          scale: 0.06,
          opacity: 0,
          duration: 0.34,
          ease: "power3.in",
          onComplete: () => {
            el.style.display = "none";
            if (activeTween.current) activeTween.current = null;
          },
        };

        if (targetEl) {
          const elRect = el.getBoundingClientRect();
          const tRect  = targetEl.getBoundingClientRect();
          const dx = (tRect.left + tRect.width / 2) - (elRect.left + elRect.width / 2);
          const dy = (tRect.top + tRect.height / 2) - (elRect.top + elRect.height / 2);
          tweenVars.x = startX + dx;
          tweenVars.y = startY + dy;
        }

        activeTween.current = gsap.to(el, tweenVars);
        return;
      }

      // ── Restore from minimise ──
      // Fly back from the Dock icon to the window's remembered drag
      // position. `.to` starts from wherever the minimize tween left
      // the transform, so interrupting mid-flight stays smooth.
      if (wasMin && isOpen && !isMinimized) {
        el.style.display = "block";

        if (prefersReducedMotion()) {
          gsap.set(el, {
            x: homePosRef.current.x,
            y: homePosRef.current.y,
            scale: 1,
            opacity: 1,
          });
          return;
        }

        activeTween.current = gsap.to(el, {
          x: homePosRef.current.x,
          y: homePosRef.current.y,
          scale: 1,
          opacity: 1,
          duration: 0.42,
          ease: "power3.out",
        });
      }
    }, [isOpen, isMinimized]);

    // Fullscreen: enable/disable dragging
    useLayoutEffect(() => {
      if (!draggableRef.current) return;
      if (isFullscreen) draggableRef.current.disable();
      else              draggableRef.current.enable();
    }, [isFullscreen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`absolute${isFullscreen ? " window-fullscreen" : ""}`}
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
