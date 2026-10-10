# OOP Lifecycle Prompts

Each section below contains a separate maintenance prompt. Use its anchor link to select the prompt you want the AI to follow, along with any recommendations, implementation prompt, request or problem report it needs from your chat.

- [Diagnose requests and/or problems and propose changes and/or fixes](#diagnose)
- [Prepare an implementation prompt](#prepare)
- [Verify implementation and regressions](#verify)

To reference a section from an AI chat, append its anchor to the full file URL. For example, once this file is available on the repository's `main` branch:

```text
Read https://github.com/organizationorchestrationprotocol/oop/blob/main/maintenance/LIFECYCLE.md#diagnose and follow only the prompt in that section, ending at the next level-two heading. Use the recommendations from this chat as input.
```

## DIAGNOSE

Always respond in the user's preferred language.

You should have been directed here by an instruction similar to this:

```text
execute the section #diagnose of the prompt md file at this location: https://github.com/organizationorchestrationprotocol/oop/blob/main/maintenance/LIFECYCLE.md#diagnose
```

Analyze the information I have provided, identify where and how the reported requests can be satisfied and/or problems can be corrected, and suggest changes to OOP that would satisfy those requests and/or prevent those problems from recurring in any AI runtime.

Your most important constraint is to preserve every project constraint established so far. Introduce additions that I request or that you propose only if they preserve the rigor already established in the canonical source.

The AI tool must always prepare its internal tools to perform the necessary formal, unambiguous checks so that the relevant OOP rules are enforced every time.

## PREPARE

Always respond in the user's preferred language.

You should have been directed here by an instruction similar to this:

```text
execute the section #prepare of the prompt md file at this location: https://github.com/organizationorchestrationprotocol/oop/blob/main/maintenance/LIFECYCLE.md#prepare
```

Act as the prompt engineer responsible for instructing an AI tool on how to make the changes needed to implement all the improvements and solutions you have recommended. Ensure that these changes introduce no regressions in the current canonical source.

The canonical source must always remain completely vendor- and tool-agnostic.

If the changes make it possible to add new examples or improve `README.md`, do so while preserving the README's existing structure: the call to action at the top, followed by what OOP is and how it works, then everything else.

The human-facing text in the README and examples must be understandable even to a complete beginner trying to figure out what OOP is, what it does, and especially how it can help them earn or save money with little effort, few clicks, and few interactions with AI tools.

To reduce costs, do as much of the reasoning as possible yourself and write the implementation prompt so that the AI tool uses as few resources as possible.

Provide the prompt as a downloadable Markdown file named `OOP_<unix_timestamp>_<descriptive_name>.md`, where `<unix_timestamp>` is the number of seconds since the Unix epoch at the time the file is created. You MUST write the implementation prompt and the entire Markdown file in English. All messages addressed to the user MUST be in the user's preferred language.

You MUST explain what you are doing step by step as you prepare the prompt. These explanations are mandatory and MUST be displayed to the user in their preferred language. Other user-facing explanations MUST also use the user's preferred language. Do not omit the step-by-step explanations or replace them with only the final prompt or a final summary.

## VERIFY

Always respond in the user's preferred language.

You should have been directed here by an instruction similar to this:

```text
execute the section #verify of the prompt md file at this location: https://github.com/organizationorchestrationprotocol/oop/blob/main/maintenance/LIFECYCLE.md#verify
```

Analyze the repository to verify whether the latest implementation prompt you generated for me has been implemented and whether any project requirement has regressed.

In your response, use less technical language and focus on practical consequences. Keep descriptions concise, but make captions and explanations complete. Use brief, meaningful examples.

Do not simply agree with me or tell me everything is fine when it is not.
