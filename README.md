# Repository Information
<p align="center">
	<img src="https://github.com/SuperSaiyajinStackZ/S2DSTestStuff/blob/main/resources/cover.png" alt="Cover Image"><br>
	<b>This Repository contains some Testing stuff by me for The Sims 2 - Nintendo DS written in JavaScript and eventually in the future into TypeScript to be used with <a href="https://deno.land/">Deno</a>.</b><br>
	<b>NOTE: USE THE SCRIPTS AT YOUR OWN RISK! I AM NOT RESPONSIBLE FOR ANY DATA LOSS THAT MAY BE CAUSED THROUGH IT. YOU ARE WARNED.</b><br>
	<b>To install Deno, follow it's <a href="https://deno.land/">Installation Instructions</a>.</b><br>
</p><hr>

## Structure Explanation
**Here a bit of Information, how this Repository is structured.**

- **binaries**
	- ***rom.nds***: This is how i have my testing ROM stored.
	- ***sav.sav***: This is how i have my testing Savefile stored.
	- ***NOTE: ^This is gitignored, as i won't push my ROM dump and my Savefile. It just contains a `.gitkeep` file to let this Directory stay.***
- **resources**: This Directory contains some resources for this Repository.
- **tools**
	- **common**
		- ***S2DSROMData.js***: This file handles the ROM Data, such as checking for validation, reading and writing to it's Buffer etc.
	- **scripts**
		- **ScriptName**
			- ***Main.js***: The "Main" Script which is what needs to be run.
			- ***README.md***: Containing Information about the Script.
			- ***ScriptName.js***: The Core Class Script. These may be re-used in other Script classes to avoid duplicate things.

***NOTE: To make proper use of the Scripts, the `tools` Directory should stay as is with it's content, because the Scripts rely on the `common` Scripts for the data handling. If you really want to move the Scripts somewhere else, you'll have to update the import paths on your own.***
<hr>

# Credits
**The Credits for this Repository:**
- [SuperSaiyajinStackZ](https://github.com/SuperSaiyajinStackZ): Maintaining this Repository and all the Scripts.
<hr>