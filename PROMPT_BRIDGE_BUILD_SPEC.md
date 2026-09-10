# Prompt Bridge — Master Build Specification

## Mission

Build a production-quality Android application called **Prompt Bridge**.

> Help the person who owns an Android phone understand their own device.

Prompt Bridge is a personal device observability and security-awareness application. It should feel somewhat like Physics Toolbox: expose as much real device information as Android legitimately makes available, while presenting it in an extremely simple, understandable experience.

This is **not** a generic antivirus app, spying application, or law-enforcement surveillance tool. It is an owner-facing device observatory.

## Product questions

The user should be able to answer:

- What is inside my phone?
- What is my phone doing?
- What applications are installed?
- What permissions do they have?
- Who has elevated access?
- What services are running?
- What security controls are active?
- What changed?
- When did it change?
- What can Prompt Bridge actually see?
- What can it NOT see?
- Why can't it see something?
- Is the device rooted?
- Is another application configured as device administrator or device owner?
- What VPN, accessibility, notification, usage, overlay, or other special-access capabilities exist?
- What technical information is available from the device itself?
- Which information exists outside the phone and therefore cannot be determined locally?

## Core truthfulness rule

Never claim knowledge the application cannot establish.

Every observation must be classified internally as:

- KNOWN
- OBSERVED
- USER-GRANTED
- REQUIRES PERMISSION
- REQUIRES SPECIAL ACCESS
- RESTRICTED BY ANDROID
- NOT EXPOSED BY ANDROID
- UNKNOWN

Never convert an observation into an accusation.

Good: “A new accessibility service is enabled.”
Bad: “Someone is spying on you.”

Good: “A VPN configuration is active.”
Bad: “The government is monitoring your phone.”

## UX: extreme simplicity

The most important requirement is **MAKE IT EXTREMELY EASY TO UNDERSTAND**.

The user should never need to understand Android terminology to use Prompt Bridge.

Every technical item uses progressive disclosure:

**Level 1:** simple answer.

**Level 2:** what it means.

**Level 3:** technical details.

Never dump technical information on the user unless they ask.

## Home dashboard

Create a calm, modern dashboard that can be understood in about five seconds.

### YOUR PHONE

Overall Device Status:

- Normal
- Changes detected
- Attention needed
- Some information unavailable

Large cards:

**DEVICE** — CPU, RAM, Storage, Battery, Temperature, Network, OS, Security

**ACCESS** — Apps, Permissions, Special Access, Accessibility, Device Administrator, Device Owner, VPN, Notifications

**CHANGES** — New, Changed, Removed, Unknown

**VISIBILITY** — What Prompt Bridge can see, what requires permission, what Android restricts, what cannot be determined

Do not overload the dashboard.

## Device Observatory

Inspired by Physics Toolbox. Where Android legitimately exposes information, collect and display:

### Processor

- CPU architecture
- CPU cores
- available CPU information
- supported instructions/features where available
- CPU utilization where available
- frequency information where available
- ABI
- manufacturer/model information

### Memory

- total RAM
- available RAM
- used RAM
- memory pressure where available

### Storage

- total internal storage
- available storage
- used storage
- relevant accessible storage volumes

### Battery

- percentage
- charging state
- battery health where available
- temperature
- voltage
- current where available
- capacity information where available

### Display

- resolution
- density
- refresh rate where available
- brightness where accessible
- display characteristics

### Sensors

Enumerate every sensor Android exposes, including when available:

- accelerometer
- gyroscope
- magnetometer
- proximity
- light
- pressure
- rotation
- gravity
- linear acceleration
- step counter
- step detector
- significant motion
- orientation-related sensors
- other available sensors

For every sensor show name, type, manufacturer, version, power, maximum range, resolution, and current reading where appropriate.

Example:

**Accelerometer — Available**

“Measures movement and acceleration of your phone.”

Then offer technical details.

## Network

Show what Android legitimately exposes regarding:

- Wi-Fi state
- connection type
- network status
- local interfaces where available
- cellular/network information where legally and technically available
- Bluetooth state
- NFC state
- VPN state
- network capabilities where available
- IP information where appropriate and safe

Never imply network visibility equals internet surveillance visibility.

## Application Observatory

Show installed applications to the extent Android permits.

For each application show:

