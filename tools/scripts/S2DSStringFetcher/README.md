# S2DSStringFetcher

<p align="center">
	<img src="https://github.com/SuperSaiyajinStackZ/S2DSTestStuff/blob/main/resources/s2dsstringfetcher.png" alt="Box Image"><br>
	<b>Fetch and Extract the Strings from a The Sims 2 Nintendo DS ROM.</b><br>
	<b>This Script only supports the EUR and USA Region.</b><br>
</p><hr>

**This is the first Tool i did related to the ROM.**
- It extracts all the `3127` Strings of each language to `.txt` files in the following format:
```
0000 - String 0
0001 - String 1
0002 - String 2
...
3126 - String 3126
```

**It creates the following files:**
- English-Strings.txt
- French-Strings.txt
- German-Strings.txt
- Italian-Strings.txt
- Spanish-Strings.txt
<hr>

## Script Credits
- Contributors: [SuperSaiyajinStackZ](https://github.com/SuperSaiyajinStackZ)
- Last Updated: 29.03.2022
- Purpose: Fetch and Extract the Strings from a The Sims 2 Nintendo DS ROM.
- Supported Region: EUR, USA
- Type: ROM Scripts
- Version: v0.1.0
<hr>

## Usage
**The main command to run this Script is:**
- `deno run Main.js -f <Filepath> -o <OutputFolder>`

**If you want to avoid the prompt to let it ask you for permission to read / write, then this is the main command:**
- `deno run --allow-read --allow-write Main.js -f <Filepath> -o <OutputFolder>`

**Then here below also the Arguments you'll have to pass:**

**Arguments**
- `-f <Filepath>`: The path to the ROM. If you use the same way as i do, you can literally do: `-f "../../../binaries/rom.nds"` **(Required)**.
- `-o <OutputFolder>`: The folder to where to extract the Strings to. You can just use `-o "Strings"` to extract them into the current Directory inside `Strings/` **(Required)**.
<hr>

## Changelog
**v0.1.0**
- Added the Initial Script on 29.03.2022.
<hr>