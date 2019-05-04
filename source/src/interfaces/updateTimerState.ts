import { TimerState } from '../enums/timerState';

/**
 * @copyright OpenSourced
 * @author Jakub Cywka
 * @description An interface for payload to update the timer state in the pomodoro lifecycle.
 * @param timerState Determines the timerState to use in update of timer state in the pomodoro lifecycle.
 * @version 0.2.0
*/
export interface UpdateTimerState {
    /**
     * @copyright OpenSourced
     * @author Jakub Cywka
     * @description A part of an UpdateTimerState interface.
     * @param timerState Determines the timerState to use in update of timer state in the pomodoro lifecycle.
     * @version 0.2.0
    */
    timerState: TimerState;
};