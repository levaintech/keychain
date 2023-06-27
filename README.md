# Levain Keychain

[![CI](https://github.com/levaintech/keychain/actions/workflows/ci.yml/badge.svg)](https://github.com/levaintech/keychain/actions/workflows/ci.yml)

## Testing

### Unit & Integration (jest)

### End-to-end (playwright)

## Security

> While we strive to be as transparent as possible to maintain the integrity of our ecosystem, we also understand that
> the aspects of security are as wide and deep, and we might have missed some aspects. If you have any questions or
> concerns, please feel free to open an issue. We will be happy to append the relevant information to this document.

### Random Number Generator (RNG)

Cryptography is hard.

In the arena of software that handles private material, the Random Number Generator (RNG) forms the bedrock of security.
To generate random numbers, we rely on the `expo-crypto` module. This generates completely random bytes using native
implementations such as `CommonCrypto` on iOS and `SecureRandom` on Android.

It's worth noting that there's no foolproof method to determine the reliability of the underlying RNG. As the hardware
and software environment varies from device to device, it is impossible to guarantee that the RNG will behave in the
same way across all devices. Therefore, it is critically important to verify the RNG according to your own rigorous
standards.

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

### Striking a Balance Between Development Velocity and Security

While we hold firm to the belief that security is an indispensable aspect of any software project, we also acknowledge
the importance of balancing it with other factors, like development speed. In the realm of software creation, we often
find ourselves standing at a crossroads where security measures and the speed of development may seem like competing
priorities. The utilization of large software ecosystems (e.g. react-native, expo SDK) is an inevitable reality in our
line of work, and we assess that the advantages they offer significantly outweigh the potential risks.

However, we aim for an equilibrium that does not compromise on our commitment to secure software. By implementing robust
security protocols and practices, along with harnessing the benefits of rapid development through established
ecosystems, we strive to deliver secure, reliable software swiftly and efficiently.

### Disabling Over-The-Air (OTA) Updates

In alignment with our staunch commitment to security, we've made the strategic decision to disable the Over-The-Air
(OTA) updates feature, which is supported by the expo SDK through `expo-updates`. We perceive OTA updates as a potential
risk as it could enable an actor to alter the code executing on a device without the owner's awareness or approval.
While OTA updates could be a useful feature in some contexts (patching zero-day), we believe that each update should be
a deliberate decision made by the user, and not something that happens automatically in the background.

This risk becomes profoundly acute in the case of a cryptocurrency wallet, where a security breach could potentially
enable an attacker to abscond with the user's assets. By disabling OTA updates, we aim to provide an extra layer of
protection, fortifying our defenses and mitigating the risk of such breaches. Your security is our topmost priority, and
we continuously review and update our practices to ensure we are aligned with the best and safest industry standards.

## License & Disclaimer

By using the `levaintech/keychain` repository, you (the user) agree to be bound by the terms of the
[GPL License](https://github.com/levaintech/keychain/blob/main/LICENSE).
