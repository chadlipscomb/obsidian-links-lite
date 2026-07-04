# Changelog

Fork of [mii-key/obsidian-links](https://github.com/mii-key/obsidian-links), forked at upstream version 1.17.51.

## 1.17.51 (fork, 2026-07-04)

First release of the stripped-down fork.

### Removed

- All context menu integration: the `editor-menu` handler, `getContextMenuCommands`, and the entire "Context menu" settings section. Commands remain available from the command palette.
- Autolink commands: "Convert to Autolink" (`ConvertLinkToAutolinkCommand`) and "Convert Autolinks to Markdown links" (`ConvertAutolinksToMdlinksCommand`), including their tests. Autolink *parsing* is kept so "Convert all links to Markdown links" can still convert existing autolinks.
- The `ffSkipFrontmatterInNoteWideCommands` insider feature flag. The "Skip Frontmatter" setting is now always visible and always honored.

### Fixed

- "Convert URLs to Markdown links" and "Convert all links to Markdown links" no longer convert URLs inside YAML frontmatter when **Skip Frontmatter** is enabled (on by default). Previously frontmatter skipping was only implemented for "Convert Wikilinks to Markdown links" and was gated behind a hidden feature flag that defaulted to off.

Note: frontmatter skipping applies when a command runs on the whole note; if you run it on a selection that includes frontmatter, the selection is converted as-is.
