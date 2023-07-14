# keychain/app/components

Refer to the "Page Driven Development" section in [app/README.md](../README.md) for more context.

Below are some general guidelines for creating global components:

- Truly global components should be kept as simple as possible and void of business logic.
- Components that exist within a single hierarchy and are applicable to just one page should be positioned closest to
  the page component within the hierarchy.
- Resorting to global components should be your last option. Before creating one, question if it's possible to develop a
  page-specific component instead.
- If you argue that a component is utilized across multiple pages in varying contexts, validate this claim. If you can't
  justify the use and are simply abstracting it for abstraction's sake, opt for creating a page-specific component.
- More often than not, it's beneficial to navigate up a page hierarchy to locate a more suitable position for a
  component rather than moving it to the global components directory. Take `<KeySettingRow/>` for example. Despite its
  usage across multiple pages, it is not a global component. As a component used in the `key` context, placing it
  at `./app/keys/KeySettingRow.tsx` may be a more fitting location.
