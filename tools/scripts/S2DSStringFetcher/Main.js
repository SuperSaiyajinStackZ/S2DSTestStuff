/*
*   This file is part of S2DSTestStuff
*   Copyright © 2022 SuperSaiyajinStackZ
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*   Additional Terms 7.b and 7.c of GPLv3 apply to this file:
*       * Requiring preservation of specified reasonable legal notices or
*         author attributions in that material or in the Appropriate Legal
*         Notices displayed by works containing it.
*       * Prohibiting misrepresentation of the origin of that material,
*         or requiring that modified versions of such material be marked in
*         reasonable ways as different from the original version.
*/

import { DenoHelper } from "../../common/DenoHelper.js";
import { Instance as DataInstance } from "../../common/S2DSROMData.js";
import { Instance as Script } from "./S2DSStringFetcher.js";

/* Language Names Table. */
const LangNames = [ "English", "French", "German", "Italian", "Spanish" ];


function ParseArgs() {
	let ArgStruct = {
		"Filename": "",
		"Outfolder": ""
	};

	const Args = Deno.args;

	if (Args.length > 0x0) {
		let Type = "";

		for (let Idx = 0x0; Idx < Args.length; Idx++) {
			switch(Type) {
				case "-f": // Filename.
					ArgStruct.Filename = Args[Idx];
					Type = "";
					break;

				case "-o": // Output.
					ArgStruct.Outfolder = Args[Idx];
					Type = "";
					break;

				default: // Fetch Type.
					Type = Args[Idx];
					break;
			}
		}
	}

	return ArgStruct;
}

const Args = ParseArgs();
console.log(
	"===================================================================\n" +
	"Script Name: " + Script.Name() + "\n" +
	"Version: " + Script.Version() + "\n" +
	"Contributors: " + Script.Contributors() + "\n" +
	"Purpose: " + Script.Purpose() + "\n" +
	"Supported Regions: " + Script.SupportedRegions() + "\n\n" +
	"Arguments: -f <Filepath> -o <OutputFolder>\n" +
	"Detected Arguments:\n" +
	"-f: " + (Args.Filename == "" ? "Not provided" : Args.Filename) + "\n" +
	"-o: " + (Args.Outfolder == "" ? "Not provided" : Args.Outfolder) + "\n" +
	"===================================================================\n\n"
);

if (Args.Filename != "" && Args.Outfolder != "") {
	DataInstance.Load(DenoHelper.FileToU8Array(Args.Filename));
	Script.Initialize();

	if (Script.IsGood()) {
		if (Args.Outfolder[Args.Outfolder.length - 1] != "/") { // Only do this, if the last character is not / inside that argument.
			Deno.mkdirSync(Args.Outfolder, { recursive: true }); // Make the dirs just in case.
			for (let LangIdx = 0x0; LangIdx < Script.MaxLang(); LangIdx++) DenoHelper.WriteTextToFile(Script.Extract(LangIdx), (Args.Outfolder + "/" + LangNames[LangIdx] + "-Strings.txt"));
		}
		
	} else {
		console.log("This is not a valid The Sims 2 DS PAL | EUR or USA ROM.");
	}

} else {
	console.log("Please provide proper Arguments.");
}