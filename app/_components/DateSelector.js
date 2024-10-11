"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  // console.log("test");
  // console.log(bookedDates);
  const { range, setRange, resetRange } = useReservation();
  // CHANGE
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const { regular_price: regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // console.log(settings);
  // SETTINGS
  const {
    min_booking_lenght: minBookingLength,
    max_booking_lenght: maxBookingLength,
  } = settings;

  // Get current date
  // const lastDate = new Date();
  // lastDate.setDate(lastDate.getDate() + 60);
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date(2024, 9)}
        endMonth={new Date(2024, 11)}
        // disabled={[{ before: new Date(), after: new Date(2024, 11) }]}
        captionLayout="dropdown"
        numberOfMonths={2}
        hideNavigation
        required
        selected={displayRange}
        onSelect={setRange}
        disabled={(curDate) => {
          // console.log(curDate);
          return (
            isPast(curDate) ||
            bookedDates.some((date) => isSameDay(date, curDate))
          );
        }}
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
