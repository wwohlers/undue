
/**
 * This is used to convert between slider values in the range [0, 1] to a factor in the same range
 * used to find a date between two others. The basic idea is diminishing returns: i.e., at first,
 * as the slider value rises from 0, the factor rises rapidly from 0; but as the slider passes 0.5,
 * the factor rises more slowly. 
 * 
 * See ./dateFactor.ts to understand what a "date range factor" is.
 * 
 * The motivation for this is that when picking date/times for reminders, we want more precision on
 * the end closer to 1. If we represent the slider value as x and the factor as y, we want a 
 * concave down curve that satisfies [0, 0] as well as [1, 1].
 * 
 * The equation y = -(x-1)^2 + 1 represents such a curve, and the functions which can solve for x and 
 * y are below.
 */

/**
 * Convert from slider value (x) to factor (y), based on the equation noted above. Equivalent to 
 * solving for y.
 */
export function sliderToFactor(sliderValue: number): number {
  return 1 - Math.pow((sliderValue - 1), 2);
}

/**
 * Convert from factor (y) to slider value (x), based on the equation noted above. Equivalent to 
 * solving for x.
 */
export function factorToSlider(factor: number): number {
  const sqrt = 0 - Math.sqrt(1 - factor); // always take negative square root
  return sqrt + 1;
}