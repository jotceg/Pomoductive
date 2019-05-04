/**
 * @copyright OpenSourced
 * @author Jakub Cywka
 * @description An interface for time in the pomodoro lifecycle.
 * @param minutes Determines the amount of minutes to use in lifecycle.
 * @param seconds Determines the amount of seconds to use in lifecycle.
 * @version 0.1.0
*/
export interface Time {
    /**
     * @copyright OpenSourced
     * @author Jakub Cywka
     * @description A fragment of Time interface.
     * @param minutes Determines the amount of minutes to use in lifecycle.
     * @version 0.1.0
    */
    minutes: number;
    /**
     * @copyright OpenSourced
     * @author Jakub Cywka
     * @description A fragment of Time interface.
     * @param seconds Determines the amount of seconds to use in lifecycle.
     * @version 0.1.0
    */
    seconds: number;
};