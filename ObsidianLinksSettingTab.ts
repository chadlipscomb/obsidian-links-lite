import ObsidianLinksPlugin from "main";
import { App, PluginSettingTab, setIcon, Setting } from "obsidian";
import { InternalWikilinkWithoutTextAction } from "utils";

export class ObsidianLinksSettingTab extends PluginSettingTab {

    repoUrl: string;
    plugin: ObsidianLinksPlugin;
    constructor(app: App, plugin: ObsidianLinksPlugin) {
        super(app, plugin);
        this.plugin = plugin;
        this.repoUrl = 'https://github.com/mii-key/obsidian-links';
    }

    getFullDocUrl(fragment: string): string {
        return this.repoUrl + '?tab=readme-ov-file#' + fragment;
    }

    getFullInsiderDocUrl(filename: string): string {
        return this.repoUrl + '/blob/master/docs/insider/' + filename;
    }

    setSettingHelpLink(setting: Setting, helpUrl: string): void {
        const nameEl = setting.settingEl.querySelector(".setting-item-name");
        if (!nameEl) {
            return;
        }
        this.setElementHelpLink(nameEl, helpUrl);
    }

    setElementHelpLink(element: Element, helpUrl: string): void {
        if (!element) {
            return;
        }
        const linkEl = createEl('a', {
            href: helpUrl
        });

        const iconEl = element.createSpan();
        iconEl.addClass('settings-help-icon');
        setIcon(iconEl, "circle-help");
        linkEl.appendChild(iconEl)
        element.appendChild(linkEl);
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h3', { text: 'Command settings' });

        containerEl.createEl('h4', { text: 'General' });



        new Setting(containerEl)
            .setName('Autoselect upon creating a link')
            .setDesc('Autoselect a word under the cursor when creating a link.')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.autoselectWordOnCreateLink)
                    .onChange(async (value) => {
                        this.plugin.settings.autoselectWordOnCreateLink = value;
                        await this.plugin.saveSettings();
                    })
            });

        new Setting(containerEl)
            .setName('Skip Frontmatter')
            .setDesc('Skip Frontmatter in note wide commands.')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.skipFrontmatterInNoteWideCommands)
                    .onChange(async (value) => {
                        this.plugin.settings.skipFrontmatterInNoteWideCommands = value;
                        await this.plugin.saveSettings();
                    })
            });


        const setListTextEl = containerEl.createEl('h4', { text: 'Set link text' });
        this.setElementHelpLink(setListTextEl, this.getFullDocUrl('set-link-text'));

        new Setting(containerEl)
            .setName('Title separator')
            .setDesc('String used as headings separator in \'Set link text\' command.')
            .addText(text => text
                .setValue(this.plugin.settings.titleSeparator)
                .onChange(async (value) => {
                    this.plugin.settings.titleSeparator = value;
                    await this.plugin.saveSettings();
                }));

        const removeLinksFromHeadingEl = containerEl.createEl('h4', { text: 'Remove links from headings' });
        this.setElementHelpLink(removeLinksFromHeadingEl, this.getFullDocUrl('remove-links-from-headings'));

        new Setting(containerEl)
            .setName('Internal wikilink without text')
            .addDropdown(dropDown =>
                dropDown
                    .addOptions({
                        Delete: "Remove",
                        ReplaceWithDestination: "Replace with destination",
                        ReplaceWithLowestNoteHeading: "Replace with lowest heading"
                    })
                    .setValue(InternalWikilinkWithoutTextAction[this.plugin.settings.removeLinksFromHeadingsInternalWikilinkWithoutTextAction])
                    .onChange(async (value: string) => {
                        this.plugin.settings.removeLinksFromHeadingsInternalWikilinkWithoutTextAction = value as InternalWikilinkWithoutTextAction;
                        await this.plugin.saveSettings();
                    }));


        const deleteLinkEl = containerEl.createEl('h4', { text: 'Delete link' });
        this.setElementHelpLink(deleteLinkEl, this.getFullDocUrl('delete-link'));

        new Setting(containerEl)
            .setName('Delete unreferenced link target')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.deleteUnreferencedLinkTarget)
                    .onChange(async (value) => {
                        this.plugin.settings.deleteUnreferencedLinkTarget = value;
                        await this.plugin.saveSettings();
                    })
            });

        containerEl.createEl('h4', { text: 'Convert to Markdown link' });
        const settingAppendMdExtension = new Setting(containerEl)
            .setName('Append .md extension')
            .setDesc("")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.onConvertToMdlinkAppendMdExtension)
                    .onChange(async (value) => {
                        this.plugin.settings.onConvertToMdlinkAppendMdExtension = value;
                        await this.plugin.saveSettings();
                    })
            });
        this.setSettingHelpLink(settingAppendMdExtension, this.getFullDocUrl('convert-to-markdown-link'));


        // ----------------------------------------------
        // --          Early access features           --
        // ----------------------------------------------

        containerEl.createEl('h3', { text: 'Early access features' });
        const earlyAccessDescription = containerEl.createEl('p');
        earlyAccessDescription.createEl('span', {
            text: "Almost finished features with some "
        });

        earlyAccessDescription.createEl('a', {
            href: 'https://github.com/mii-key/obsidian-links/issues',
            text: 'bugs'
        });

        earlyAccessDescription.createEl('span', {
            text: " to be fixed."
        });

        // ----------------------------
        // ----- Early access feature1

        // new Setting(containerEl)
        // 	.setName("Early access feature1")
        // 	.setDesc("Feature description")
        // 	.setClass("setting-item-feature1")
        // 	.addToggle((toggle) => {
        // 		toggle
        // 			.setValue(this.plugin.settings.ffEarlyAccessFeature1)
        // 			.onChange(async (value) => {
        // 				this.plugin.settings.ffEarlyAccessFeature1 = value;
        // 				await this.plugin.saveSettings();
        // 			})
        // 	});

        // const earlyAccessFeature1SettingDesc = containerEl.querySelector(".setting-item-feature1 .setting-item-description");
        // if (earlyAccessFeature1SettingDesc) {
        // 	earlyAccessFeature1SettingDesc.appendText(' see ');
        // 	earlyAccessFeature1SettingDesc.appendChild(
        // 		createEl('a', {
        // 			href: 'https://github.com/mii-key/obsidian-links#readme',
        // 			text: 'docs'
        // 		}));
        // 	earlyAccessFeature1SettingDesc.appendText('.');
        // }
        // ----------

        // ------------------------------------
        // copy link to heading


        // ----------------------------------------------
        // --            Insider features              --
        // ----------------------------------------------

        containerEl.createEl('h3', { text: 'Insider features' });

        const insiderDescription = containerEl.createEl('p');


        insiderDescription.createEl('span', {
            text: "Incomplete features currently under development. Enable these features to "
        });

        insiderDescription.createEl('a', {
            href: 'https://github.com/mii-key/obsidian-links/issues',
            text: 'provide your input'
        });

        insiderDescription.createEl('span', {
            text: " and influence the direction of development."
        });

        // ------------------------------------
        // insider feature1

        // new Setting(containerEl)
        // 	.setName("Insinder feature")
        // 	.setDesc("description")
        // 	.setClass("setting-item-feature1")
        // 	.addToggle((toggle) => {
        // 		toggle
        // 			.setValue(this.plugin.settings.ffFeature1)
        // 			.onChange(async (value) => {
        // 				this.plugin.settings.ffFeature1 = value;
        // 				await this.plugin.saveSettings();
        // 			})

        // 	});

        // const feature1SettingDesc = containerEl.querySelector(".setting-item-feature1 .setting-item-description");

        // if (feature1SettingDesc) {
        // 	feature1SettingDesc.appendText(' see ');
        // 	feature1SettingDesc.appendChild(
        // 		createEl('a', {
        // 			href: 'https://github.com/mii-key/obsidian-links/blob/master/docs/insider/feature1.md',
        // 			text: 'docs'
        // 		}));
        // 	feature1SettingDesc.appendText('.');
        // }

        // ------------------------------------
        // insider feature1

        // const settingInsiderFeature1 = new Setting(containerEl)
        //     .setName("Insider feature")
        //     .setDesc("Insider feature desc ")
        //     .addToggle((toggle) => {
        //         toggle
        //             .setValue(this.plugin.settings.ffInsiderFeature1)
        //             .onChange(async (value) => {
        //                 this.plugin.settings.ffInsiderFeaturei = value;
        //                 await this.plugin.saveSettings();
        //             })

        //     });

        // this.setSettingHelpLink(settingInsiderFeature1, this.getFullInsiderDocUrl('insider-feature1.md'));



        // ------------------------------------
        // convert links in a folder

        const settingConvertLinksInFolder = new Setting(containerEl)
            .setName("Convert links in folder")
            .setDesc("Convert links in a folder")
            .setClass("setting-item--feature-convert-links-in-folder")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.ffConvertLinksInFolder)
                    .onChange(async (value) => {
                        this.plugin.settings.ffConvertLinksInFolder = value;
                        await this.plugin.saveSettings();
                    })

            });

        this.setSettingHelpLink(settingConvertLinksInFolder, this.getFullInsiderDocUrl('convert-links-in-folder.md'));

        // ------------------------------
        // feature: extract section

        // new Setting(containerEl)
        //     .setName("Extract section")
        //     .setDesc("Extract section into a note.")
        //     .setClass("setting-item--insider-feature3")
        //     .addToggle((toggle) => {
        //         toggle
        //             .setValue(this.plugin.settings.ffExtractSection)
        //             .onChange(async (value) => {
        //                 this.plugin.settings.ffExtractSection = value;
        //                 await this.plugin.saveSettings();
        //                 toggleExtractSection(value);
        //             })
        //     });

        // const feature3SettingDesc = containerEl.querySelector(".setting-item--insider-feature3 .setting-item-description");

        // if (feature3SettingDesc) {
        //     feature3SettingDesc.appendText(' see ');
        //     feature3SettingDesc.appendChild(
        //         createEl('a', {
        //             href: 'https://github.com/mii-key/obsidian-links/blob/master/docs/insider/extract-section.md',
        //             text: 'docs'
        //         }));
        //     feature3SettingDesc.appendText('.');
        // }




        // ------------------------------------
        // Obsidian URL support

        new Setting(containerEl)
            .setName("Obsidian URL support")
            .setDesc("Add support for Obsidian URL")
            .setClass("setting-item-featureObsidianUrl")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.ffObsidianUrlSupport)
                    .onChange(async (value) => {
                        this.plugin.settings.ffObsidianUrlSupport = value;
                        await this.plugin.saveSettings();
                    })

            });

        const featureObsidianUrlSettingDesc = containerEl.querySelector(".setting-item-featureObsidianUrl .setting-item-description");

        if (featureObsidianUrlSettingDesc) {
            featureObsidianUrlSettingDesc.appendText(' see ');
            featureObsidianUrlSettingDesc.appendChild(
                createEl('a', {
                    href: 'https://github.com/mii-key/obsidian-links/blob/master/docs/insider/obsidian-url.md',
                    text: 'docs'
                }));
            featureObsidianUrlSettingDesc.appendText('.');
        }

        // const autoselectWordOnCreateLinkSettingDesc = containerEl.querySelector(".setting-item-autoselect-word-create-link .setting-item-description");

        // if (autoselectWordOnCreateLinkSettingDesc) {
        //     autoselectWordOnCreateLinkSettingDesc.appendText(' see ');
        //     autoselectWordOnCreateLinkSettingDesc.appendChild(
        //         createEl('a', {
        //             href: 'https://github.com/mii-key/obsidian-links/blob/master/docs/insider/feature1.md',
        //             text: 'docs'
        //         }));
        //     autoselectWordOnCreateLinkSettingDesc.appendText('.');
        // }





        // ------------------------------------
        // copy link to element to the clipboard

        const settingCopyLinkToElement = new Setting(containerEl)
            .setName("Copy link to element")
            .setDesc("Copy link to a heading or a block to the clipboard. ")
            .setClass("setting-item-copy-link-to-object")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.ffCopyLinkToObject)
                    .onChange(async (value) => {
                        this.plugin.settings.ffCopyLinkToObject = value;
                        await this.plugin.saveSettings();
                    })

            });

        this.setSettingHelpLink(settingCopyLinkToElement, this.getFullInsiderDocUrl('copy-link-to-element.md'));

        // ------------------------------------
        // Set link destination from clipboard

        //const settingSetLinkDestinationFromClipboard = 
        new Setting(containerEl)
            .setName("Set link destination from clipboard")
            .setDesc("Sets destination of a link from clipboard")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.ffSetLinkDestinationFromClipbard)
                    .onChange(async (value) => {
                        this.plugin.settings.ffSetLinkDestinationFromClipbard = value;
                        await this.plugin.saveSettings();
                    })
            });

        // this.setSettingHelpLink(settingSetLinkDestinationFromClipboard, this.getFullInsiderDocUrl('set-link-destination-from-clipboard.md'));
    }
}