import { Config } from "@root/types/Config";
import os from "os";
const homedir = os.homedir();

const config: Config = {
    maxDepth: 6,
    targetFolder: homedir,
};

export default config;
