# Changelog


## v0.1.3

[compare changes](https://github.com/haus23/runde-tips/compare/v0.1.2...v0.1.3)

### 🚀 Enhancements

- Add reusable icon component. ([9654d11](https://github.com/haus23/runde-tips/commit/9654d11))
- Simplify again the routing. Resolves #3. Drop aria components by now. ([#3](https://github.com/haus23/runde-tips/issues/3))
- Send emails via resend. ([95b5509](https://github.com/haus23/runde-tips/commit/95b5509))
- Implemented auth flow. Little bit quirky. Resolves #4 ([#4](https://github.com/haus23/runde-tips/issues/4))
- **auth:** Require an email address. ([5f7c726](https://github.com/haus23/runde-tips/commit/5f7c726))
- **auth:** Validate email address. ([1720b51](https://github.com/haus23/runde-tips/commit/1720b51))
- **auth:** Create TOTP and send with email. ([ee25b6d](https://github.com/haus23/runde-tips/commit/ee25b6d))
- **auth:** Basic auth flow implemented. See #5 ([#5](https://github.com/haus23/runde-tips/issues/5))
- Re-Implement sending emails. ([423dfd1](https://github.com/haus23/runde-tips/commit/423dfd1))
- Finally implement basic auth flow. Resolves #4 and #5 ([#4](https://github.com/haus23/runde-tips/issues/4), [#5](https://github.com/haus23/runde-tips/issues/5))

### 🩹 Fixes

- Use new valibot api. Not zod any more. ([dcd5906](https://github.com/haus23/runde-tips/commit/dcd5906))
- Remove remaining aria link and fix the link. ([c36335c](https://github.com/haus23/runde-tips/commit/c36335c))
- Remove (by now) aria components. ([00a5686](https://github.com/haus23/runde-tips/commit/00a5686))
- Set name attribute and use viewTransition API ([d519975](https://github.com/haus23/runde-tips/commit/d519975))
- Add viewTransition API ([50194b4](https://github.com/haus23/runde-tips/commit/50194b4))
- Use async methods. ([9d6c82a](https://github.com/haus23/runde-tips/commit/9d6c82a))

### 💅 Refactors

- Drop resend npm package and use web api. ([20a9e1d](https://github.com/haus23/runde-tips/commit/20a9e1d))
- Clean up. Remove all auth related code. ([95cdc1e](https://github.com/haus23/runde-tips/commit/95cdc1e))
- Rename and add email body factory ([3172946](https://github.com/haus23/runde-tips/commit/3172946))

### 🏡 Chore

- **dx:** Revert image tagging. ([904be3b](https://github.com/haus23/runde-tips/commit/904be3b))
- **dx:** Add class name helpers. ([72bd2f5](https://github.com/haus23/runde-tips/commit/72bd2f5))
- **auth:** Add totp and session table. ([f10b513](https://github.com/haus23/runde-tips/commit/f10b513))
- **auth:** Create session. ([1186373](https://github.com/haus23/runde-tips/commit/1186373))
- Upgrade all deps. ([024f7cd](https://github.com/haus23/runde-tips/commit/024f7cd))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.2

[compare changes](https://github.com/haus23/runde-tips/compare/v0.1.1...v0.1.2)

### 🚀 Enhancements

- Custom hook to use (unstable) viewTransition as default ([5c3e990](https://github.com/haus23/runde-tips/commit/5c3e990))

### 💅 Refactors

- Use always react aria links. With client side router provider. ([0842541](https://github.com/haus23/runde-tips/commit/0842541))

### 🏡 Chore

- **dx:** Publish new image only on new (pre-) releases by now. ([b3f1c72](https://github.com/haus23/runde-tips/commit/b3f1c72))
- **dx:** Start tagging the image releases. ([43c8ec0](https://github.com/haus23/runde-tips/commit/43c8ec0))
- **dx:** Switch to valibot from zod. ([95754ea](https://github.com/haus23/runde-tips/commit/95754ea))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.1

[compare changes](https://github.com/haus23/runde-tips/compare/v0.1.0...v0.1.1)

### 🚀 Enhancements

- Add hooks to prepare state for the views and components. ([3fefdbd](https://github.com/haus23/runde-tips/commit/3fefdbd))
- Extract championship navigation into plain select element. ([990f086](https://github.com/haus23/runde-tips/commit/990f086))
- Add resuable logo component. ([ba0f174](https://github.com/haus23/runde-tips/commit/ba0f174))
- Extract and create minimal styled header. ([728d801](https://github.com/haus23/runde-tips/commit/728d801))

### 🩹 Fixes

- Move FohLayout to the foh folder. And return json response. ([77dd605](https://github.com/haus23/runde-tips/commit/77dd605))
- Remove (by now) unused params argument. ([0e46813](https://github.com/haus23/runde-tips/commit/0e46813))

### 🏡 Chore

- Workflow check. ([8d546e2](https://github.com/haus23/runde-tips/commit/8d546e2))
- Add react aria components library. ([03bc577](https://github.com/haus23/runde-tips/commit/03bc577))
- **dx:** Add zod plugin to define parseable models ([1ff5ef8](https://github.com/haus23/runde-tips/commit/1ff5ef8))
- **dx:** Add tailwind. ([4d917af](https://github.com/haus23/runde-tips/commit/4d917af))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.0


### 🚀 Enhancements

- Create simple remix app with sqlite data backend. ([9cd9f9c](https://github.com/haus23/runde-tips/commit/9cd9f9c))
- Add docker image files. ([a1f4d67](https://github.com/haus23/runde-tips/commit/a1f4d67))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