- name
- package name
- version
- install/update information where available
- system/user classification
- requested permissions
- granted permissions where exposed
- special access
- accessibility relationship where applicable
- notification access
- usage access
- overlay capability
- device administrator relationship
- VPN relationship
- other elevated capabilities exposed by Android

Allow sorting by Newest, Recently changed, Highest access, System, User-installed, Attention.

Explain: “Why does this app have this permission?”

Never make unsupported security accusations.

## Authority Map

Dedicated section:

# WHO HAS ACCESS?

Show:

### Human owner
The person using the phone.

### Device administrator
Whether any application has device-admin privileges.

### Device owner
Whether the phone has a configured device owner.

### Accessibility services
List enabled services.

### VPN
Show configured/active VPN information available to the app.

### Notification access
Show applications with notification-listener access where Android exposes it.

### Usage access
Show applications with usage-access permission where available.

### Overlay
Show applications with screen-drawing/overlay access where available.

### Other special access
Enumerate relevant Android special-access categories.

Explain elevated access in plain English and provide the Android definition/capability where possible.

## Permission Center

Group permissions by meaning rather than jargon:

- Location — Who can access location?
- Camera — Who can use the camera?
- Microphone — Who can use the microphone?
- Contacts — Who can access contacts?
- Files — Who can access files?
- Phone — Who can access phone-related information?
- Notifications — Who can read notifications?

For each item show application, current state, Android permission, plain-English explanation, whether the user can change it, and a button to Android Settings when appropriate.

Never request all permissions immediately.

Use a guided **FULL DEVICE AUDIT** in which the user chooses capabilities to grant. Explain WHY before Android asks for each permission.

## Visibility Map

Dedicated screen:

# WHAT CAN PROMPT BRIDGE SEE?

Four categories:

🟢 CAN SEE

🟡 NEEDS YOUR PERMISSION

🟠 ANDROID LIMITS THIS

⚪ CANNOT DETERMINE

Examples:

Installed applications — CAN SEE

Usage history — NEEDS YOUR PERMISSION

Another application's private files — ANDROID LIMITS THIS

Whether an external organization obtained carrier records — CANNOT DETERMINE FROM THIS PHONE

This screen is essential.

## Baseline

Allow the user to create a **DEVICE BASELINE**.

Store a local snapshot of observable device/security information, including timestamp, device configuration, application inventory, permissions, special access, administrators, owner status, accessibility services, VPN state, relevant security settings, system information, and other observable security-relevant state.

Do not upload the baseline by default. It belongs to the user.

## Change Detection

Compare current state against the baseline.

Detect observable changes such as:

- application installed
- application removed
- application updated
- permission changed
- accessibility service changed
- device administrator changed
- device owner changed
- VPN changed
- special access changed
- security configuration changed
- system update
- developer/debug configuration changes
- certificates/security configuration where Android exposes them
- other observable changes

Show **WHAT CHANGED?** with timestamp, before, after, Android-reported state, plain-English meaning, and explicit limits on interpretation.

Example:

> September 10 — 4:18 PM
>
> Accessibility service changed.
>
> Before: None
>
> Now: Example Service
>
> Android reports this service as enabled.
>
> What this means: This service has special accessibility capabilities.
>
> What Prompt Bridge cannot determine: Whether the service is being used maliciously.

This distinction is mandatory.

## History

Create a chronological audit history. Every important observation/change gets timestamp, old state, new state, source/API, confidence/status, and explanation.

Allow export of the user's own audit history. Support machine-readable JSON and plan for human-readable text/PDF.

## External Access

Dedicated section:

# INFORMATION OUTSIDE YOUR PHONE

Explain that some information cannot be determined from the handset, including:

- carrier records
- cloud account records
- provider-held records
- historical network records
- information obtained directly from third parties
- external legal requests
- remote records that do not create an observable device change

Mark these:

⚪ NOT VISIBLE FROM THIS DEVICE

Never imply that absence of a local artifact proves absence of external access.

## Root

Detect apparent root status using multiple reasonable indicators.

If rooted:

**ROOT ACCESS DETECTED**

“This phone appears to have elevated operating-system access beyond the normal Android security model.”

If not:

**ROOT ACCESS NOT DETECTED**

Never claim that the phone cannot be accessed.

Root detection is an observation, not a security guarantee.

