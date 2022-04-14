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

export class DenoHelper {
	static FileToU8Array(Path) {
		let Buffer = Deno.readFileSync(Path);
		return Buffer;
	}

	static WriteBinaryToFile(Buffer, Path) {
		if (Buffer.length > 0x0) Deno.writeFileSync(Path, Buffer);
	}

	static WriteTextToFile(RawString, Path) {
		if (RawString != "") Deno.writeTextFileSync(Path, RawString);
	}
};