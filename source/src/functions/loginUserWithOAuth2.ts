import { Dispatch } from 'redux';

import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { User } from '../interfaces/user';

import { updateUser } from './updateUser';
import { updateRequestState } from './updateRequestState';

import { RequestState } from '../enums/requestState';

export const loginUserWithOAuth2: (userCredential: firebase.auth.UserCredential, shouldKeepLoggedIn: boolean) => (dispatch: Dispatch<Action>, getState: () => State) => Promise<void> = (userCredential, shouldKeepLoggedIn) => async (dispatch, getState) => {
    
    dispatch(updateRequestState({ requestState: RequestState.Pending }));

    async function getUsers(): Promise<User[]> {
        const users: User[] = await firebase.firestore().collection('users').get().then((value): User[] => {
            const users: User[] = [];
            value.forEach((result): void => {
                users.push(result.data() as User);
            });
            return users;
        });
        return users;
    };

    const { firebase } = getState();
    const users = await getUsers();
    const user = userCredential.user as firebase.User;

    let shouldRegisterUser: boolean = true;

    for (const resultUser of users) {
        if (resultUser.email === user.email) {
            dispatch(updateUser({
                user: resultUser
            }));
            shouldRegisterUser = false;
            break;
        } else {
            shouldRegisterUser = true;
        };
    };
    
    if (shouldRegisterUser === true) {
        const displayName = user.displayName as string;
        const blankSpaceIndex = displayName.indexOf(' ');
        const name = displayName.substring(0, blankSpaceIndex);
        const surname = displayName.substring(blankSpaceIndex + 1);
        firebase.firestore().collection('users').add({
            name,
            surname,
            email: user.email as string,
            password: user.email as string,
            id: users.length > 0 ? users[users.length - 1].id + 1 : 0
        } as User).then((value): void => {
            value.get().then((value): void => {
                if (shouldKeepLoggedIn === true) {

                    const user: firebase.User = userCredential.user as firebase.User;

                    localStorage.setItem('credentials', user.toJSON().toString());
                };
                dispatch(updateUser({
                    user: value.data() as User
                }));
                dispatch(updateRequestState({ requestState: RequestState.Resolved }));
            }).catch(() => dispatch(updateRequestState({ requestState: RequestState.Rejected })));
        }).catch(() => dispatch(updateRequestState({ requestState: RequestState.Rejected })));
    };
};