# Levain Keychain

## Security

### Dependencies (SBOM, supply chain)

In the realm of open-source development, security is paramount and often one overlooked aspect is the dependencies
supply chain. Our project, like most modern software, relies on a number of external libraries and packages to function.
These dependencies can sometimes be a source of security vulnerabilities, as any weaknesses in them could potentially be
exploited to compromise our software.

Our approach to ensuring the security of our dependencies includes the following steps:

1. **Understanding our supply chain:** We maintain a comprehensive list of every external component our software relies
   upon, including not only direct dependencies, but also transitive ones.

2. **Keeping dependencies up to date:** We frequently update our dependencies to their latest versions, as these often
   include important security patches.

3. **Monitoring for vulnerabilities:** We employ automated tools to check our dependencies for known security
   vulnerabilities, allowing us to react swiftly if a threat is identified.

4. **Adopting a defense-in-depth strategy:** Our approach to security does not rely on any single measure.
   Instead, we layer multiple security measures (e.g. encrypted and enclave) on top of one another to provide a greater
   degree of protection.

5. **Minimizing dependencies:** We're continuously auditing our codebase to identify dependencies that we can replace
   with our own code or remove entirely. This helps us reduce the potential attack surface and limit the scope of
   possible supply chain attacks.

In contributing to our project, we ask that you also consider these aspects when adding or updating dependencies. Always
verify the source of a new dependency, check for known security vulnerabilities, and favor dependencies that are
actively maintained and widely trusted by the community. Please, consider if the new dependency is truly necessary
before adding it. We aim to be self-reliant and resilient against supply chain threats, and we appreciate your
cooperation in this effort.

This attention to our dependencies supply chain is part of our broader commitment to security, and to providing a
transparent, reliable, trustworthy foundation for cryptocurrency operations.

## License & Disclaimer

By using the `levaintech/keychain` repository, you (the user) agree to be bound by the terms of the
[GPL License](https://github.com/levaintech/keychain/blob/main/LICENSE).
