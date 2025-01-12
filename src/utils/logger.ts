type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  data?: any;
}

export class Logger {
  private serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    data?: any
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      service: this.serviceName,
      message,
      data,
    };
  }

  info(message: string, data?: any) {
    const logEntry = this.createLogEntry("info", message, data);
    console.log(
      `[${logEntry.timestamp}] [${logEntry.service}] [INFO]: ${message}`,
      data ? data : ""
    );
  }

  warn(message: string, data?: any) {
    const logEntry = this.createLogEntry("warn", message, data);
    console.warn(
      `[${logEntry.timestamp}] [${logEntry.service}] [WARN]: ${message}`,
      data ? data : ""
    );
  }

  error(message: string, error?: any) {
    const logEntry = this.createLogEntry("error", message, error);
    console.error(
      `[${logEntry.timestamp}] [${logEntry.service}] [ERROR]: ${message}`,
      error ? error : ""
    );
  }
}
