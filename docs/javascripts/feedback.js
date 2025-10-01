// docs/javascripts/feedback.js
(function () {
  function wrap() {
    if (typeof window.gtag !== "function") return false;

    const orig = window.gtag;
    window.gtag = function () {
      const args = Array.from(arguments);

      // Augment ONLY the Material "feedback" event
      if (
        args[0] === "event" &&
        args[1] === "feedback" &&
        args[2] &&
        typeof args[2].data !== "undefined"
      ) {
        const rating = args[2].data; // 1 = 👍, 0 = 👎
        args[2].rating = rating; // alias param for dimension
        args[2].label = rating ? "Helpful" : "Could be improved"; // human-friendly
      }

      return orig.apply(this, args);
    };

    // Make this tab visible in DebugView
    try {
      window.gtag("set", "debug_mode", true);
    } catch (e) {}
    return true;
  }

  // Wait for GA to initialize, then wrap once
  if (!wrap()) {
    const id = setInterval(() => {
      if (wrap()) clearInterval(id);
    }, 300);
    setTimeout(() => clearInterval(id), 10000); // stop trying after 10s
  }
})();
