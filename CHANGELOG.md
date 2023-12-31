# Changelog


## v0.1.8

[compare changes](https://github.com/haus23/runde-tips/compare/v0.1.7...v0.1.8)

### 🚀 Enhancements

- Create the command component. ([450e310](https://github.com/haus23/runde-tips/commit/450e310))
- Add manager layout and dashboard route. ([db395ef](https://github.com/haus23/runde-tips/commit/db395ef))
- Add minimal header styling with link ui component. ([1c0e2eb](https://github.com/haus23/runde-tips/commit/1c0e2eb))
- Highlight current nav link ([9e638ad](https://github.com/haus23/runde-tips/commit/9e638ad))
- Add minimal styling for auth flow. ([c30f8b8](https://github.com/haus23/runde-tips/commit/c30f8b8))
- Add user menu. ([a603d3d](https://github.com/haus23/runde-tips/commit/a603d3d))
- Secure manager area. ([e18630f](https://github.com/haus23/runde-tips/commit/e18630f))
- Redirect after login ([e3821e5](https://github.com/haus23/runde-tips/commit/e3821e5))
- Start defining my design system. Docs added. ([95044c3](https://github.com/haus23/runde-tips/commit/95044c3))

### 🩹 Fixes

- Adjust API (due to upgrade?) ([a31055c](https://github.com/haus23/runde-tips/commit/a31055c))
- Wrong import path. ([47e860c](https://github.com/haus23/runde-tips/commit/47e860c))
- Add press events to NavLink as well. ([74bfca2](https://github.com/haus23/runde-tips/commit/74bfca2))
- Clean up deps. ([9aa3aec](https://github.com/haus23/runde-tips/commit/9aa3aec))

### 💅 Refactors

- Drop the custom command component. Simplify the championship-select. ([d0d40b8](https://github.com/haus23/runde-tips/commit/d0d40b8))
- Add default invariant error message. ([980c64e](https://github.com/haus23/runde-tips/commit/980c64e))
- Not loading championship in the loader. Resolves  #14 ([#14](https://github.com/haus23/runde-tips/issues/14))
- Bring back the augmented hook to use client routing with rac. ([4bc5ffa](https://github.com/haus23/runde-tips/commit/4bc5ffa))
- Do navigation explicit again. ([3d231e8](https://github.com/haus23/runde-tips/commit/3d231e8))
- Use explicit function type. ([470e13f](https://github.com/haus23/runde-tips/commit/470e13f))
- Shorten the import path ([c177e42](https://github.com/haus23/runde-tips/commit/c177e42))
- Align the dev hover styles. ([88e4c0a](https://github.com/haus23/runde-tips/commit/88e4c0a))
- Rename hook and return undefined for no existing handle. ([d8c973c](https://github.com/haus23/runde-tips/commit/d8c973c))
- Logo hast two files -> so move to a folder. ([07fc17a](https://github.com/haus23/runde-tips/commit/07fc17a))

### 🏡 Chore

- Add libs ([ee032dd](https://github.com/haus23/runde-tips/commit/ee032dd))
- Update minor dep changes. ([8297455](https://github.com/haus23/runde-tips/commit/8297455))
- Upgrade drizzle. ([5439a0c](https://github.com/haus23/runde-tips/commit/5439a0c))
- Upgrade jsx-email. Mark email file as server only. ([2fdb48a](https://github.com/haus23/runde-tips/commit/2fdb48a))
- Upgrade tsx ([a55d4e5](https://github.com/haus23/runde-tips/commit/a55d4e5))
- Update deps. ([ec9dcaf](https://github.com/haus23/runde-tips/commit/ec9dcaf))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.7

[compare changes](https://github.com/haus23/runde-tips/compare/v0.1.6...v0.1.7)

### 🚀 Enhancements

- Add text-field ui component. ([aa139da](https://github.com/haus23/runde-tips/commit/aa139da))
- Add check icon. ([3266b94](https://github.com/haus23/runde-tips/commit/3266b94))
- Add partly working championship select component ([2908b50](https://github.com/haus23/runde-tips/commit/2908b50))

### 🩹 Fixes

- Revert changing alias path. ([2d6979c](https://github.com/haus23/runde-tips/commit/2d6979c))
- Move drizzle config up to db folder again. ([788813d](https://github.com/haus23/runde-tips/commit/788813d))
- Move drizzle instance and schema again up into db folder. ([1b0b419](https://github.com/haus23/runde-tips/commit/1b0b419))
- Move seed folder out of the app back into the db folder. ([c7edec3](https://github.com/haus23/runde-tips/commit/c7edec3))

### 💅 Refactors

- Switch to react aria components. ([8bf7c6e](https://github.com/haus23/runde-tips/commit/8bf7c6e))
- Upgrade to cva beta. Use new hooks property. And add new search icon. ([efc84f8](https://github.com/haus23/runde-tips/commit/efc84f8))
- Move championship loading one path up. Drop unneeded layout. ([7d8bc34](https://github.com/haus23/runde-tips/commit/7d8bc34))

### 🏡 Chore

- Install cva and remove explicit clsx dep. ([5d4f03d](https://github.com/haus23/runde-tips/commit/5d4f03d))
- **dx:** Start design system with first prototype: a button ([4c0472c](https://github.com/haus23/runde-tips/commit/4c0472c))
- Refine eslint config. First we need to lint model files as well. ([a3babdc](https://github.com/haus23/runde-tips/commit/a3babdc))
- Upgrade react aria components. ([9a49d07](https://github.com/haus23/runde-tips/commit/9a49d07))
- Adapt readme files. ([4cc7d24](https://github.com/haus23/runde-tips/commit/4cc7d24))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.6

[compare changes](https://github.com/haus23/runde-tips/compare/v0.1.5...v0.1.6)

### 💅 Refactors

- Rename db module to api module. ([993266d](https://github.com/haus23/runde-tips/commit/993266d))
- Move root db folder into api module. ([d65ef21](https://github.com/haus23/runde-tips/commit/d65ef21))
- Fix drizzle config paths. ([99c8f54](https://github.com/haus23/runde-tips/commit/99c8f54))
- Drop type-fest, this is an app - no framework. ([b8b86e5](https://github.com/haus23/runde-tips/commit/b8b86e5))
- Reorganize deps. Dev deps are dev-server, typescript and types, formatting and later linting. ([1aed2a1](https://github.com/haus23/runde-tips/commit/1aed2a1))
- Move aliased folder. App is the new root. ([b80a822](https://github.com/haus23/runde-tips/commit/b80a822))
- Move db usages into model. ([14f4353](https://github.com/haus23/runde-tips/commit/14f4353))
- Add championship loading in layout. Align loaded data usage. ([2cec89c](https://github.com/haus23/runde-tips/commit/2cec89c))
- Again reorganize folders. ([8551363](https://github.com/haus23/runde-tips/commit/8551363))
- Mark model files as server only. ([8d4f47c](https://github.com/haus23/runde-tips/commit/8d4f47c))

### 🏡 Chore

- **dx:** Ignore temporary local files. ([46f64c8](https://github.com/haus23/runde-tips/commit/46f64c8))
- **dx:** Setup minimal lint config to restrict db.server imports. ([cf17032](https://github.com/haus23/runde-tips/commit/cf17032))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.5

[compare changes](https://github.com/haus23/runde-tips/compare/v0.1.4...v0.1.5)

### 🚀 Enhancements

- Add realtime feature via Server Sent Events. Proof of concept. ([8f1ce82](https://github.com/haus23/runde-tips/commit/8f1ce82))

### 🏡 Chore

- Drop now unused remix-auth deps ([1c60493](https://github.com/haus23/runde-tips/commit/1c60493))
- Drop now unused base32 implementation. ([7d083ff](https://github.com/haus23/runde-tips/commit/7d083ff))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.4

[compare changes](https://github.com/haus23/runde-tips/compare/v0.1.3...v0.1.4)

### 🚀 Enhancements

- Handle anonymous users. ([1e43f50](https://github.com/haus23/runde-tips/commit/1e43f50))
- Add email validation against registered users. ([fe8cb98](https://github.com/haus23/runde-tips/commit/fe8cb98))
- Integrate conform to simplify form handling and validation. ([4927ed3](https://github.com/haus23/runde-tips/commit/4927ed3))
- Add onboarding route. Control flow with session value. ([24b6581](https://github.com/haus23/runde-tips/commit/24b6581))
- Sketch the onboarding flow. ([b9374e9](https://github.com/haus23/runde-tips/commit/b9374e9))
- Generate and validate one time password. ([2479b83](https://github.com/haus23/runde-tips/commit/2479b83))
- Implement login/logout. ([9cb2b99](https://github.com/haus23/runde-tips/commit/9cb2b99))
- Send email with totp. ([a17b1f4](https://github.com/haus23/runde-tips/commit/a17b1f4))
- Increase security by using unpredictable secrets. ([8b82e8e](https://github.com/haus23/runde-tips/commit/8b82e8e))
- Start with role based features. ([d63213e](https://github.com/haus23/runde-tips/commit/d63213e))

### 🩹 Fixes

- Wrong regex used. ([a31878e](https://github.com/haus23/runde-tips/commit/a31878e))
- Add hints for code input. ([649d7e3](https://github.com/haus23/runde-tips/commit/649d7e3))
- Redirect from onboarding route if already logged in. ([4836ddc](https://github.com/haus23/runde-tips/commit/4836ddc))

### 💅 Refactors

- Be more precise with util modules. ([cad5d9f](https://github.com/haus23/runde-tips/commit/cad5d9f))
- Drop valibot dependency for now. And simplify assertions. ([2c516b9](https://github.com/haus23/runde-tips/commit/2c516b9))
- Simplify root loader. ([60c881a](https://github.com/haus23/runde-tips/commit/60c881a))
- Create new db module ([6276e43](https://github.com/haus23/runde-tips/commit/6276e43))

### 🏡 Chore

- Remove current auth flow. ([dc2a6c3](https://github.com/haus23/runde-tips/commit/dc2a6c3))

### ❤️ Contributors

- Micha Buchholz <micha@haus23.net>

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

