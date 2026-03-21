import type { Song } from "./Song"
import * as React from "react";

export interface Playlist {
    coverUrl: string | React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_IMG_SRC_TYPES[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_IMG_SRC_TYPES] | undefined;
    id: string
    name: string
    songs: Song[]
}
