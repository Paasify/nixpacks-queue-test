import { exec } from "child_process";
import path from "path";
import simpleGit from "simple-git";

export const cloneRepository = async (url: string, repoDir: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const cloneCommand = `git clone ${url} ${repoDir}`;

        exec(cloneCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error occurred while cloning: ${error.message}`);
                return reject(error);
            }
            console.log(`Clone Stderr: ${stderr}`)
            console.log(`Clone Stdout: ${stdout}`);
            resolve(repoDir);
        });
    });
}

export const deleteDir = async (dir: string) => {
    return new Promise((resolve, reject) => {
        const command = `rm -rf ${dir}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error occurred: ${error.message}`);
                return reject(error);
            }
            console.log(`DeleteDir Stderr: ${stderr}`);
            console.log(`DeleteDir Stdout: ${stdout}`);
            resolve(stdout);
        })
    })
}

export const buildDockerImage = async (id: string, name: string, repoDir: string) => {
    return new Promise((resolve, reject) => {
        const outputDir = path.join(__dirname, "builds", id);
        const command = `nixpacks build ${repoDir} --name ${name} --out ${outputDir}`

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return reject(error.message);
            }
            console.log(`stderr: ${stderr}`);
            console.log(`Stdout: ${stdout}`);
            resolve(stdout);
        })
    })
}