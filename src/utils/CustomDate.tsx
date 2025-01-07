class CustomDate extends Date {
    /**
     * Formats the date and time based on the given format.
     * @param format - The desired format for date or time.
     *   Supported formats:
     *   - "dd-mm-yyyy"
     *   - "yyyy-mm-dd"
     *   - "mm-dd-yyyy"
     *   - "mm-yyyy-dd"
     *   - "hh:mm"
     *   - "hh:mm:ss"
     *   - "hh:mm (AM/PM)"
     *   - "hh:mm:ss (AM/PM)"
     * @param divider - The divider to use for date formatting (e.g., "-", "/", ".").
     * @returns The formatted string.
     */
    formatDate(
      format:
        | "dd-mm-yyyy"
        | "yyyy-mm-dd"
        | "mm-dd-yyyy"
        | "mm-yyyy-dd"
        | "hh:mm"
        | "hh:mm:ss"
        | "hh:mm (AM/PM)"
        | "hh:mm:ss (AM/PM)" = "dd-mm-yyyy",
      divider: string = "-"
    ): string {
      const day = this.getDate().toString().padStart(2, "0");
      const month = (this.getMonth() + 1).toString().padStart(2, "0");
      const year = this.getFullYear();
      const hours = this.getHours().toString().padStart(2, "0");
      const minutes = this.getMinutes().toString().padStart(2, "0");
      const seconds = this.getSeconds().toString().padStart(2, "0");
      const period = this.getHours() >= 12 ? "PM" : "AM";
      const twelveHour = (this.getHours() % 12 || 12).toString().padStart(2, "0");
  
      switch (format) {
        case "dd-mm-yyyy":
          return `${day}${divider}${month}${divider}${year}`;
        case "yyyy-mm-dd":
          return `${year}${divider}${month}${divider}${day}`;
        case "mm-dd-yyyy":
          return `${month}${divider}${day}${divider}${year}`;
        case "mm-yyyy-dd":
          return `${month}${divider}${year}${divider}${day}`;
        case "hh:mm":
          return `${hours}:${minutes}`;
        case "hh:mm:ss":
          return `${hours}:${minutes}:${seconds}`;
        case "hh:mm (AM/PM)":
          return `${twelveHour}:${minutes} ${period}`;
        case "hh:mm:ss (AM/PM)":
          return `${twelveHour}:${minutes}:${seconds} ${period}`;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
    }
  
    /**
     * Sets the date and time components to the given values.
     * @param params - Object containing the date, time components to set.
     */
    setDateComponents(params: {
      date?: number;
      month?: number;
      year?: number;
      hour?: number;
      minutes?: number;
      seconds?: number;
    }): this {
      const { date, month, year, hour, minutes, seconds } = params;
  
      if (year !== undefined) this.setFullYear(year);
      if (month !== undefined) this.setMonth(month - 1); // Month is 1-based for input.
      if (date !== undefined) this.setDate(date);
      if (hour !== undefined) this.setHours(hour);
      if (minutes !== undefined) this.setMinutes(minutes);
      if (seconds !== undefined) this.setSeconds(seconds);
  
      return this;
    }
  }
  
  export default CustomDate;
  
  