import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { injectable } from "tsyringe";

@injectable()
export class DaysJsDateProvider implements IDateProvider {

  converToDataHora(date: Date): string {
    dayjs.extend(utc);
    return dayjs(date).utc().local().format("DD/MM/YYYY HH:mm");
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }

  convertToUTC(date: Date): string {
    dayjs.extend(utc);
    return dayjs(date).utc().local().format();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

}