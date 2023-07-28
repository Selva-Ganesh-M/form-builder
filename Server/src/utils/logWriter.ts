import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

export const logWriter = async (logRecord: string) => {
  if (!fs.existsSync(path.join(__dirname, "..", "log"))) {
    await fsPromises.mkdir(path.join(__dirname, "..", "log"));
  }

  await fsPromises.appendFile(
    path.join(__dirname, "..", "log", "reqLog.log"),
    logRecord + "\n"
  );
};
