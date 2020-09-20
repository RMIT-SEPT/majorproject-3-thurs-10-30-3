import request from 'supertest';
import { app } from '../../app';

// CURRENT USER DATA

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to retreive current user data without being logged in', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving super admin current user data', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving admin current user data', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving user current user data', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving worker current user data', async () => {
    // need to fix code for super before i configure this
});

// ANY USER DATA

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to retreive (any) user data without being logged in', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to retreive (any) user data while logged in as customer user', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to retreive (any) user data while logged in as worker user', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 404 (Not Found) due to attempting to retreive non-existent user data', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving (any) user data', async () => {
    // need to fix code for super before i configure this
});