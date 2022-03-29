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

import { Instance as DataInstance } from "../../common/S2DSROMData.js";

/*
	Language String related Locations.
		
	[X][0]: The start location where the language is stored also related to the Shifting Address.
	[X][1]: Related to the (StringID * 0x4) read value for the Shifting Address.
	[X][2]: Related to the 0x400 / 0x3FE thing.

	NOTE: Are there more??? That distance between Italian and Spanish is BIG which sorta scares me.
*/
const LocTable = [
	[ // EUR.
		[ 0x008B3C8, 0x008B540, 0x008B3CC ], // English.
		[ 0x0BF2BF8, 0x0BF2DA4, 0x0BF2BFC ], // French.
		[ 0x0C5AB8C, 0x0C5AD1C, 0x0C5AB90 ], // German.
		[ 0x0F4749C, 0x0F47638, 0x0F474A0 ], // Italian.
		[ 0x20EFEA4, 0x20F0044, 0x20EFEA8 ]  // Spanish.
	],
	[ // USA => Main Difference: French up to Spanish => Moved up by 0x4 bytes.
		[ 0x008B3C8, 0x008B540, 0x008B3CC ], // English.
		[ 0x0BF2BFC, 0x0BF2DA8, 0x0BF2C00 ], // French.
		[ 0x0C5AB90, 0x0C5AD20, 0x0C5AB94 ], // German.
		[ 0x0F474A0, 0x0F4763C, 0x0F474A4 ], // Italian.
		[ 0x20EFEA8, 0x20F0048, 0x20EFEAC ]  // Spanish.
	]
];

/*
	Encoding Table for S2DSStringFetcher.
	Starting with 0x20 and ASCII things, then with custom encoding at 0x7B.
*/
const Encoding = [
	/* ASCII related stuff. */
	" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@",
	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	"[", "\\", "]", "^", "_", "`",
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",

	/* Special. */
	"©", "œ", "¡", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë",
	"Ì", "Í", "Î", "Ï", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "Ø", "Ù", "Ú", "Ü", "ß", "à",
	"á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ñ",
	"ò", "ó", "ô", "õ", "ö", "ø", "ù", "ú", "û", "ü", "º", "ª", "…", "™", "", "®", ""
];


/*
	Decode a byte array to a read-able string.

	ByteArray: The Byte array to decode.
*/
function Decode(ByteArray) {
	if (ByteArray == null) return "";

	let Decoded = "";

	for (let Idx = 0x0; Idx < ByteArray.length; Idx++) {
		if (ByteArray[Idx] == 0x0)                                 Decoded += "\0"; // NULL Terminator.
		else if (ByteArray[Idx] == 0xA)                            Decoded += "\n"; // New Line.
		else if (ByteArray[Idx] >= 0x20 && ByteArray[Idx] <= 0xBB) Decoded += Encoding[ByteArray[Idx] - 0x20]; // Encoding.
	}

	return Decoded;
}

/*
	Formats an ID into a 4 digit padding number string.

	ID: The ID to format.
*/
function FormatID(ID) {
	let Num = ID.toString();

	/* Padding to 4 digits. */
	if (ID < 10)        Num = "000" + ID.toString();
	else if (ID < 100)  Num =  "00" + ID.toString();
	else if (ID < 1000) Num =   "0" + ID.toString();
	else                Num =         ID.toString();

	return Num;
}


export class S2DSStringFetcher {
	constructor() { this.Initialize(); }
	Initialize() { this.Good = DataInstance.IsValid() && DataInstance.Region() >= 0x0 && DataInstance.Region() <= 0x1; }

	/* Some useful returns. */
	IsGood() { return this.Good; }
	MaxLang() { return 0x5; }
	MaxStringID() { return 0xC37; } // 3127 Strings exist.

	/* Some Meta data. */
	Version() { return "v0.1.0"; }
	Contributors() { return "SuperSaiyajinStackZ"; }
	Name() { return "S2DSStringFetcher"; }
	Purpose() { return "Fetch and Extract the Strings from a The Sims 2 Nintendo DS ROM."; }
	SupportedRegions() { return "EUR, USA"; }

	/*
		Fetches a String from the ROM.

		LanguageID: The language ID to fetch, see LocTable above for more starting with index 0.
		StringID: The String ID to fetch.
	*/
	Fetch(LanguageID, StringID) {
		if (!this.IsGood() || LanguageID >= this.MaxLang() || StringID >= this.MaxStringID()) return "";

		/* Declare Variables. */
		let Loc = LocTable[DataInstance.Region()][LanguageID];
		let Counter = 0x0;
		let Character = 0x0;
		let ShiftVal = 0x0;
		let ShiftAddr = 0x0;
		let StringArray = [ ];
	
		/* Init initial Shift Address + Shift Value. */
		ShiftAddr = ((Loc[0] + DataInstance.ROMDotBin()) + DataInstance.ReadData("uint32_t", (StringID * 0x4) + (Loc[1] + DataInstance.ROMDotBin())));
		ShiftVal = DataInstance.ReadData("uint32_t", ShiftAddr);
		
		do {
			Character = 0x100;
	
			do {
				Character = DataInstance.ReadData("uint16_t", (Character * 0x4) + (Loc[2] + DataInstance.ROMDotBin()) - (((ShiftVal >> Counter) % 0x2) == 0x0 ? 0x400 : 0x3FE));
				Counter++;
	
				if (Counter == 0x8) {
					Counter = 0x0;
					ShiftAddr++;
					ShiftVal = DataInstance.ReadData("uint32_t", ShiftAddr);
				}
			} while(0xFF < Character);
	
			if (Character != 0x0) StringArray.push(Character);
		} while(Character != 0x0);
	
		return Decode(StringArray);
	}

	/*
		Extracts all 3127 Strings of a specific Language into a Text file.

		Language: The Language Index ( 0 - 4 ).
		Path: The path to where to store the file.
	*/
	Extract(Language, Path) {
		if (Language >= this.MaxLang()) return;
		let RawString = "";

		for (let Idx = 0x0; Idx < this.MaxStringID(); Idx++) {
			RawString += FormatID(Idx) + " - " + this.Fetch(Language, Idx);

			if (Idx < this.MaxStringID() - 1) RawString += "\n";
		}

		Deno.writeTextFileSync(Path, RawString);
	}
};

export let Instance = new S2DSStringFetcher();