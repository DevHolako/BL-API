import logger from "pino";
import dayjs from "dayjs";


const log = logger({

    timestamp: true,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
});




export default log
