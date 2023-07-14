# keychain/app

## Developing

```bash
yarn run start
```

## Dependencies Management

- `package.json:dependencies` that are required for the app to run and paramount to the app's ability to function. They
  are usually used in production, installed on the client or required to compile the app from the source.
- `package.json:devDependencies` that are required for the app to build and function but not necessary part of the app
  such as testing, linting, etc.

While the dichotomy between the two is not always clear since the line between the two is blurry, we ought to keep the
`dependencies` as small as possible to reduce the attack surface for security of the app.

## Page Driven Development (PDD)

> Note, this guideline is WIP and our industry is having a paradigm shift moment on how we structure our codebase.
> To fully document this paradigm shift would require a much longer narrative.
> Take this as a brief introduction to the paradigm shift.

PDD is a paradigm that we use to structure our codebase. It's a paradigm where code is organized by context, not by
technology or false separation of concerns. It's a paradigm that enables us to scale our codebase without sacrificing
the ability to adapt to iterations, to refactor, and to maintain.

### Why PDD?

The primary issue lies in over-abstraction at the cost of context. Context changes individually with the evolution of a
narrative—whether from product or design perspectives—yet abstraction, typically for an engineer, confines their ability
to adapt.

While the product team can easily change the narrative, the engineering team is confined by their inherent abstraction.
If they heavily rely on it, it significantly affects the ability to adapt in a isolated context. Consequently, engineers
create more abstractions to cater to a variety of use cases or add more complexity (e.g., 'if options=show this') to
existing abstractions. At a certain point, it becomes apparent that the abstraction isn't aiding but hindering progress.
The purpose of introducing abstraction is to enable scalability, but with each unique use case, we slightly twist it to
fit our use case. In the attempt to squeeze all use cases into one abstraction, we create an obvious anti-pattern.

If you look at design workflow in general, they are not abstracted. Designers rarely need to be concerned with the
breaking changes in their components because they contextually adapt their narrative on a single page. How frequently do
they request a button redesign? They modify the button in the context of the specific page, unconcerned with its usage
on other pages since it's not abstracted—or revisited, or regression-tested. One might argue that design should be
abstracted to conform to the engineering paradigm, but that's unrealistic. Narrative never stops and continuously
evolving.

Tailwind introduced a concept where rules are loosely coupled and individually applied, aligning well with the evolution
of design. It's possible to create a symmetrical-looking design through asymmetrical rules—rules that need to be
combined to form components that are easy to change and adapt.

### False Separation of Concerns

The separation of concerns is a common paradigm in software engineering. Today, it's often used to separate the
technology stack (e.g., React, Redux, etc.) from the business logic. However, this paradigm is often misused to separate
the concerns of the same context. For example, a component that is used in multiple pages is often abstracted into a
global component while you can argue you effectively separated the concerns of the component from the page, you created
a tangled mess of coupling between the component and pages that have vastly different contexts.

### PDD Guidelines

Pages have a natural hierarchy that is indistinguishable from a presented page (your output, the HTML). The workflow for
creating pages is as natural as how designers design pages or how product managers think about creating pages. They're
workflows oriented around context, not technology.

By composing pages, we can create a hierarchy of components that are contextually relevant to the page. By placing
components in the same directory as the page, we can easily identify the coupling between the page and the components,
context that are naturally coupled.

Practicing Page-Driven Development (PDD) does not imply the necessity to consolidate all code into a single, monolithic
page. PDD is a paradigm that discourages the creation of globally-shared context, which create false separation of
concerns. It is not a paradigm that discourages the decomposition of a page into smaller, manageable components. In
fact, it advises creating natural hierarchies of components that are contextually relevant to the page. Those components
should be placed in the same directory as the page to easily identify the coupling between the page and the components.

We should always decompose a page into smaller components. Having 10+ `useState<string>` in your Page component should
immediately raise some alarms. You should always be weary of code smells like type assertions, prop-drilling,
monolithic components, etc. It's not a matter of how you code, it's rather where you place your code.
