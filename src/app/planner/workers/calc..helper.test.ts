import { CalcHelper } from "./calc.helper";

test("Check if calcWorkWeek is correct", () => {
  // Check for normal developer for 1 week sprint
  expect(CalcHelper.calcDaysOfWork(5, 100, 1, false)).toBe(5);
  expect(CalcHelper.calcDaysOfWork(5, 80, 1, false)).toBe(4);
  expect(CalcHelper.calcDaysOfWork(5, 50, 1, false)).toBe(2.5);

  // Check for normal developer for 2 week sprint
  expect(CalcHelper.calcDaysOfWork(5, 100, 2, false)).toBe(10);
  expect(CalcHelper.calcDaysOfWork(5, 80, 2, false)).toBe(8);
  expect(CalcHelper.calcDaysOfWork(5, 50, 2, false)).toBe(5);

  // Check for normal developer for 3 week sprint
  expect(CalcHelper.calcDaysOfWork(5, 100, 3, false)).toBe(15);
  expect(CalcHelper.calcDaysOfWork(5, 80, 3, false)).toBe(12);
  expect(CalcHelper.calcDaysOfWork(5, 50, 3, false)).toBe(7.5);

  // Check for MoD for 1 week sprint
  expect(CalcHelper.calcDaysOfWork(5, 100, 1, true)).toBe(0);
  expect(CalcHelper.calcDaysOfWork(5, 80, 1, true)).toBe(0);
  expect(CalcHelper.calcDaysOfWork(5, 50, 1, true)).toBe(0);

  // Check for MoD for 2 week sprint
  expect(CalcHelper.calcDaysOfWork(5, 100, 2, true)).toBe(5);
  expect(CalcHelper.calcDaysOfWork(5, 80, 2, true)).toBe(4);
  expect(CalcHelper.calcDaysOfWork(5, 50, 2, true)).toBe(2.5);
});

test("Check if calcWorkHours is correct", () => {
  expect(CalcHelper.calcWorkHours(8, 100)).toBe(8);
  expect(CalcHelper.calcWorkHours(8, 60)).toBe(4.8);
  expect(CalcHelper.calcWorkHours(8, 50)).toBe(4);
});

test("Check if calcMemberCapacity is correct", () => {
  expect(CalcHelper.calcMemberCapacity(4, 5)).toBe(20);
  expect(CalcHelper.calcMemberCapacity(8, 5)).toBe(40);
});
