import simpleGit from "simple-git";

export const isValidGitUrl = async (url: string) => {
    try {
        await simpleGit().listRemote([url]);
        return true;
    } catch (error) {
        return false;
    }
};
