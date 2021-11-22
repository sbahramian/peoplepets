import path from "path";


/**
 * The common functions needed while working with files stored inside storage.
 */
namespace Storage {

    export function pathTo(filePath: string) {
        return path.join(__dirname + "../../../storage/" + filePath);
    }

    export function deleteFile(path: string) {
        throw new Error("Not implemented");
    }

    export function renameFile(path: string) {
        throw new Error("Not implemented");
    }

    export function moveFile(path: string) {
        throw new Error("Not implemented");
    }

    export function createDirectory(path: string) {
        throw new Error("Not implemented");
    }

}

export default Storage;