If root-level capabilities are actually available, provide a separate **ROOT AUDIT** section. Do not require root. Do not exploit, bypass, or secretly elevate privileges.

## Device Owner / Administrator

Detect and clearly display:

- device administrator state
- device owner state
- managed-device indicators
- relevant management policies exposed by Android

Explain the difference between **OWNER OF THE HARDWARE** and **TECHNICAL DEVICE ADMINISTRATION** in plain English.

## Settings shortcuts

Where Android allows it, provide “Review this in Android Settings.” Never bypass Android security UI.

## Privacy

Prompt Bridge is LOCAL-FIRST.

- No account required for core functionality.
- No device telemetry uploaded by default.
- No sale of device data.
- No silent collection.
- No hidden backend receiving device information.
- Any future sync must be optional, explicit, encrypted, and understandable.

## Security

Follow Android security/privacy best practices.

Request only necessary permissions. Use official Android APIs. Do not circumvent the Android sandbox. Do not use exploits. Do not disguise surveillance functionality. Do not collect information about other people's devices.

## UI design

Modern, calm, clean, trustworthy, simple, fast, readable.

Do not make it look like a hacker movie. Avoid excessive red warnings. Avoid technical jargon.

Every technical item should have, where applicable:

**WHAT IT IS**

**WHAT IT MEANS**

**WHY IT MATTERS**

**WHAT I CAN DO**

## Accessibility

Use large touch targets, readable typography, strong contrast, screen-reader support, concise explanations, no color-only indicators, and plain-English labels.

## Architecture

Use Kotlin, Jetpack Compose, AndroidX, modern Android architecture, local database/storage for baseline/history, and a repository/service architecture separating UI from device collectors.

Create separate collectors/modules for:

- DeviceInfo
- CpuInfo
- MemoryInfo
- StorageInfo
- BatteryInfo
- SensorInfo
- NetworkInfo
- BluetoothInfo
- ApplicationInfo
- PermissionInfo
- SpecialAccessInfo
- AccessibilityInfo
- DeviceAdminInfo
- DeviceOwnerInfo
- VpnInfo
- UsageInfo
- NotificationAccessInfo
- RootStatus
- SecurityInfo
- Baseline
- ChangeDetection
- AuditHistory

Every collector must gracefully handle unavailable/restricted information. One failed API must never crash the app.

## Critical Android limitation rule

Never fake data.

If Android does not expose something:

> Android doesn't expose this information to Prompt Bridge.

If permission is needed:

> Permission required.

If special access is needed:

> Special access required.

If it cannot be determined:

> Prompt Bridge cannot determine this from the device.

## Release plan

### Version 0.1 — working device observatory

1. Home dashboard
2. Device information
3. CPU/RAM/storage
4. Battery
5. Sensors
6. Installed application inventory
7. Permissions
8. Special access
9. Device administrator
10. Device owner
11. Accessibility services
12. VPN state
13. Root detection
14. Visibility Map
15. Baseline
16. Change detection
17. Local history

### Version 0.2

- deeper sensor information
- richer network information
- usage information
- notification access
- more security configuration
- export
- better explanations

### Version 0.3

- advanced audit mode
- detailed technical mode
- richer timeline
- comparison tools
- optional encrypted backup/sync
- optional web dashboard

## Development requirements

Create the complete Android project. It must compile and run on a real Android device. Do not stop at a design mockup. Do not substitute fake values for unavailable APIs.

Create tests for data collectors and change detection. Document every permission and special-access capability used.

README must explain what Prompt Bridge does, what it can observe, what permissions it needs, what Android prevents it from observing, privacy model, build instructions, and testing instructions.

Make reasonable engineering decisions autonomously. Do not require the user to write implementation details.

When something cannot be implemented because of Android restrictions, implement the Visibility Map entry explaining the limitation instead of pretending the capability exists.

## Final principle

Prompt Bridge should make the user feel:

> **This is MY phone. I can finally understand what's happening on it.**

But it must remain scientifically and technically honest.

Never say “Everything is safe.” Instead:

> Here's what we checked.
>
> Here's what changed.
>
> Here's what we can verify.
>
> Here's what requires your permission.
>
> Here's what Android won't let us see.
>
> Here's what cannot be determined from this device.

## Product

**PROMPT BRIDGE**

**Know Your Device.**
