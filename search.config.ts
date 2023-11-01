import { Config } from "@root/types/Config";
// import * as os from "@mocks/os-mock"// !DEBUGMODE
import os from "os" //-- Production Import

const homedir = os.homedir();

const config: Config = {
    maxDepth: 6,
    targetFolder: homedir,
};

export default config;
