/** Harbor palette: white, soft blue, navy, one neon accent. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"] },
      colors: {
        navy: { DEFAULT: "#0A1A3F", soft: "#3B4C75", mute: "#7A88A8" },
        brand: { DEFAULT: "#2F6BFF", deep: "#1F4FD6" },
        mist: { DEFAULT: "#F3F7FF", line: "#DCE6FA" },
        neon: { DEFAULT: "#3CE0FF", soft: "#B8F3FF" },
      },
      borderRadius: { xl2: "1.75rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(10,26,63,.04), 0 12px 40px -12px rgba(47,107,255,.18)",
        glow: "0 0 0 1px rgba(60,224,255,.5), 0 0 32px rgba(60,224,255,.45)",
      },
      backgroundImage: {
        aura:
          "radial-gradient(60% 50% at 80% 0%, rgba(60,224,255,.18), transparent 70%), radial-gradient(50% 45% at 0% 20%, rgba(47,107,255,.12), transparent 70%)",
      },
    },
  },
  plugins: [],
};
